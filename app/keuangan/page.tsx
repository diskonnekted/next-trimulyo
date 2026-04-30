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
    BarChart3,
    CheckCircle2
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DecorativeSeparator } from "@/components/ui/custom/DecorativeSeparator";
import { Progress } from "@/components/ui/progress";

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
    apbk2026: {
        pelaksanaan: {
            pendapatan: { anggaran: number; realisasi: number; persen: number };
            belanja: { anggaran: number; realisasi: number; persen: number };
            pembiayaan: { anggaran: number; realisasi: number; persen: number };
        };
        pendapatan_detail: Array<{ judul: string; anggaran: number; realisasi: number }>;
        pembelanjaan_detail: Array<{ judul: string; anggaran: number; realisasi: number }>;
        pembiayaan_detail: Array<{ judul: string; anggaran: number; realisasi: number }>;
    };
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
                    <p className="text-gray-500 font-medium">Memuat laporan keuangan...</p>
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
            {/* Hero Header - RED Scheme */}
            <div className="bg-primary pt-16 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6">
                        <DollarSign className="w-4 h-4" />
                        Transparansi Anggaran Kalurahan
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Keuangan <span className="text-amber-400">Trimulyo</span>
                    </h1>
                    <p className="text-lg text-rose-50 max-w-2xl mx-auto leading-relaxed">
                        Informasi terbuka mengenai tata kelola APBKAL (Anggaran Pendapatan dan Belanja Kalurahan) untuk masyarakat Trimulyo.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                {/* Main Stats Row - RED Theme */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="border-none shadow-2xl bg-white group hover:translate-y-[-4px] transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-rose-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tahun {latestYear}</span>
                            </div>
                            <div className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-tight">Total Anggaran Proyek</div>
                            <div className="text-3xl font-black text-slate-900">{latestStats ? formatIDR(latestStats.total_anggaran) : "Rp 0"}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-white group hover:translate-y-[-4px] transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Realisasi Penuh</span>
                            </div>
                            <div className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-tight">Total Realisasi</div>
                            <div className="text-3xl font-black text-slate-900">{latestStats ? formatIDR(latestStats.total_realisasi) : "Rp 0"}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-linear-to-br from-primary to-rose-700 text-white group hover:translate-y-[-4px] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/20 rounded-2xl">
                                    <Users className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-rose-100 uppercase tracking-widest">Populasi Warga</span>
                            </div>
                            <div className="text-sm font-bold text-rose-100 mb-1 uppercase tracking-tight">Anggaran per Warga</div>
                            <div className="text-3xl font-black">{formatIDR(perCapita)}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* NEW SECTION: APBKAL 2026 Summary (Based on image data) */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Rincian APBKAL 2026</h2>
                            <p className="text-sm text-gray-500 font-medium">Data Transparansi Real-Time Kalurahan</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* APBK Column 1 */}
                        <Card className="border-none shadow-lg bg-white border-t-4 border-primary">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold text-slate-800">Pelaksanaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { label: "Pendapatan", data: data?.apbk2026.pelaksanaan.pendapatan },
                                    { label: "Belanja", data: data?.apbk2026.pelaksanaan.belanja },
                                    { label: "Pembiayaan", data: data?.apbk2026.pelaksanaan.pembiayaan }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-slate-600">{item.label}</span>
                                            <span className="text-primary font-bold">{(item.data?.persen || 0).toFixed(0)}%</span>
                                        </div>
                                        <div className="text-lg font-black text-slate-900">{formatIDR(item.data?.anggaran || 0)}</div>
                                        <Progress value={item.data?.persen || 0} className="h-1.5" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* APBK Column 2 */}
                        <Card className="border-none shadow-lg bg-white border-t-4 border-primary">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold text-slate-800">Sumber Pendapatan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {data?.apbk2026.pendapatan_detail.map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-slate-500 truncate mr-2">{item.judul}</span>
                                            <span className="text-primary font-bold">0%</span>
                                        </div>
                                        <div className="text-base font-bold text-slate-900">{formatIDR(item.anggaran)}</div>
                                        <Progress value={0} className="h-1.5" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* APBK Column 3: Pembiayaan & Belanja Lainnya */}
                        <Card className="border-none shadow-lg bg-white border-t-4 border-primary">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold text-slate-800">Bidang Pembelanjaan & Pembiayaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detail Belanja</h3>
                                    {data?.apbk2026.pembelanjaan_detail.slice(2).map((item, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-medium text-slate-500 truncate mr-2">{item.judul}</span>
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">{formatIDR(item.anggaran)}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pembiayaan Netto</h3>
                                    {data?.apbk2026.pembiayaan_detail.map((item, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-medium text-slate-500 truncate mr-2">{item.judul}</span>
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">{formatIDR(item.anggaran)}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Historic Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-xl overflow-hidden">
                            <CardHeader className="bg-slate-900 text-white p-8">
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-amber-400" />
                                    Histori Anggaran Kalurahan
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Ringkasan pengelolaan anggaran tahun-tahun sebelumnya
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-100">
                                    {years.map(year => (
                                        <div key={year} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div>
                                                <div className="text-2xl font-black text-slate-900 mb-1">{year}</div>
                                                <div className="text-sm text-gray-500 font-medium">
                                                    Terdiri dari {data?.stats[year].count} Proyek Pembangunan
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 text-right">
                                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Anggaran</div>
                                                <div className="text-2xl font-bold text-primary">{formatIDR(data?.stats[year].total_anggaran || 0)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Documents Column */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-xl">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <Download className="w-5 h-5 text-primary" />
                                    Dokumen APBKAL
                                </CardTitle>
                                <CardDescription>Unduh salinan resmi dokumen keuangan</CardDescription>
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
                                                <div className="text-xs text-gray-500 font-medium">File PDF • {doc.tahun}</div>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                        </a>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400 italic text-sm">
                                        Dokumen belum tersedia.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden">
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Transparansi Penuh</h3>
                            <p className="text-rose-100 text-sm leading-relaxed mb-6 opacity-90 relative z-10">
                                Setiap anggaran dikelola secara akuntabel untuk pembangunan Trimulyo yang lebih baik.
                            </p>
                            <Button className="w-full bg-white text-primary hover:bg-rose-50 font-bold rounded-xl relative z-10" asChild>
                                <a href="/pembangunan">Detail Proyek Pembangunan</a>
                            </Button>
                        </div>
                    </div>
                </div>

                <DecorativeSeparator className="my-16" />

                <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium">
                        Data disinkronisasi otomatis dari OpenSID Trimulyo • Pembaruan terakhir: {data ? new Date(data.updated_at).toLocaleString('id-ID') : '-'}
                    </p>
                </div>
            </div>
        </div>
    );
}
