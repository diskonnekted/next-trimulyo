"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Star, ChevronRight, Send, CheckCircle2, BarChart3,
    Users, Award, TrendingUp, MessageSquare, RefreshCw,
    ClipboardList, Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────
interface SurveyAvg { layanan: number; informasi: number; petugas: number; waktu: number; fasilitas: number; }
interface Summary { avg: SurveyAvg; overallIKM: number; ikm100: number; mutu: string; kinerja: string; }
interface Distribution { rating: number; count: number; pct: number; }
interface RecentSaran { saran: string; timestamp: string; jenisLayanan: string; }
interface StatsData {
    total: number;
    summary: Summary | null;
    distribution: Distribution[];
    recentSaran: RecentSaran[];
}

// ─── Helpers ──────────────────────────────────────────────────
const ASPEK = [
    { key: "layanan",    label: "Kualitas Layanan",      desc: "Seberapa puas dengan kualitas pelayanan yang diterima?" },
    { key: "informasi",  label: "Kemudahan Informasi",   desc: "Seberapa mudah mendapatkan informasi yang dibutuhkan?" },
    { key: "petugas",    label: "Sikap Petugas",         desc: "Bagaimana sikap dan kesopanan petugas dalam melayani?" },
    { key: "waktu",      label: "Ketepatan Waktu",       desc: "Apakah pelayanan selesai tepat waktu sesuai yang dijanjikan?" },
    { key: "fasilitas",  label: "Fasilitas & Sarana",    desc: "Bagaimana kondisi fasilitas ruang tunggu dan sarana pendukung?" },
] as const;

const JENIS_LAYANAN = ["KTP/KK", "Surat Keterangan", "Akta Kelahiran/Kematian", "Permohonan Surat", "Layanan Administrasi", "Layanan Umum"];

const LABEL_MAP: Record<number, string> = { 1: "Sangat Tidak Puas", 2: "Tidak Puas", 3: "Cukup", 4: "Puas", 5: "Sangat Puas" };
const MUTU_COLOR: Record<string, string> = { A: "text-green-600 bg-green-50 dark:bg-green-950/30", B: "text-blue-600 bg-blue-50 dark:bg-blue-950/30", C: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30", D: "text-red-600 bg-red-50 dark:bg-red-950/30" };

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <button
                    key={i}
                    type="button"
                    onClick={() => onChange(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                >
                    <Star
                        className={cn(
                            "h-7 w-7 transition-colors",
                            (hover || value) >= i
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                        )}
                    />
                </button>
            ))}
            {value > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">{LABEL_MAP[value]}</span>
            )}
        </div>
    );
}

