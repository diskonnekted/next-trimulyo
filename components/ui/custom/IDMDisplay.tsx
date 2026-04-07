"use client";

import * as React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Award, Target, BarChart3, PieChart, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { IDMDataNotAvailable } from "@/components/ui/custom/IDMDataNotAvailable";
import { IDMDataLoading } from "@/components/ui/custom/IDMDataLoading";

interface IDMData {
    SUMMARIES: {
        SKOR_SAAT_INI: number;
        STATUS: string;
        TARGET_STATUS: string;
        SKOR_MINIMAL: number;
        PENAMBAHAN: number;
        TAHUN: number;
    };
    ROW: Array<{
        NO: number | null;
        INDIKATOR: string;
        SKOR: number | string;
        KETERANGAN: string | null;
        KEGIATAN: string | null;
        ROW_CELL: number;
    }>;
    IDENTITAS: Array<{
        nama_provinsi: string;
        id_prov: string;
        id_kabupaten: string;
        nama_kab_kota: string;
        id_kecamatan: string;
        nama_kecamatan: string;
        id_desa: string;
        nama_desa: string;
    }>;
}

interface IDMDisplayProps {
    className?: string;
    year?: string;
}

// Function to fetch IDM data from API
const fetchIDMData = async (year: string = "2024"): Promise<IDMData | null> => {
    try {
        // Try fetching directly from Kemendesa API (client-side to avoid Vercel server blocking)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const directUrl = `https://idm.kemendesa.go.id/open/api/desa/rumusan/3404132005/${year}`;
        const response = await fetch(directUrl, {
            headers: { Accept: "application/json" },
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`IDM API error: ${response.status}`);
        }

        const json = await response.json();
        if (json.error) {
            return null;
        }

        // IDM API returns: { status: 200, error: false, mapData: { SUMMARIES, ROW, IDENTITAS } }
        const data = json.mapData;
        return data?.SUMMARIES ? data : null;
    } catch (error) {
        console.warn(`Direct IDM fetch failed for ${year}, trying server proxy:`, error);
        // Fallback to server-side proxy
        try {
            const response = await fetch(`/api/idm?year=${year}`);
            if (response.ok) {
                const data = await response.json();
                return data?.SUMMARIES ? data : null;
            }
        } catch (e) {
            console.error("Server IDM proxy also failed:", e);
        }
        return null;
    }
};

// Try to find available data from current year backwards
const fetchIDMWithFallback = async (preferredYear: string): Promise<IDMData | null> => {
    // Try preferred year first
    const preferred = await fetchIDMData(preferredYear);
    if (preferred) return preferred;

    // Fallback: try previous years (2024, 2023, 2022, 2021)
    const fallbackYears = ["2024", "2023", "2022", "2021"];
    for (const year of fallbackYears) {
        const data = await fetchIDMData(year);
        if (data) {
            console.log(`IDM: Using data from year ${year} as fallback`);
            return data;
        }
    }

    return null;
};

