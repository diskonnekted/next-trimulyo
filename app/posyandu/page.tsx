"use client";

import { useState, useEffect } from "react";
import {
    Heart, Users, Baby, Activity, MapPin, Search,
    RefreshCw, Shield, UserCheck, AlertCircle, CheckCircle2,
    ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

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

const statCards = (stats: PosyanduStats) => [
    { label: "Total Posyandu",  value: stats.total_posyandu,  icon: Shield,       color: "text-primary" },
    { label: "Posyandu Aktif",  value: stats.posyandu_aktif,  icon: CheckCircle2, color: "text-green-600" },
    { label: "Total Balita",    value: stats.total_balita,    icon: Baby,         color: "text-blue-600" },
    { label: "Ibu Hamil",       value: stats.total_ibu_hamil, icon: Heart,        color: "text-rose-600" },
    { label: "Total Kader",     value: stats.total_kader,     icon: UserCheck,    color: "text-purple-600" },
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
            } else throw new Error("API returned failure");
        } catch {
            setError("Tidak dapat memuat data posyandu.");
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
        <main className="min-h-screen bg-background">
            {/* Page Header — konsisten dengan halaman lain */}
            <div className="bg-primary text-white py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                        <span>Informasi</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white font-medium">Posyandu</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Pos Pelayanan Terpadu</h1>
                    <p className="text-white/80">
                        Data Posyandu aktif di seluruh wilayah Kalurahan Trimulyo
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        <div className={`w-2 h-2 rounded-full ${source === "live" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
                        <span className="text-sm text-white/70">
                            {source === "live" ? "Data langsung dari sistem Posyandu" : "Data referensi Kalurahan Trimulyo"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">

                {/* Statistik — style sama dengan kartu HeroStats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <Card key={i} className="bg-card border-border">
                                <CardContent className="p-5">
                                    <Skeleton className="h-8 w-8 rounded-full mb-3" />
                                    <Skeleton className="h-8 w-16 mb-2" />
                                    <Skeleton className="h-4 w-24" />
                                </CardContent>
                            </Card>
                        ))
                    ) : stats ? (
                        statCards(stats).map((s) => (
                            <Card key={s.label} className="bg-card border-border hover:shadow-md transition-shadow">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                                        <s.icon className={`h-5 w-5 ${s.color}`} />
                                    </div>
                                    <div className={`text-3xl font-bold ${s.color}`}>
                                        {s.value.toLocaleString("id-ID")}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                                </CardContent>
                            </Card>
                        ))
                    ) : null}
                </div>

                {/* Section Header — konsisten dengan landing */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">Daftar Posyandu</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {data.length} posyandu aktif melayani masyarakat Kalurahan Trimulyo
                    </p>
                </div>

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
                    <div className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">{error}</p>
                    </div>
                )}

                {/* Cards Grid — card style konsisten dengan site */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} className="bg-card border-border">
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[1,2,3].map(j => <Skeleton key={j} className="h-16 rounded-lg" />)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <Card className="bg-card border-border p-16 text-center">
                        <Heart className="h-14 w-14 mx-auto text-muted-foreground opacity-20 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Tidak Ada Data</h3>
                        <p className="text-muted-foreground">
                            {search ? `Tidak ditemukan posyandu dengan kata kunci "${search}"` : "Data posyandu belum tersedia"}
                        </p>
                        {search && (
                            <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                                Reset Pencarian
                            </Button>
                        )}
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((posyandu) => (
                            <Card
                                key={posyandu.id}
                                className="bg-card border-border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                                                <Heart className="h-4 w-4 text-primary fill-primary/30" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base leading-tight">{posyandu.nama}</CardTitle>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>Dusun {posyandu.dusun}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={posyandu.status === "Aktif" ? "default" : "secondary"}
                                            className={posyandu.status === "Aktif" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-0 text-xs" : "text-xs"}
                                        >
                                            {posyandu.status}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                                            <Baby className="h-3.5 w-3.5 text-blue-500 mx-auto mb-1" />
                                            <div className="font-bold text-foreground text-base">{posyandu.balita}</div>
                                            <div className="text-[10px] text-muted-foreground">Balita</div>
                                        </div>
                                        <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                                            <Heart className="h-3.5 w-3.5 text-rose-500 mx-auto mb-1" />
                                            <div className="font-bold text-foreground text-base">{posyandu.ibu_hamil}</div>
                                            <div className="text-[10px] text-muted-foreground">Bumil</div>
                                        </div>
                                        <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                                            <UserCheck className="h-3.5 w-3.5 text-primary mx-auto mb-1" />
                                            <div className="font-bold text-foreground text-base">{posyandu.kader}</div>
                                            <div className="text-[10px] text-muted-foreground">Kader</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Footer count */}
                {!loading && filtered.length > 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                        Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari{" "}
                        <span className="font-semibold text-foreground">{data.length}</span> posyandu
                        {search && ` · pencarian "${search}"`}
                    </p>
                )}

                {/* Info Card — konsisten dengan card info di halaman lain */}
                <Card className="bg-card border-border">
                    <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                            <Activity className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground mb-1">Sistem Informasi Posyandu Trimulyo</h4>
                            <p className="text-sm text-muted-foreground">
                                Data dikelola melalui Sistem Informasi Posyandu Kalurahan Trimulyo.
                                Untuk informasi lebih lanjut, kunjungi{" "}
                                <a
                                    href="https://posyandu-trimulyo.sleman-desa.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline hover:no-underline font-medium"
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
