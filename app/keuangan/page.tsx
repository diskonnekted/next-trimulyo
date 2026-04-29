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
    Building2,
    PieChart
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
        pendapatan_detail: Array<{ judul: string; anggaran: number; realisasi: number; persen: number }>;
        pembelanjaan_detail: Array<{ judul: string; anggaran: number; realisasi: number; persen: number }>;
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
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-blue-200/60 font-medium">Memuat data real-time APBKAL...</p>
                </div>
            </div>
        );
    }

    const years = data ? Object.keys(data.stats).sort((a, b) => b.localeCompare(a)) : [];
    
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
            {/* Dark Header */}
            <div className="pt-20 pb-16 text-center container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                    Anggaran Pendapatan dan Belanja Desa
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Transparansi anggaran dan realisasi APBDES desa secara real time
                </p>
            </div>

            <div className="container mx-auto px-4 space-y-12">
                {/* 3 Column Layout - APBK 2026 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Pelaksanaan */}
                    <Card className="bg-[#1e293b] border-slate-800 shadow-2xl">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Transparansi Anggaran</span>
                                <div className="p-2 bg-blue-500/20 rounded-lg text-cyan-400">
                                    <Building2 className="w-4 h-4" />
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-white mt-2">APBK 2026 Pelaksanaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-4">
                            {[
                                { label: "Pendapatan", data: data?.apbk2026.pelaksanaan.pendapatan },
                                { label: "Belanja", data: data?.apbk2026.pelaksanaan.belanja },
                                { label: "Pembiayaan", data: data?.apbk2026.pelaksanaan.pembiayaan }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="text-lg font-bold text-white">{item.label}</div>
                                        <div className="text-xs font-bold text-slate-400">{(item.data?.persen || 0).toFixed(2)}%</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Anggaran</div>
                                            <div className="text-sm font-black text-white text-center break-words">{formatIDR(item.data?.anggaran || 0)}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Realisasi</div>
                                            <div className="text-sm font-black text-white text-center">{formatIDR(item.data?.realisasi || 0)}</div>
                                        </div>
                                    </div>
                                    <Progress value={item.data?.persen || 0} className="h-1.5 bg-slate-700/50" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Column 2: Pendapatan Detail */}
                    <Card className="bg-[#1e293b] border-slate-800 shadow-2xl">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Transparansi Anggaran</span>
                                <div className="p-2 bg-blue-500/20 rounded-lg text-cyan-400">
                                    <Building2 className="w-4 h-4" />
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-white mt-2">APBK 2026 Pendapatan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-4">
                            {data?.apbk2026.pendapatan_detail.map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm font-bold text-white max-w-[80%]">{item.judul}</div>
                                        <div className="text-xs font-bold text-slate-400">{(item.persen || 0).toFixed(2)}%</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Anggaran</div>
                                            <div className="text-sm font-black text-white text-center">{formatIDR(item.anggaran)}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Realisasi</div>
                                            <div className="text-sm font-black text-white text-center">{formatIDR(item.realisasi)}</div>
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                            style={{ width: `${item.persen}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Column 3: Pembelanjaan Detail */}
                    <Card className="bg-[#1e293b] border-slate-800 shadow-2xl">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Transparansi Anggaran</span>
                                <div className="p-2 bg-blue-500/20 rounded-lg text-cyan-400">
                                    <Building2 className="w-4 h-4" />
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-white mt-2">APBK 2026 Pembelanjaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-4">
                            {data?.apbk2026.pembelanjaan_detail.map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm font-bold text-white max-w-[80%]">{item.judul}</div>
                                        <div className="text-xs font-bold text-slate-400">{(item.persen || 0).toFixed(2)}%</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Anggaran</div>
                                            <div className="text-sm font-black text-white text-center">{formatIDR(item.anggaran)}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Realisasi</div>
                                            <div className="text-sm font-black text-white text-center">{formatIDR(item.realisasi)}</div>
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                            style={{ width: `${item.persen}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <DecorativeSeparator className="opacity-20" />

                {/* Supporting Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Annual Stats Summary */}
                    <Card className="bg-[#1e293b] border-slate-800 shadow-xl overflow-hidden">
                        <CardHeader className="bg-slate-900/50 border-b border-slate-800 p-6">
                            <CardTitle className="text-white flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-amber-400" />
                                Ringkasan Historis Anggaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-800">
                                {years.map(year => (
                                    <div key={year} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                        <div>
                                            <div className="text-xl font-black text-white">{year}</div>
                                            <div className="text-xs text-slate-500 font-medium">{data?.stats[year].count} Proyek Terdaftar</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Pagu</div>
                                            <div className="text-lg font-bold text-blue-400">{formatIDR(data?.stats[year].total_anggaran || 0)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Official Documents */}
                    <div className="space-y-6">
                        <Card className="bg-[#1e293b] border-slate-800 shadow-xl">
                            <CardHeader className="p-6">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Download className="w-5 h-5 text-emerald-400" />
                                    Dokumen APBKAL Resmi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                {data?.documents.map((doc, idx) => (
                                    <a 
                                        key={idx} 
                                        href={doc.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-slate-900/30 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group"
                                    >
                                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-rose-500 shadow-sm mr-4 group-hover:scale-110 transition-transform">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-slate-200 truncate uppercase tracking-tight">{doc.judul}</div>
                                            <div className="text-xs text-slate-500 font-medium">Tahun {doc.tahun} • PDF Document</div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </a>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <Users className="w-8 h-8 opacity-50" />
                                <h3 className="text-xl font-bold">Basis Data Warga</h3>
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed mb-6">
                                Estimasi anggaran dikelola untuk melayani <span className="font-black text-white">{data?.population.toLocaleString('id-ID')}</span> jiwa 
                                penduduk Kalurahan Trimulyo dengan prinsip pemerataan dan keadilan.
                            </p>
                            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl" asChild>
                                <a href="/pembangunan">Detail Realisasi Proyek</a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="text-center pt-8 border-t border-slate-800/50">
                    <p className="text-xs text-slate-500 font-medium">
                        Sinkronisasi terakhir: {data ? new Date(data.updated_at).toLocaleString('id-ID') : '-'} • Sumber Data: OpenSID Kalurahan Trimulyo
                    </p>
                </div>
            </div>
        </div>
    );
}