function AvgBar({ label, value }: { label: string; value: number }) {
    const pct = (value / 5) * 100;
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold">{value.toFixed(2)} <span className="text-muted-foreground font-normal">/ 5</span></span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────
function SKMContent() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<"form" | "hasil">(
        (searchParams.get("tab") as "form" | "hasil") === "hasil" ? "hasil" : "form"
    );

    // Form state
    const [ratings, setRatings] = useState<Record<string, number>>({ layanan: 0, informasi: 0, petugas: 0, waktu: 0, fasilitas: 0 });
    const [saran, setSaran] = useState("");
    const [jenisLayanan, setJenisLayanan] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const fetchStats = async () => {
        setLoadingStats(true);
        try {
            const res = await fetch("/api/skm-surveys");
            const json = await res.json();
            setStats(json);
        } catch { /* silent */ }
        finally { setLoadingStats(false); }
    };

    useEffect(() => { fetchStats(); }, []);

    const allRated = Object.values(ratings).every(v => v > 0);

    const handleSubmit = async () => {
        if (!allRated) return;
        setSubmitting(true);
        setSubmitError("");
        try {
            const res = await fetch("/api/skm-surveys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...ratings, saran, jenisLayanan: jenisLayanan || "Layanan Umum" }),
            });
            const json = await res.json();
            if (json.success) {
                setSubmitted(true);
                fetchStats(); // refresh stats
            } else {
                setSubmitError(json.error || "Gagal mengirim survei");
            }
        } catch {
            setSubmitError("Terjadi kesalahan jaringan");
        }
        setSubmitting(false);
    };

    const handleReset = () => {
        setRatings({ layanan: 0, informasi: 0, petugas: 0, waktu: 0, fasilitas: 0 });
        setSaran("");
        setJenisLayanan("");
        setSubmitted(false);
        setSubmitError("");
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Page Header */}
            <div className="bg-primary text-white py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                        <span>Informasi</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white font-medium">Survei Kepuasan Masyarakat</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Survei Kepuasan Masyarakat</h1>
                    <p className="text-white/80 max-w-xl">
                        Bantu kami meningkatkan kualitas pelayanan dengan mengisi survei kepuasan. Masukan Anda sangat berarti.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">

                {/* Summary Stats Row */}
                {!loadingStats && stats?.summary && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-card border-border col-span-2 md:col-span-1">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-3xl font-bold text-primary">{stats.total}</div>
                                <div className="text-sm text-muted-foreground mt-1">Total Responden</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card border-border">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-3xl font-bold text-primary">{stats.summary.ikm100}</div>
                                <div className="text-sm text-muted-foreground mt-1">Nilai IKM (100)</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card border-border">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                                    <Award className="h-5 w-5 text-primary" />
                                </div>
                                <div className={cn("text-3xl font-bold px-2 py-0.5 rounded inline-block", MUTU_COLOR[stats.summary.mutu])}>
                                    {stats.summary.mutu}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">Mutu Pelayanan</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card border-border">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-lg font-bold text-foreground leading-tight">{stats.summary.kinerja}</div>
                                <div className="text-sm text-muted-foreground mt-1">Kinerja Pelayanan</div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
                    {([
                        { key: "form", label: "Isi Survei", icon: ClipboardList },
                        { key: "hasil", label: "Hasil Survei", icon: BarChart3 },
                    ] as const).map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                                activeTab === tab.key
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Tab: Form Survei ── */}
                {activeTab === "form" && (
                    submitted ? (
                        <Card className="bg-card border-border max-w-xl mx-auto">
                            <CardContent className="p-10 text-center">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
                                <p className="text-muted-foreground mb-6">
                                    Survei Anda telah berhasil dikirim. Masukan Anda sangat membantu kami meningkatkan kualitas pelayanan.
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <Button onClick={handleReset} variant="outline">Isi Survei Lagi</Button>
                                    <Button onClick={() => setActiveTab("hasil")}>Lihat Hasil</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                {/* Jenis Layanan */}
                                <Card className="bg-card border-border">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
                                            <Info className="h-4 w-4" />
                                            Jenis Layanan yang Digunakan
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Select value={jenisLayanan} onValueChange={setJenisLayanan}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis layanan..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {JENIS_LAYANAN.map(j => (
                                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </CardContent>
                                </Card>

                                {/* Rating per Aspek */}
                                {ASPEK.map(aspek => (
                                    <Card key={aspek.key} className="bg-card border-border">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                                {aspek.label}
                                                {ratings[aspek.key] > 0 && (
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                )}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">{aspek.desc}</p>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <StarRating
                                                value={ratings[aspek.key]}
                                                onChange={v => setRatings(prev => ({ ...prev, [aspek.key]: v }))}
                                            />
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Saran */}
                                <Card className="bg-card border-border">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-primary" />
                                            Saran & Masukan (opsional)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Textarea
                                            placeholder="Tuliskan saran atau masukan Anda di sini..."
                                            value={saran}
                                            onChange={e => setSaran(e.target.value)}
                                            maxLength={500}
                                            rows={3}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1 text-right">{saran.length}/500</p>
                                    </CardContent>
                                </Card>

                                {submitError && (
                                    <p className="text-sm text-red-600 text-center">{submitError}</p>
                                )}

                                <Button
                                    onClick={handleSubmit}
                                    disabled={!allRated || submitting}
                                    className="w-full gap-2"
                                    size="lg"
                                >
                                    {submitting ? (
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    {submitting ? "Mengirim..." : "Kirim Survei"}
                                </Button>

                                {!allRated && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        * Harap isi semua penilaian bintang sebelum mengirim
                                    </p>
                                )}
                            </div>

                            {/* Sidebar info */}
                            <div className="space-y-4">
                                <Card className="bg-card border-border">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base text-primary">Panduan Penilaian</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 space-y-2">
                                        {Object.entries(LABEL_MAP).map(([k, v]) => (
                                            <div key={k} className="flex items-center gap-2">
                                                <div className="flex">
                                                    {Array.from({ length: parseInt(k) }).map((_, i) => (
                                                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground">{v}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                                <Card className="bg-card border-border">
                                    <CardContent className="p-4">
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Survei ini bersifat anonim. Data yang Anda berikan hanya digunakan untuk evaluasi dan peningkatan kualitas pelayanan Kalurahan Trimulyo.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )
                )}

                {/* ── Tab: Hasil Survei ── */}
                {activeTab === "hasil" && (
                    loadingStats ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2].map(i => <Skeleton key={i} className="h-64 rounded-xl" />)}
                        </div>
                    ) : !stats || stats.total === 0 ? (
                        <Card className="bg-card border-border p-16 text-center">
                            <BarChart3 className="h-14 w-14 mx-auto text-muted-foreground opacity-20 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Data Survei Belum Tersedia</h3>
                            <p className="text-muted-foreground">Belum ada responden yang mengisi survei.</p>
                            <Button className="mt-4" onClick={() => setActiveTab("form")}>Isi Survei Pertama</Button>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Rata-rata per Aspek */}
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Rata-rata per Aspek
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {ASPEK.map(a => (
                                        <AvgBar
                                            key={a.key}
                                            label={a.label}
                                            value={stats.summary!.avg[a.key as keyof SurveyAvg]}
                                        />
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Distribusi Penilaian */}
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        Distribusi Penilaian
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[5, 4, 3, 2, 1].map(r => {
                                        const d = stats.distribution.find(d => d.rating === r);
                                        return (
                                            <div key={r} className="flex items-center gap-3">
                                                <div className="flex items-center gap-0.5 w-24 flex-shrink-0">
                                                    {Array.from({ length: r }).map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                                <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary/70 rounded-full transition-all duration-700"
                                                        style={{ width: `${d?.pct ?? 0}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-muted-foreground w-10 text-right">
                                                    {d?.count ?? 0}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>

                            {/* Saran Terbaru */}
                            {stats.recentSaran.length > 0 && (
                                <Card className="bg-card border-border md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-primary flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5" />
                                            Saran & Masukan Terbaru
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {stats.recentSaran.map((s, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                                                        <MessageSquare className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm">{s.saran}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="secondary" className="text-xs">{s.jenisLayanan}</Badge>
                                                            <span className="text-xs text-muted-foreground">
                                                                {new Date(s.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )
                )}
            </div>
        </main>
    );
}

export default function SKMPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-muted-foreground">Memuat...</div>
            </div>
        }>
            <SKMContent />
        </Suspense>
    );
}