export function IDMDisplay({ className, year = "2024" }: IDMDisplayProps) {
    const [data, setData] = React.useState<IDMData | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setData(null);

            // Create a timeout promise that rejects after 15 seconds
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout: API took too long")), 15000);
            });

            try {
                const result = await Promise.race([fetchIDMWithFallback(year), timeoutPromise]);
                setData(result as IDMData);
            } catch (error) {
                console.error("Failed to load IDM data:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [year]);

    // Show loading state
    if (loading) {
        return <IDMDataLoading className={className} />;
    }

    // Show error state if no data
    if (!data || !data.ROW) {
        return (
            <IDMDataNotAvailable
                year={parseInt(year)}
                onRetry={() => {
                    const loadData = async () => {
                        try {
                            setLoading(true);
                            const result = await fetchIDMWithFallback(year);
                            setData(result);
                        } catch (error) {
                            console.error("Failed to load IDM data:", error);
                            setData(null);
                        } finally {
                            setLoading(false);
                        }
                    };
                    loadData();
                }}
                className={className}
            />
        );
    }

    // Calculate category scores
    const iksScore = parseFloat(data.ROW.find((item) => item.INDIKATOR === "IKS 2024")?.SKOR as string) || 0;
    const ikeScore = parseFloat(data.ROW.find((item) => item.INDIKATOR === "IKE 2024")?.SKOR as string) || 0;
    const iklScore = parseFloat(data.ROW.find((item) => item.INDIKATOR === "IKL 2024")?.SKOR as string) || 0;

    const categoryData = [
        { name: "IKS", value: iksScore * 100, fullMark: 100 },
        { name: "IKE", value: ikeScore * 100, fullMark: 100 },
        { name: "IKL", value: iklScore * 100, fullMark: 100 },
    ];

    const overallScore = data.SUMMARIES.SKOR_SAAT_INI;
    const minimalScore = data.SUMMARIES.SKOR_MINIMAL;

    // Calculate percentage change
    const previousScore = overallScore - data.SUMMARIES.PENAMBAHAN;
    const percentageChange = (data.SUMMARIES.PENAMBAHAN / previousScore) * 100;

    // Format number with full precision
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
        }).format(num);
    };

    return (
        <div className={cn("w-full space-y-6", className)}>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Skor IDM */}
                <Card className="relative overflow-hidden bg-linear-to-br from-sky-200 to-sky-300 border-0">
                    {/* Background Icon */}
                    <div className="absolute -top-4 -right-4 opacity-10 text-sky-600">
                        <Award className="h-32 w-32" />
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-sky-800 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Skor IDM
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-sky-900 mb-2">{formatNumber(overallScore)}</div>
                        <Progress value={overallScore * 100} className="h-2 bg-sky-400" />
                        <p className="text-xs text-sky-700 mt-2">dari 1.0000</p>
                    </CardContent>
                </Card>

                {/* Status IDM */}
                <Card className="relative overflow-hidden bg-linear-to-br from-emerald-200 to-emerald-300 border-0">
                    {/* Background Icon */}
                    <div className="absolute -top-4 -right-4 opacity-10 text-emerald-600">
                        <CheckCircle2 className="h-32 w-32" />
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Status IDM
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={cn("w-3 h-3 rounded-full bg-emerald-700")} />
                            <span className="text-2xl font-bold text-emerald-900">{data.SUMMARIES.STATUS}</span>
                        </div>
                        <Badge className="text-xs bg-emerald-600/20 text-emerald-800 border-emerald-700/30">
                            Status Saat Ini
                        </Badge>
                    </CardContent>
                </Card>

                {/* Target Status */}
                <Card className="relative overflow-hidden bg-linear-to-br from-violet-200 to-violet-300 border-0">
                    {/* Background Icon */}
                    <div className="absolute -top-4 -right-4 opacity-10 text-violet-600">
                        <Target className="h-32 w-32" />
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-violet-800 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Target Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={cn("w-3 h-3 rounded-full bg-violet-700")} />
                            <span className="text-2xl font-bold text-violet-900">{data.SUMMARIES.TARGET_STATUS}</span>
                        </div>
                        <Badge className="text-xs bg-violet-600/20 text-violet-800 border-violet-700/30">
                            {data.SUMMARIES.TAHUN + 1}
                        </Badge>
                    </CardContent>
                </Card>

                {/* Skor Minimal */}
                <Card className="relative overflow-hidden bg-linear-to-br from-amber-200 to-amber-300 border-0">
                    {/* Background Icon */}
                    <div className="absolute -top-4 -right-4 opacity-10 text-amber-600">
                        <Target className="h-32 w-32" />
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Skor Minimal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-amber-900 mb-2">{formatNumber(minimalScore)}</div>
                        <p className="text-xs text-amber-700">Batas minimum status Mandiri</p>
                    </CardContent>
                </Card>

                {/* Perubahan */}
                <Card
                    className={cn(
                        "relative overflow-hidden border-0",
                        data.SUMMARIES.PENAMBAHAN >= 0
                            ? "bg-linear-to-br from-teal-200 to-teal-300"
                            : "bg-linear-to-br from-rose-200 to-rose-300"
                    )}
                >
                    {/* Background Icon */}
                    <div
                        className={cn(
                            "absolute -top-4 -right-4 opacity-10",
                            data.SUMMARIES.PENAMBAHAN >= 0 ? "text-teal-600" : "text-rose-600"
                        )}
                    >
                        {data.SUMMARIES.PENAMBAHAN >= 0 ? (
                            <TrendingUp className="h-32 w-32" />
                        ) : (
                            <TrendingDown className="h-32 w-32" />
                        )}
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle
                            className={cn(
                                "text-sm font-medium flex items-center gap-2",
                                data.SUMMARIES.PENAMBAHAN >= 0 ? "text-teal-800" : "text-rose-800"
                            )}
                        >
                            {data.SUMMARIES.PENAMBAHAN >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            Perubahan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="flex flex-col gap-1 mb-2">
                            <span
                                className={cn(
                                    "text-2xl font-bold",
                                    data.SUMMARIES.PENAMBAHAN >= 0 ? "text-teal-900" : "text-rose-900"
                                )}
                            >
                                {data.SUMMARIES.PENAMBAHAN >= 0 ? "+" : ""}
                                {formatNumber(data.SUMMARIES.PENAMBAHAN)}
                            </span>
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    data.SUMMARIES.PENAMBAHAN >= 0 ? "text-teal-800" : "text-rose-800"
                                )}
                            >
                                ({data.SUMMARIES.PENAMBAHAN >= 0 ? "+" : ""}
                                {formatNumber(percentageChange)}%)
                            </span>
                        </div>
                        <p
                            className={cn(
                                "text-xs",
                                data.SUMMARIES.PENAMBAHAN >= 0 ? "text-teal-700" : "text-rose-700"
                            )}
                        >
                            dari tahun sebelumnya
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Category Breakdown - Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-primary" />
                            Distribusi Skor Per Kategori
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={categoryData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                                <Radar name="Skor" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6}>
                                    {categoryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#f59e0b"}
                                            fillOpacity={0.6}
                                        />
                                    ))}
                                </Radar>
                                <Tooltip formatter={(value: number) => [formatNumber(value), "Skor"]} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Perbandingan Skor Kategori
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={categoryData} barSize={80}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip formatter={(value: number) => [formatNumber(value), "Skor"]} />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {categoryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#f59e0b"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
