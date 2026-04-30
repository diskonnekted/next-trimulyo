"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FileText,
    Download,
    Heart,
    Timer,
    MapPin,
    Calendar,
    DollarSign,
    Phone,
    ChevronRight,
    Bell,
    Building,
    GraduationCap,
    ChartNoAxesColumnDecreasing,
    Vote,
    Clock,
    Newspaper,
    Eye,
    NotebookPen,
    BriefcaseBusiness,
    Lightbulb,
    Map,
    Users,
} from "lucide-react";

import ImageFallback from "@/components/ui/custom/ImageFallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CustomButton } from "@/components/ui/custom/CustomButton";
import { SDGsDashboard } from "@/components/ui/custom/SDGsDashboard";
import { StatisticsDisplay } from "@/components/ui/custom/StatisticsDisplay";
import { WeatherCard } from "@/components/ui/custom/WeatherCard";
import { IDMDisplay } from "@/components/ui/custom/IDMDisplay";
import { KeuanganSummary } from "@/components/ui/custom/KeuanganSummary";
import { YearSelector } from "@/components/ui/custom/YearSelector";
import { DecorativeSeparator } from "@/components/ui/custom/DecorativeSeparator";
import { useExternalNews } from "@/hooks/useExternalNews";
import { useHolidays } from "@/hooks/useHolidays";
import { useTranslation } from "@/lib/useTranslation";
import { useWeatherAnimation } from "@/hooks/useWeatherAnimation";
import { WeatherAnimation } from "@/components/ui/custom/WeatherAnimation";
import { EventDate } from "@/components/EventDate";
import { HolidayCards } from "@/components/ui/custom/HolidayCards";
import { HeroStats } from "@/components/ui/custom/HeroStats";

interface ServerData {
    heroSlides: Array<{
        id: string;
        title: string;
        description: string;
        image: string;
        ctaText: string;
        ctaLink: string;
    }>;
    quickLinks: Array<{
        icon: string;
        label: string;
        description: string;
        href: string;
        color: string;
    }>;
    pengumuman: Array<{
        id: number;
        judul: string;
        prioritas: string;
        konten: string;
    }>;
    events: Array<{
        id: number;
        nama: string;
        tanggal: string;
        waktu: string;
        lokasi: string;
        kategori: string;
    }>;
}

// Icon mapping untuk quickLinks
const iconMap: { [key: string]: React.ComponentType<{ className?: string; size?: number | string }> } = {
    FileText,
    DollarSign,
    Heart,
    GraduationCap,
    Building,
    ChartNoAxesColumnDecreasing,
    Vote,
    Phone,
    Download,
};

