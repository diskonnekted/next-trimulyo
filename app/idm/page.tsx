"use client";

import * as React from "react";
import Image from "next/image";
import { IDMDisplay } from "@/components/ui/custom/IDMDisplay";
import { IDMDetailTable } from "@/components/ui/custom/IDMDetailTable";
import { YearSelector } from "@/components/ui/custom/YearSelector";
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
        NILAI: string | null;
        PUSAT: string | null;
        PROV: string | null;
        KAB: string | null;
        DESA: string | null;
        CSR: string | null;
        LAINNYA: string | null;
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

// Function to fetch IDM data from API
const fetchIDMData = async (year: string = "2024"): Promise<IDMData | null> => {
    try {
        // Try fetching directly from Kemenkalurahan API (client-side to avoid Vercel server blocking)
        const directUrl = `https://idm.kemenkalurahan.go.id/open/api/kalurahan/rumusan/3404132005/${year}`;
        const response = await fetch(directUrl, {
            headers: { Accept: "application/json" },
        });

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
        console.error("Failed to fetch IDM data:", error);
        return null;
    }
};

// Try to find available data from current year backwards
const fetchIDMWithFallback = async (preferredYear: string): Promise<IDMData | null> => {
    const preferred = await fetchIDMData(preferredYear);
    if (preferred) return preferred;

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

export default function IDMPage() {
    const [data, setData] = React.useState<IDMData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [selectedYear, setSelectedYear] = React.useState<number>(2024);

    // Calculate available years (2021 to current year)
    // Using fixed current year to avoid Next.js prerender issues
    // TODO: Update this value annually (e.g., change 2025 to 2026 in 2026)
    const currentYear = 2025;
    const availableYears = React.useMemo(() => {
        const years = [];
        for (let year = 2021; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    }, [currentYear]);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setData(null);

            // Create a timeout promise that rejects after 30 seconds
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout: API took too long")), 30000);
            });

            try {
                const result = await Promise.race([fetchIDMWithFallback(selectedYear.toString()), timeoutPromise]);
                setData(result as IDMData);
            } catch (error) {
                console.error("Failed to load IDM data:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedYear]);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4 space-y-8">
                    {/* Page Header with Year Selector */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center rounded-full">
                            <Image
                                src="/images/idm/logo.webp"
                                alt="Logo IDM"
                                width={256}
                                height={256}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Indeks Kalurahan Mandiri (IDM)</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Evaluasi menyeluruh terhadap capaian Indeks Kalurahan Mandiri
                        </p>

                        {/* Year Selector */}
                        <div className="mt-6">
                            <YearSelector
                                years={availableYears}
                                selectedYear={selectedYear}
                                onYearChange={setSelectedYear}
                                className="max-w-4xl mx-auto"
                            />
                        </div>
                    </div>

                    {/* Loading State */}
                    <IDMDataLoading onTimeout={() => setData(null)} year={selectedYear} />
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4 space-y-8">
                    {/* Page Header with Year Selector */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center rounded-full">
                            <Image
                                src="/images/idm/logo.webp"
                                alt="Logo IDM"
                                width={256}
                                height={256}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Indeks Kalurahan Mandiri (IDM)</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Evaluasi menyeluruh terhadap capaian Indeks Kalurahan Mandiri
                        </p>

                        {/* Year Selector */}
                        <div className="mt-6">
                            <YearSelector
                                years={availableYears}
                                selectedYear={selectedYear}
                                onYearChange={setSelectedYear}
                                className="max-w-4xl mx-auto"
                            />
                        </div>
                    </div>

                    {/* Data Not Available State */}
                    <IDMDataNotAvailable
                        year={selectedYear}
                        onRetry={() => {
                            const loadData = async () => {
                                try {
                                    setLoading(true);
                                    const result = await fetchIDMWithFallback(selectedYear.toString());
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
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header with Year Selector */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center rounded-full">
                        <Image
                            src="/images/idm/logo.webp"
                            alt="Logo IDM"
                            width={256}
                            height={256}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Indeks Kalurahan Mandiri (IDM)</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Evaluasi menyeluruh terhadap capaian Indeks Kalurahan Mandiri
                    </p>

                    {/* Year Selector */}
                    <div className="mt-6">
                        <YearSelector
                            years={availableYears}
                            selectedYear={selectedYear}
                            onYearChange={setSelectedYear}
                            className="max-w-4xl mx-auto"
                        />
                    </div>
                </div>

                {/* IDM Summary Cards and Charts */}
                <IDMDisplay year={selectedYear.toString()} />

                {/* Detailed Table */}
                <IDMDetailTable data={data} />
            </div>
        </div>
    );
}
