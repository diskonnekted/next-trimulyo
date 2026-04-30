"use client";

import { useState, useEffect } from "react";
import {
    Heart, Users, Baby, Activity, MapPin, Search,
    RefreshCw, TrendingUp, Shield, Calendar, ChevronRight,
    UserCheck, AlertCircle, CheckCircle2, Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PosyanduItem {
    id: number;
    nama: string;
    dusun: string;
    kader: number;
    balita: number;
    ibu_hamil: number;
    status: string;
}

interface PosyanduStats {
    total_posyandu: number;
    total_balita: number;
    total_ibu_hamil: number;
    total_kader: number;
    posyandu_aktif: number;
}

const ICON_COLORS = [
    "from-pink-500 to-rose-600",
    "from-purple-500 to-violet-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-indigo-500 to-blue-600",
    "from-red-500 to-pink-600",
    "from-green-500 to-emerald-600",
    "from-cyan-500 to-sky-600",
    "from-violet-500 to-purple-600",
    "from-teal-500 to-green-600",
    "from-amber-500 to-orange-600",
    "from-sky-500 to-indigo-600",
];

export default function PosyanduPage() {
    const [data, setData] = useState<PosyanduItem[]>([]);
    const [stats, setStats] = useState<PosyanduStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [source, setSource] = useState<"live" | "static">("static");

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/posyandu");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (json.success) {
                setData(json.data || []);
                setStats(json.stats);
                setSource(json.source);
            } else {
                throw new Error("API returned failure");
            }
        } catch (e) {
            setError("Tidak dapat memuat data posyandu. Menampilkan data statis.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = data.filter(p =>
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.dusun.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-10 w-32 h-32 rounded-full bg-white blur-2xl" />
                    <div className="absolute bottom-4 right-20 w-48 h-48 rounded-full bg-white blur-3xl" />
                    <div className="absolute top-8 right-1/3 w-24 h-24 rounded-full bg-yellow-300 blur-2xl" />
                </div>
                <div className="relative container mx-auto px-4 py-14">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm">
                            <Heart className="h-6 w-6 text-white fill-white" />
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1">
                            Kalurahan Trimulyo
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                        Pos Pelayanan Terpadu
                    </h1>
                    <p className="text-pink-100 text-lg max-w-xl">
                        Data Posyandu aktif di seluruh wilayah Kalurahan Trimulyo, Sleman, DIY
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <div className={`w-2 h-2 rounded-full ${source === "live" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
                        <span className="text-sm text-pink-100">
                            {source === "live" ? "Data langsung dari sistem Posyandu" : "Data referensi Kalurahan Trimulyo"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 space-y-10">
                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { label: "Total Posyandu", value: stats.total_posyandu, icon: Shield, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-pink-200 dark:border-pink-800" },
                            { label: "Posyandu Aktif", value: stats.posyandu_aktif, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
                            { label: "Total Balita", value: stats.total_balita, icon: Baby, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
                            { label: "Ibu Hamil", value: stats.total_ibu_hamil, icon: Heart, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/30", border: "border-rose-200 dark:border-rose-800" },
                            { label: "Total Kader", value: stats.total_kader, icon: UserCheck, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800" },
                        ].map((s) => (
                            <Card key={s.label} className={`border ${s.border} ${s.bg} hover:shadow-md transition-shadow`}>
                                <CardContent className="p-5">
                                    <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mb-3`}>
                                        <s.icon className={`h-5 w-5 ${s.color}`} />
                                    </div>
                                    <div className={`text-3xl font-bold ${s.color}`}>
                                        {loading ? "—" : s.value.toLocaleString("id-ID")}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari nama atau dusun..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchData}
                        disabled={loading}
                        className="gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        Perbarui Data
                    </Button>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-700 dark:text-amber-400">{error}</p>
                    </div>
                )}

                {/* Posyandu Cards Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-5 space-y-3">
                                    <div className="w-12 h-12 rounded-xl bg-muted" />
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
                                    <div className="grid grid-cols-3 gap-2 pt-2">
                                        {[1,2,3].map(j => <div key={j} className="h-14 bg-muted rounded-lg" />)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <Card className="p-16 text-center">
                        <Heart className="h-14 w-14 mx-auto text-muted-foreground opacity-20 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Tidak Ada Data</h3>
                        <p className="text-muted-foreground">
                            {search ? `Tidak ditemukan posyandu dengan kata kunci "${search}"` : "Data posyandu belum tersedia"}
                        </p>
                        {search && (
                            <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>Reset Pencarian</Button>
                        )}
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map((posyandu, idx) => (
                            <Card
                                key={posyandu.id}
                                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 overflow-hidden"
                            >
                                <div className={`h-2 bg-gradient-to-r ${ICON_COLORS[idx % ICON_COLORS.length]}`} />
                                <CardContent className="p-5">
                                    {/* Icon + Status */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ICON_COLORS[idx % ICON_COLORS.length]} flex items-center justify-center shadow-sm`}>
                                            <Heart className="h-6 w-6 text-white fill-white/80" />
                                        </div>
                                        <Badge
                                            className={posyandu.status === "Aktif"
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200"
                                                : "bg-gray-100 text-gray-600 border-gray-200"
                                            }
                                        >
                                            {posyandu.status}
                                        </Badge>
                                    </div>

                                    {/* Name */}
                                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-pink-600 transition-colors">
                                        {posyandu.nama}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>Dusun {posyandu.dusun}</span>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3 text-center">
                                            <Baby className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                                            <div className="font-bold text-blue-700 dark:text-blue-400 text-lg leading-none">{posyandu.balita}</div>
                                            <div className="text-[10px] text-blue-600/70 dark:text-blue-400/70 mt-0.5">Balita</div>
                                        </div>
                                        <div className="bg-rose-50 dark:bg-rose-950/30 rounded-xl p-3 text-center">
                                            <Heart className="h-4 w-4 text-rose-500 mx-auto mb-1" />
                                            <div className="font-bold text-rose-700 dark:text-rose-400 text-lg leading-none">{posyandu.ibu_hamil}</div>
                                            <div className="text-[10px] text-rose-600/70 dark:text-rose-400/70 mt-0.5">Bumil</div>
                                        </div>
                                        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-3 text-center">
                                            <UserCheck className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                                            <div className="font-bold text-purple-700 dark:text-purple-400 text-lg leading-none">{posyandu.kader}</div>
                                            <div className="text-[10px] text-purple-600/70 dark:text-purple-400/70 mt-0.5">Kader</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Summary Footer */}
                {!loading && filtered.length > 0 && (
                    <div className="text-center text-sm text-muted-foreground pt-2">
                        Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari <span className="font-semibold text-foreground">{data.length}</span> posyandu
                        {search && ` untuk pencarian "${search}"`}
                    </div>
                )}

                {/* Info Banner */}
                <Card className="border-pink-200 dark:border-pink-800 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
                    <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-pink-900 dark:text-pink-200 mb-1">Sistem Informasi Posyandu Trimulyo</h4>
                            <p className="text-sm text-pink-700 dark:text-pink-300/80">
                                Data posyandu dikelola melalui Sistem Informasi Posyandu Kalurahan Trimulyo.
                                Untuk informasi lebih lanjut, kunjungi{" "}
                                <a
                                    href="https://posyandu-trimulyo.sleman-desa.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-medium hover:text-pink-900 transition-colors"
                                >
                                    posyandu-trimulyo.sleman-desa.id
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
