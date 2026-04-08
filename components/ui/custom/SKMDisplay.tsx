"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Users, BarChart3, MessageSquare, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for SKM survey data
interface SKMSurvey {
    id: string;
    jenis_layanan: string;
    umur: string;
    jenis_kelamin: string;
    pendidikan_terakhir: string;
    pekerjaan: string;
    pertanyaan1: string;
    pertanyaan2: string;
    pertanyaan3: string;
    pertanyaan4: string;
    pertanyaan5: string;
    pertanyaan6: string;
    pertanyaan7: string;
    pertanyaan8: string;
    pertanyaan9: string;
    saran: string;
    tanggal_submit: string;
}

interface SKMStats {
    totalResponses: number;
    averageScore: number;
    category: { label: string; badgeClass: string; color: string };
    byService: Array<{ service: string; count: number; avgScore: number }>;
    byGender: Array<{ gender: string; count: number; avgScore: number }>;
    byEducation: Array<{ education: string; count: number; avgScore: number }>;
    recentSuggestions: Array<{ saran: string; date: string; service: string }>;
}

const SKM_CONFIG = {
    pertanyaanLabels: [
        "Persyaratan Pelayanan",
        "Sistem Prosedur & Mekanisme",
        "Waktu Penyelesaian",
        "Biaya Tarif",
        "Produk Jenis Pelayanan",
        "Kompetensi Petugas Pelayanan",
        "Perilaku Petugas Pelayanan",
        "Sarana Prasarana",
        "Penanganan Pengaduan",
    ],
    skorMax: 4,
    categories: [
        { min: 3.6, label: "Sangat Baik", badgeClass: "bg-green-100 text-green-800 border-green-300", color: "text-green-600" },
        { min: 3.0, label: "Baik", badgeClass: "bg-blue-100 text-blue-800 border-blue-300", color: "text-blue-600" },
        { min: 2.4, label: "Cukup Baik", badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-300", color: "text-yellow-600" },
        { min: 0, label: "Kurang Baik", badgeClass: "bg-red-100 text-red-800 border-red-300", color: "text-red-600" },
    ],
};

function getCategory(score: number) {
    return SKM_CONFIG.categories.find((c) => score >= c.min) ?? SKM_CONFIG.categories[SKM_CONFIG.categories.length - 1];
}

function calculateAverage(questions: string[]): number {
    const nums = questions.map(Number).filter((n) => !isNaN(n));
    if (nums.length === 0) return 0;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// Fetch SKM data from WordPress API directly from browser
async function fetchSKMData(): Promise<SKMSurvey[]> {
    try {
        const response = await fetch(
            "https://trimulyosid.slemankab.go.id/wp-json/skm/v1/surveys",
            { headers: { Accept: "application/json" } }
        );
        if (!response.ok) return [];
        const data = await response.json();
        return data ?? [];
    } catch {
        return [];
    }
}

export function SKMDisplay({ className }: { className?: string }) {
    const [loading, setLoading] = React.useState(true);
    const [stats, setStats] = React.useState<SKMStats | null>(null);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const surveys = await fetchSKMData();
                if (surveys.length === 0) {
                    setStats(null);
                    return;
                }

                // Calculate stats
                const allScores = surveys.map((s) => {
                    const questions = [
                        s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                        s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                    ];
                    return calculateAverage(questions);
                });

                const overallAvg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
                const category = getCategory(overallAvg);

                // By service
                const serviceMap = new Map<string, SKMSurvey[]>();
                surveys.forEach((s) => {
                    const key = s.jenis_layanan;
                    if (!serviceMap.has(key)) serviceMap.set(key, []);
                    serviceMap.get(key)!.push(s);
                });

                const byService = Array.from(serviceMap.entries())
                    .map(([service, items]) => {
                        const avg = items.reduce((acc, s) => {
                            const questions = [
                                s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                                s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                            ];
                            return acc + calculateAverage(questions);
                        }, 0) / items.length;
                        return { service, count: items.length, avgScore: avg };
                    })
                    .sort((a, b) => b.count - a.count);

                // By gender
                const genderMap = new Map<string, SKMSurvey[]>();
                surveys.forEach((s) => {
                    const key = s.jenis_kelamin;
                    if (!genderMap.has(key)) genderMap.set(key, []);
                    genderMap.get(key)!.push(s);
                });

                const byGender = Array.from(genderMap.entries()).map(([gender, items]) => {
                    const avg = items.reduce((acc, s) => acc + calculateAverage([
                        s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                        s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                    ]), 0) / items.length;
                    return { gender, count: items.length, avgScore: avg };
                });

                // By education
                const eduMap = new Map<string, SKMSurvey[]>();
                surveys.forEach((s) => {
                    const key = s.pendidikan_terakhir;
                    if (!eduMap.has(key)) eduMap.set(key, []);
                    eduMap.get(key)!.push(s);
                });

                const byEducation = Array.from(eduMap.entries()).map(([education, items]) => {
                    const avg = items.reduce((acc, s) => acc + calculateAverage([
                        s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                        s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                    ]), 0) / items.length;
                    return { education, count: items.length, avgScore: avg };
                }).sort((a, b) => b.count - a.count);

                // Recent suggestions
                const recentSuggestions = surveys
                    .filter((s) => s.saran && s.saran.trim())
                    .sort((a, b) => b.tanggal_submit.localeCompare(a.tanggal_submit))
                    .slice(0, 5)
                    .map((s) => ({
                        saran: s.saran,
                        date: s.tanggal_submit,
                        service: s.jenis_layanan,
                    }));

                setStats({
                    totalResponses: surveys.length,
                    averageScore: overallAvg,
                    category: category,
                    byService,
                    byGender,
                    byEducation,
                    recentSuggestions,
                });
            } catch {
                setStats(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleRefresh = async () => {
        setLoading(true);
        const surveys = await fetchSKMData();
        if (surveys.length > 0) {
            const allScores = surveys.map((s) => {
                const questions = [
                    s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                    s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                ];
                return calculateAverage(questions);
            });
            const overallAvg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
            const category = getCategory(overallAvg);

            const serviceMap = new Map<string, SKMSurvey[]>();
            surveys.forEach((s) => {
                const key = s.jenis_layanan;
                if (!serviceMap.has(key)) serviceMap.set(key, []);
                serviceMap.get(key)!.push(s);
            });

            const byService = Array.from(serviceMap.entries())
                .map(([service, items]) => {
                    const avg = items.reduce((acc, s) => acc + calculateAverage([
                        s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                        s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                    ]), 0) / items.length;
                    return { service, count: items.length, avgScore: avg };
                })
                .sort((a, b) => b.count - a.count);

            const genderMap = new Map<string, SKMSurvey[]>();
            surveys.forEach((s) => {
                const key = s.jenis_kelamin;
                if (!genderMap.has(key)) genderMap.set(key, []);
                genderMap.get(key)!.push(s);
            });

            const byGender = Array.from(genderMap.entries()).map(([gender, items]) => {
                const avg = items.reduce((acc, s) => acc + calculateAverage([
                    s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                    s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                ]), 0) / items.length;
                return { gender, count: items.length, avgScore: avg };
            });

            const eduMap = new Map<string, SKMSurvey[]>();
            surveys.forEach((s) => {
                const key = s.pendidikan_terakhir;
                if (!eduMap.has(key)) eduMap.set(key, []);
                eduMap.get(key)!.push(s);
            });

            const byEducation = Array.from(eduMap.entries()).map(([education, items]) => {
                const avg = items.reduce((acc, s) => acc + calculateAverage([
                    s.pertanyaan1, s.pertanyaan2, s.pertanyaan3, s.pertanyaan4,
                    s.pertanyaan5, s.pertanyaan6, s.pertanyaan7, s.pertanyaan8, s.pertanyaan9,
                ]), 0) / items.length;
                return { education, count: items.length, avgScore: avg };
            }).sort((a, b) => b.count - a.count);

            const recentSuggestions = surveys
                .filter((s) => s.saran && s.saran.trim())
                .sort((a, b) => b.tanggal_submit.localeCompare(a.tanggal_submit))
                .slice(0, 5)
                .map((s) => ({
                    saran: s.saran,
                    date: s.tanggal_submit,
                    service: s.jenis_layanan,
                }));

            setStats({
                totalResponses: surveys.length,
                averageScore: overallAvg,
                category: category,
                byService,
                byGender,
                byEducation,
                recentSuggestions,
            });
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className={cn("space-y-4", className)}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-2">Survei Kepuasan Masyarakat</h2>
                    <p className="text-gray-600">Memuat data survei...</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="animate-pulse space-y-3">
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-8 bg-muted rounded w-1/2"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className={cn("space-y-4", className)}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-2">Survei Kepuasan Masyarakat</h2>
                    <p className="text-gray-600">Data survei belum tersedia</p>
                </div>
            </div>
        );
    }

    const scorePercentage = (stats.averageScore / SKM_CONFIG.skorMax) * 100;

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-primary">Survei Kepuasan Masyarakat</h2>
                    <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-gray-600">Hasil survei kepuasan masyarakat Kalurahan Trimulyo</p>
                <Badge variant="outline" className="mt-2">Sumber: trimulyosid.slemankab.go.id</Badge>
            </div>

            {/* Main Score Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Skor Kepuasan Rata-rata
                    </CardTitle>
                    <CardDescription>Berdasarkan {stats.totalResponses} responden</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">
                            {stats.averageScore.toFixed(2)}
                            <span className="text-2xl text-gray-400"> / {SKM_CONFIG.skorMax}</span>
                        </div>
                        <Progress value={scorePercentage} className="h-3 max-w-xs mx-auto mb-4" />
                        <Badge variant="outline" className={cn("text-lg px-4 py-1 font-semibold", stats.category.badgeClass)}>
                            {stats.category.label}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* By Service */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Per Jenis Layanan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stats.byService.slice(0, 5).map((item) => {
                            const cat = getCategory(item.avgScore);
                            return (
                                <div key={item.service} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium truncate">{item.service}</span>
                                        <span className={cn("font-semibold", cat.color)}>
                                            {item.avgScore.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">{item.count} responden</div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* By Gender */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Per Jenis Kelamin
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stats.byGender.map((item) => {
                            const cat = getCategory(item.avgScore);
                            return (
                                <div key={item.gender} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{item.gender}</span>
                                        <span className={cn("font-semibold", cat.color)}>
                                            {item.avgScore.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">{item.count} responden</div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* By Education */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Per Pendidikan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stats.byEducation.slice(0, 5).map((item) => {
                            const cat = getCategory(item.avgScore);
                            const eduShort = item.education.replace("Tamat ", "").replace("sederajat", "sed.");
                            return (
                                <div key={item.education} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium truncate">{eduShort}</span>
                                        <span className={cn("font-semibold", cat.color)}>
                                            {item.avgScore.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">{item.count} responden</div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Suggestions */}
            {stats.recentSuggestions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Saran Terbaru dari Masyarakat
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stats.recentSuggestions.map((s, i) => (
                            <div key={i} className="border-l-4 border-primary/30 pl-4 py-2">
                                <p className="text-sm italic text-gray-700">&ldquo;{s.saran}&rdquo;</p>
                                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                                    <Badge variant="secondary" className="text-xs">{s.service}</Badge>
                                    <span>{new Date(s.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Refresh Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                    Perbarui Data
                </button>
            </div>
        </div>
    );
}