export function HomePageClient({ serverData }: { serverData: ServerData }) {
    const { t } = useTranslation();
    const { news: externalNews, error: newsError } = useExternalNews(20);
    const { weatherData } = useWeatherAnimation();
    const { holidays, loading: holidaysLoading, error: holidaysError } = useHolidays(10);
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

    // Transform quickLinks dengan proper icons
    const quickLinks = serverData.quickLinks.map((link) => ({
        ...link,
        icon: iconMap[link.icon] || FileText,
        svg: getSvgPath(link.icon, link.label),
    }));

    // Get SVG path based on icon or label
    function getSvgPath(icon: string, label: string): string {
        const iconToSvg: { [key: string]: string } = {
            FileText: label.toLowerCase().includes("surat") ? "surat.svg" : "dokumen.svg",
            FileChartPie: "laporan.svg",
            DollarSign: "keuangan.svg",
            Heart: "kesehatan.svg",
            GraduationCap: "pendidikan.svg",
            Building: "pembangunan.svg",
            Vote: "sdgs.svg",
            Phone: "kontak.svg",
            ChartNoAxesColumnDecreasing: "idm.svg",
        };
        return `/images/layanan-cepat/${iconToSvg[icon] || "dokumen.svg"}`;
    }

    // Emergency Fallback Data (Instant for presentation)
    const emergencyNews = [
        {
            id: "fallback-1",
            slug: "tp-pkk-trimulyo-gelar-sekolah-jumat",
            title: "TP PKK Trimulyo Gelar Sekolah Jumat: Pelatihan Olahan Berbahan Tepung Talas",
            excerpt: "Tim Penggerak PKK Kalurahan Trimulyo menggelar kegiatan Sekolah Jumat dengan fokus pelatihan pembuatan olahan berbahan tepung talas pada Jumat (24/4/2026).",
            featuredImage: "https://trimulyosid.slemankab.go.id/wp-content/uploads/sites/71/2026/04/PKK-Pelatihan.jpeg",
            category: "Berita",
            author: { name: "Admin Kalurahan" },
            viewCount: 245,
            publishedAt: "2026-04-24T13:00:00Z",
            readTime: 3
        },
        {
            id: "fallback-2",
            slug: "pembangunan-jalan-lingkungan",
            title: "Peningkatan Kualitas Jalan Lingkungan di Wilayah Kalurahan Trimulyo",
            excerpt: "Pemerintah Kalurahan Trimulyo terus berkomitmen meningkatkan infrastruktur dasar demi kenyamanan warga.",
            featuredImage: "/images/berita/infrastruktur.jpg",
            category: "Pembangunan",
            publishedAt: "2026-04-20T09:00:00Z"
        }
    ];

    // Transform data berita with guaranteed fallback
    const newsData = React.useMemo(() => {
        const sourceData = (externalNews && externalNews.length > 0) ? externalNews : emergencyNews;
        
        const firstNews = sourceData[0];
        const otherNews = sourceData.slice(1, 8);

        return {
            beritaUtama: {
                id: firstNews.id,
                slug: firstNews.slug,
                judul: "title" in firstNews ? (firstNews as any).title : (firstNews as any).judul,
                ringkasan: "excerpt" in firstNews ? (firstNews as any).excerpt : (firstNews as any).ringkasan,
                gambar: (firstNews as any).featuredImage || (firstNews as any).gambar || "/images/placeholder-news.jpg",
                kategori: (firstNews as any).category || (firstNews as any).kategori || "Berita",
                author: (firstNews as any).author?.name || "Admin",
                views: (firstNews as any).viewCount || (firstNews as any).views || 0,
                publishedAt: (firstNews as any).publishedAt,
                readingTime: (firstNews as any).readTime || 2,
            },
            beritaLainnya: otherNews.map((news) => ({
                id: news.id,
                slug: news.slug,
                judul: (news as any).title || (news as any).judul,
                publishedAt: (news as any).publishedAt,
                kategori: (news as any).category || (news as any).kategori || "Berita",
                ringkasan: (news as any).excerpt || (news as any).ringkasan,
                gambar: (news as any).featuredImage || (news as any).gambar || "/images/placeholder-news.jpg",
            })),
        };
    }, [externalNews]);

    return (
        <div className="beranda-container bg-background">
            {/* Hero Section with Layanan Cepat */}
            <section className="hero-area bg-[#3eafdf] py-16 relative">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero.webp"
                        alt="Kalurahan Trimulyo"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" /> {/* Hero overlay using secondary color #f26a8d */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <WeatherAnimation weatherData={weatherData} className="z-10" />
                <div className="container mx-auto px-4 relative z-20">
                    {/* Hero Text */}
                    <div className="text-center text-white mb-16">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                            Selamat Datang di <br />
                            <span className="text-secondary bg-white/90 px-4 rounded-lg inline-block mt-2">
                                Kalurahan Trimulyo
                            </span>
                        </h1>
                        <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-white/10">
                            Mewujudkan Trimulyo sebagai Kalurahan Cerdas, Mandiri, dan Sejahtera melalui inovasi
                            teknologi dan pemberdayaan masyarakat.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Badge
                                variant="default"
                                className="bg-white/20 text-white border-white/30 shadow-md hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                            >
                                <Eye /> Transparan
                            </Badge>
                            <Badge
                                variant="default"
                                className="bg-white/20 text-white border-white/30 shadow-md hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                            >
                                <NotebookPen /> Akuntabel
                            </Badge>
                            <Badge
                                variant="default"
                                className="bg-white/20 text-white border-white/30 shadow-md hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                            >
                                <BriefcaseBusiness /> Profesional
                            </Badge>
                            <Badge
                                variant="default"
                                className="bg-white/20 text-white border-white/30 shadow-md hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                            >
                                <Lightbulb /> Inovatif
                            </Badge>
                        </div>

                        {/* Quick Info Cards */}
                        <HeroStats />
                    </div>

                    {/* Layanan Cepat in Hero */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {quickLinks.map((link) => (
                            <div
                                key={link.label}
                                className="group rounded-sm border hover:shadow-md transition-all cursor-pointer overflow-hidden hover:scale-102"
                            >
                                <Link
                                    href={link.href ?? "#"}
                                    className="block bg-purple-900/40 text-white hover:bg-white hover:text-primary"
                                >
                                    {/* Image section - full height minus text section */}
                                    <div
                                        className="relative h-40 bg-gray-100"
                                        style={{
                                            backgroundImage: `url(${link.svg})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                        }}
                                    ></div>
                                    {/* Text section - at the bottom */}
                                    <div className="p-1 hover:bg-white hover:text-primary">
                                        <span className="text-sm font-medium text-center group-hover:text-primary transition-colors block">
                                            {link.label}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Layanan Mandiri CTA Button */}
                    <div className="mt-16 flex justify-center">
                        <a
                            href="https://trimulyo.sleman-desa.id/layanan-mandiri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#dd2d4a] rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-105 overflow-hidden border border-white/20"
                        >
                            {/* Animated background shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            {/* Custom SVG Icon */}
                            <div className="relative z-10 flex-shrink-0">
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="drop-shadow-lg group-hover:rotate-12 transition-transform duration-500"
                                >
                                    {/* Document base */}
                                    <rect x="10" y="6" width="28" height="36" rx="3" fill="white" fillOpacity="0.95" />
                                    <rect x="10" y="6" width="28" height="36" rx="3" stroke="white" strokeWidth="2" />

                                    {/* Folded corner */}
                                    <path d="M30 6 L38 14 L30 14 Z" fill="rgba(255,255,255,0.7)" />
                                    <path
                                        d="M30 6 L38 14 L30 14 Z"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />

                                    {/* Document lines */}
                                    <line
                                        x1="15"
                                        y1="20"
                                        x2="28"
                                        y2="20"
                                        stroke="#10b981"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <line
                                        x1="15"
                                        y1="25"
                                        x2="33"
                                        y2="25"
                                        stroke="#14b8a6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <line
                                        x1="15"
                                        y1="30"
                                        x2="30"
                                        y2="30"
                                        stroke="#06b6d4"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />

                                    {/* Checkmark circle */}
                                    <circle
                                        cx="25"
                                        cy="35"
                                        r="7"
                                        fill="#10b981"
                                        className="group-hover:scale-110 transition-transform origin-center"
                                    />
                                    <path
                                        d="M22 35 L24 37 L28 33"
                                        stroke="white"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Sparkles */}
                                    <circle cx="12" cy="10" r="1.5" fill="white" className="animate-pulse" />
                                    <circle
                                        cx="36"
                                        cy="8"
                                        r="1"
                                        fill="white"
                                        className="animate-pulse"
                                        style={{ animationDelay: "0.3s" }}
                                    />
                                    <circle
                                        cx="34"
                                        cy="38"
                                        r="1.5"
                                        fill="white"
                                        className="animate-pulse"
                                        style={{ animationDelay: "0.6s" }}
                                    />
                                </svg>
                            </div>

                            {/* Text Content */}
                            <div className="relative z-10 text-left">
                                <div className="text-2xl font-bold text-white drop-shadow-md">Layanan Mandiri</div>
                                <div className="text-white/80 text-sm mt-1">Ajukan permohonan secara online →</div>
                            </div>

                            {/* Pulse effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content - 3 Columns with Berita bigger */}
            <section className="content-area container mx-auto px-4 py-8 space-y-4">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">Berita & Informasi Terbaru</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Ada kegiatan apa saja di Kalurahan Trimulyo hari ini?
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Kolom 1 - Pengumuman */}
                    <div className="content-left space-y-4 lg:col-span-1 flex flex-col">
                        {/* Pengumuman */}
                        <Card className="bg-card border-border">
                            <CardHeader className="gap-0">
                                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                                    <Bell className="h-5 w-5 text-primary" />
                                    {t("pengumuman.pengumuman")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {serverData.pengumuman.slice(0, 5).map((item) => (
                                    <Link href="#" key={item.id} className="flex items-start pb-0 last:pb-4">
                                        <div className="border-l-4 border-primary pl-3 bg-white p-2 hover:scale-102 shadow-sm hover:shadow-md rounded-md">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant={
                                                        item.prioritas === "tinggi"
                                                            ? "destructive"
                                                            : item.prioritas === "penting"
                                                              ? "secondary"
                                                              : "outline"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {t(`pengumuman.prioritas.${item.prioritas}`)}
                                                </Badge>
                                            </div>
                                            <h4 className="font-medium text-sm leading-tight">{item.judul}</h4>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                {item.konten}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                <CustomButton variant="default" size="sm" className="w-full mt-3" asChild>
                                    <Link
                                        href="/pengumuman"
                                        className="flex items-center justify-center gap-2 text-white"
                                    >
                                        {t("pengumuman.lihatSemuaPengumuman")}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </CustomButton>
                            </CardContent>
                        </Card>

                        {/* Laporan Keuangan - Current Year Only */}
                        <Card className="bg-card border-border">
                            <CardHeader className="gap-0">
                                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    Laporan Keuangan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <KeuanganSummary />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Kolom 2 - Berita */}
                    <div className="content-center space-y-4 lg:col-span-2 flex flex-col">
                        {/* Berita Utama */}
                        {newsData && newsData.beritaUtama && (
                            <Card className="overflow-hidden py-0 gap-0 pt-0">
                                <div className="aspect-video relative bg-muted">
                                    <ImageFallback
                                        src={newsData.beritaUtama.gambar}
                                        alt={newsData.beritaUtama.judul}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                        className="object-cover w-full h-full"
                                        priority
                                    />
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge variant="secondary" className="bg-primary/90 backdrop-blur-sm text-xs">
                                            {newsData.beritaUtama.kategori}
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h2 className="text-1xl md:text-2xl font-bold mb-3 line-clamp-2 text-primary">
                                        {newsData.beritaUtama.judul}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 line-clamp-3 text-justify">
                                        {newsData.beritaUtama.ringkasan}
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(newsData.beritaUtama.publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Timer className="h-4 w-4" />
                                                <span>
                                                    {newsData.beritaUtama.readingTime} {t("berita.waktuBaca")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                <span>{newsData.beritaUtama.views}</span>
                                            </div>
                                        </div>
                                        {/* Desktop */}
                                        <Link
                                            href={`/berita/${newsData.beritaUtama.slug}`}
                                            className="hidden md:inline-flex w-full sm:w-auto items-center justify-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            {t("berita.bacaSelengkapnya")}
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        {/* Mobile */}
                                        <CustomButton
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-3 hover:text-foreground block md:hidden"
                                            asChild
                                        >
                                            <Link
                                                href={`/berita/${newsData.beritaUtama.slug}`}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                {t("berita.bacaSelengkapnya")}
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </CustomButton>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Berita Lainnya - Only show if we have other news */}
                        {newsData && newsData.beritaLainnya && newsData.beritaLainnya.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg text-primary">
                                        <Newspaper className="h-5 w-5 text-primary" />
                                        {t("berita.beritaLainnya")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {newsData.beritaLainnya.map((berita) => (
                                            <div
                                                key={berita.id}
                                                className="flex items-start space-x-3 pb-4 border-b last:border-0 last:pb-0"
                                            >
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm leading-tight mb-1">
                                                        <Link
                                                            href={`/berita/${"slug" in berita ? berita.slug : ""}`}
                                                            className="hover:text-primary transition-colors"
                                                        >
                                                            {berita.judul}
                                                        </Link>
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatTimeAgo(berita.publishedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <CustomButton variant="default" size="sm" className="w-full mt-3" asChild>
                                        <Link
                                            href="/berita"
                                            className="flex items-center justify-center gap-2 text-white"
                                        >
                                            {t("berita.lihatSemuaBerita")}
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </CustomButton>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Kolom 3 - Kegiatan, Cuaca, Aplikasi */}
                    <div className="content-right space-y-4 lg:col-span-1 flex flex-col">
                        {/* Kegiatan Hari Ini */}
                        <Card>
                            <CardHeader className="gap-0">
                                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    {t("kegiatan.judul")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {serverData.events.map((event) => (
                                        <Link key={event.id} href="#">
                                            <div className="flex items-start space-x-3 pb-4 border-b last:border-0">
                                                <EventDate event={event} />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm leading-tight mb-1 hover:text-primary">
                                                        {event.nama}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{event.waktu}</span>
                                                        <MapPin className="h-3 w-3 ml-1" />
                                                        <span>{event.lokasi}</span>
                                                    </div>
                                                    <Badge variant="outline" className="mt-1 text-xs">
                                                        {event.kategori}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <CustomButton variant="default" size="sm" className="w-full mt-3" asChild>
                                    <Link
                                        href="/kegiatan"
                                        className="flex items-center justify-center gap-2 text-white"
                                    >
                                        {t("kegiatan.jadwalLengkap")}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </CustomButton>
                            </CardContent>
                        </Card>

                        {/* Cuaca */}
                        <Card className="py-0">
                            <WeatherCard />
                        </Card>
                    </div>
                </div>
            </section>

            <DecorativeSeparator />

            {/* Hari Libur Cards Section */}
            <section className="holidays-area container mx-auto px-4 py-8">
                <HolidayCards holidays={holidays} loading={holidaysLoading} error={holidaysError} />
            </section>

            <DecorativeSeparator />

            {/* IDM - Indeks Kalurahan Mandiri */}
            <section className="idm-area container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">Indeks Kalurahan Mandiri (IDM)</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Evaluasi capaian Indeks Kalurahan Mandiri</p>
                    <div className="mt-4">
                        <YearSelector
                            years={availableYears}
                            selectedYear={selectedYear}
                            onYearChange={setSelectedYear}
                            className="max-w-4xl mx-auto mb-4"
                        />
                    </div>
                </div>
                <IDMDisplay year={selectedYear.toString()} />
            </section>

            <DecorativeSeparator />

            {/* Statistik Kalurahan */}
            <section className="statistics-area container mx-auto px-4 py-8">
                <StatisticsDisplay />
            </section>

            <DecorativeSeparator />

            {/* Dasbor SDGs */}
            <section className="sdgs-area container mx-auto px-4 py-8 pb-20">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">Tujuan Pembangunan Berkelanjutan (SDGs)</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pantau kemajuan implementasi 18 Tujuan Pembangunan Berkelanjutan di Kalurahan Trimulyo
                    </p>
                </div>
                <SDGsDashboard />
            </section>
        </div>
    );
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
        return "Baru saja";
    } else if (diffInHours < 24) {
        return `${diffInHours} jam lalu`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} hari lalu`;
    }
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
    };
    return date.toLocaleDateString("id-ID", options);
}
