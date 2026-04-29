"use client";

import * as React from "react";
import { 
    DollarSign, 
    TrendingUp, 
    FileText, 
    Users, 
    Download, 
    Calendar,
    ArrowRight,
    Loader2,
    BarChart3
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DecorativeSeparator } from "@/components/ui/custom/DecorativeSeparator";

interface FinanceData {
    stats: Record<string, {
        total_anggaran: number;
        total_realisasi: number;
        count: number;
    }>;
    documents: Array<{
        judul: string;
        url: string;
        tahun: number;
        tgl_upload: string;
    }>;
    population: number;
    updated_at: string;
}

export default function KeuanganPage() {
    const [data, setData] = React.useState<FinanceData | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/keuangan/unified");
                const json = await res.json();
                if (json.success) {
                    setData(json.data);
                }
            } catch (err) {
                console.error("Failed to load finance data:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const formatIDR = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(val);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Memuat data keuangan...</p>
                </div>
            </div>
        );
    }

    const years = data ? Object.keys(data.stats).sort((a, b) => b.localeCompare(a)) : [];
    const latestYear = years[0];
    const latestStats = latestYear ? data?.stats[latestYear] : null;
    const perCapita = (latestStats && data?.population) ? Math.round(latestStats.total_anggaran / data.population) : 0;

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pb-20">
            {/* Hero Header */}
            <div className="bg-primary pt-16 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6">
                        <DollarSign className="w-4 h-4" />
                        Transparansi Anggaran & Keuangan
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Keuangan Kalurahan <span className="text-amber-400">Trimulyo</span>
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Wujud keterbukaan informasi publik dalam pengelolaan Dana Desa dan Anggaran Pendapatan Belanja Kalurahan (APBKAL).
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                {/* Main Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="border-none shadow-2xl bg-white group hover:translate-y-[-4px] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tahun {latestYear}</span>
                            </div>
                            <div className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-tight">Total Anggaran Proyek</div>
                            <div className="text-3xl font-black text-slate-900">{latestStats ? formatIDR(latestStats.total_anggaran) : "Rp 0"}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-white group hover:translate-y-[-4px] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Realisasi 100%</span>
                            </div>
                            <div className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-tight">Total Realisasi</div>
                            <div className="text-3xl font-black text-slate-900">{latestStats ? formatIDR(latestStats.total_realisasi) : "Rp 0"}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-linear-to-br from-amber-500 to-orange-600 text-white group hover:translate-y-[-4px] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/20 rounded-2xl">
                                    <Users className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-amber-100 uppercase tracking-widest">Estimasi Per Kapita</span>
                            </div>
                            <div className="text-sm font-bold text-amber-100 mb-1 uppercase tracking-tight">Anggaran per Warga</div>
                            <div className="text-3xl font-black">{formatIDR(perCapita)}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Annual Reports & Breakdown */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-xl overflow-hidden">
                            <CardHeader className="bg-slate-900 text-white p-8">
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-amber-400" />
                                    Ringkasan Anggaran Tahunan
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Berdasarkan data pembangunan Kalurahan Trimulyo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-100">
                                    {years.map(year => (
                                        <div key={year} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div>
                                                <div className="text-2xl font-black text-slate-900 mb-1">{year}</div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                                    <span className="flex items-center gap-1">
                                                        <FileText className="w-4 h-4" />
                                                        {data?.stats[year].count} Proyek
                                                    </span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                    <span>Data Terintegrasi OpenSID</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 text-right">
                                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pagu</div>
                                                <div className="text-2xl font-bold text-primary">{formatIDR(data?.stats[year].total_anggaran || 0)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transparency Notice */}
                        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                                <DollarSign className="w-40 h-40" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Transparansi Dana Desa</h3>
                                <p className="text-blue-100 leading-relaxed mb-6 opacity-90">
                                    Seluruh anggaran digunakan untuk meningkatkan kualitas infrastruktur, pelayanan publik, 
                                    dan pemberdayaan masyarakat Kalurahan Trimulyo. Masyarakat berhak mengetahui dan mengawasi setiap rupiah yang dikelola.
                                </p>
                                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 rounded-full shadow-lg group-hover:scale-105 transition-transform" asChild>
                                    <a href="/pembangunan">
                                        Lihat Detail Proyek
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Documents & Downloads */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-xl">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <Download className="w-5 h-5 text-primary" />
                                    Dokumen Resmi
                                </CardTitle>
                                <CardDescription>Unduh file APBKAL resmi terbaru</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                {data?.documents && data.documents.length > 0 ? (
                                    data.documents.map((doc, idx) => (
                                        <a 
                                            key={idx} 
                                            href={doc.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-md transition-all group"
                                        >
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm mr-4 group-hover:scale-110 transition-transform">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-slate-900 truncate uppercase">{doc.judul}</div>
                                                <div className="text-xs text-gray-500 font-medium">Tahun {doc.tahun || '2026'}</div>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                        </a>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400 italic text-sm">
                                        Belum ada dokumen yang dipublikasikan.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-slate-50">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Populasi Warga</div>
                                        <div className="text-xl font-black text-slate-900">{data?.population.toLocaleString('id-ID')} Jiwa</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dasar Perhitungan</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Estimasi Anggaran per Warga dihitung berdasarkan total pagu anggaran proyek dibagi dengan total jumlah penduduk terdaftar di Trimulyo.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DecorativeSeparator className="my-16" />

                {/* Footer Info */}
                <div className="text-center">
                    <p className="text-sm text-gray-400 font-medium">
                        Data terakhir diperbarui otomatis dari OpenSID pada {data ? new Date(data.updated_at).toLocaleString('id-ID') : '-'}
                    </p>
                </div>
            </div>
        </div>
    );
}
