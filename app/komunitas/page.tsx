"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Users,
    Heart,
    Shield,
    MapPin,
    Phone,
    Calendar,
    ArrowRight,
    Building2,
    Sprout,
    Baby,
    Store,
    Wifi,
    Activity,
    Loader2,
    ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCommunities } from "@/lib/api-komunitas";
import type { Community } from "@/lib/api-komunitas";

export default function KomunitasPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCommunities();
                setCommunities(data);
            } catch (error) {
                console.error("Failed to fetch communities:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const padukuhanList = [
        "Kadisobo I", "Kadisobo II", "Ngemplak Kalangan", "Klegen",
        "Pendeman", "Balong", "Jogokerten", "Blunyah",
        "Kepitu", "Karang Kepanjen", "Pambregan", "Klelen",
        "Sidomulyo", "Kalirase"
    ];

    const recentActivities = [
        {
            title: "Jalan Sehat \"Kalurahan Terdepan Untuk Indonesia\"",
            date: "15 Januari 2026",
            category: "Olahraga",
            description: "Kegiatan jalan sehat yang diikuti oleh ribuan warga Trimulyo untuk mempererat silaturahmi dan menjaga kebugaran.",
        },
        {
            title: "Kelas Parenting",
            date: "9 Februari 2026",
            category: "Edukasi",
            description: "Upaya meningkatkan kualitas pengasuhan anak di lingkungan keluarga melalui seminar interaktif.",
        },
        {
            title: "Sosialisasi Kawasan Tanpa Asap Rokok",
            date: "Februari 2026",
            category: "Kesehatan",
            description: "Mendorong lingkungan sehat dan udara bersih bagi warga Trimulyo.",
        },
        {
            title: "Vaksinasi PMK Ternak",
            date: "Januari 2026",
            category: "Pertanian",
            description: "Kunjungan Dirjen Peternakan dan Kesehatan Hewan Kementan RI meninjau vaksinasi di kandang Kelompok Lestari Mulyo.",
        },
    ];

    const getIconForCommunity = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes("tani") || n.includes("agrotech")) return Sprout;
        if (n.includes("internet") || n.includes("wifi")) return Wifi;
        if (n.includes("sport") || n.includes("olahraga")) return Activity;
        if (n.includes("kesehatan") || n.includes("posyandu")) return Baby;
        if (n.includes("pkk")) return Heart;
        if (n.includes("lpmk")) return Building2;
        if (n.includes("koperasi") || n.includes("marketing")) return Store;
        if (n.includes("linmas") || n.includes("garda") || n.includes("ews")) return Shield;
        return Users;
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Page Header — bg-primary konsisten */}
            <div className="bg-primary text-white py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                        <span>Beranda</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white font-medium">Komunitas</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Komunitas Kalurahan Trimulyo</h1>
                    <p className="text-white/80 max-w-2xl">
                        Membangun sinergi, mempererat persaudaraan, dan mewujudkan kemandirian masyarakat
                        melalui lembaga kemasyarakatan yang aktif dan berdaya.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 space-y-12">

                {/* Intro + Lokasi */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold text-primary mb-4">Pusat Kegiatan Masyarakat</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Kalurahan Trimulyo tidak hanya menjadi pusat pemerintahan, tetapi juga pusat kegiatan
                            sosial kemasyarakatan. Dengan dukungan berbagai Lembaga Kemasyarakatan Kalurahan (LKK),
                            kami berupaya menciptakan lingkungan yang kondusif bagi tumbuh kembangnya kreativitas,
                            ekonomi, dan kesejahteraan warga.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Sinergi antara Pemerintah Kalurahan dengan lembaga-lembaga seperti Karang Taruna, LPMK,
                            dan PKK menjadi kunci keberhasilan pembangunan kalurahan yang partisipatif dan inklusif.
                        </p>
                    </div>

                    {/* Lokasi Card — konsisten */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary text-lg">
                                <MapPin className="h-5 w-5" />
                                Lokasi Sekretariat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm text-muted-foreground space-y-0.5">
                                <p className="font-medium text-foreground">Kantor Kalurahan Trimulyo</p>
                                <p>Jl. Salak Km. 3, Trimulyo</p>
                                <p>Kec. Sleman, Kabupaten Sleman</p>
                                <p>Daerah Istimewa Yogyakarta 55513</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>(0274) 869248</span>
                            </div>
                            <Button className="w-full" asChild>
                                <a href="https://maps.google.com/?q=Kantor+Kalurahan+Trimulyo+Sleman" target="_blank" rel="noreferrer">
                                    Lihat di Peta
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Komunitas & Lembaga */}
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-2">Komunitas &amp; Lembaga</h2>
                        <p className="text-muted-foreground">Wadah aktivitas dan kreativitas warga Trimulyo</p>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Card key={i} className="bg-card border-border">
                                    <Skeleton className="h-48 w-full rounded-t-xl" />
                                    <CardContent className="p-5 space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : communities.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {communities.map((community) => {
                                const Icon = getIconForCommunity(community.name);
                                const description = community.description.replace(/<[^>]*>?/gm, "");
                                const hasImage = community.image &&
                                    (community.image.startsWith("http") || community.image.startsWith("/"));

                                return (
                                    <Link href={`/komunitas/${community.id}`} key={community.id} className="block h-full">
                                        <Card className="bg-card border-border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col group overflow-hidden">
                                            {hasImage ? (
                                                <div className="relative w-full h-48 bg-muted overflow-hidden">
                                                    <Image
                                                        src={community.image}
                                                        alt={community.name}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                                        <span className="text-white font-medium flex items-center gap-1.5 text-sm">
                                                            Lihat Detail <ArrowRight className="h-4 w-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 bg-primary/5 flex items-center justify-center">
                                                    <Icon className="h-16 w-16 text-primary opacity-30" />
                                                </div>
                                            )}

                                            <CardContent className="p-5 flex-1 flex flex-col">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 flex-shrink-0">
                                                        <Icon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                        {community.name}
                                                    </h3>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3 mb-3">
                                                    {description}
                                                </p>
                                                <div className="flex items-center gap-2 mt-auto">
                                                    {community.news_count > 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            {community.news_count} Berita
                                                        </Badge>
                                                    )}
                                                    {community.activities_count > 0 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {community.activities_count} Kegiatan
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <Card className="bg-card border-border p-16 text-center">
                            <Users className="h-14 w-14 mx-auto text-muted-foreground opacity-20 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Belum Ada Data Komunitas</h3>
                            <p className="text-muted-foreground">Data komunitas belum tersedia saat ini.</p>
                        </Card>
                    )}
                </div>

                {/* Wilayah Administratif */}
                <Card className="bg-card border-border">
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-primary mb-2">Wilayah Administratif</h2>
                            <p className="text-muted-foreground">Terdiri dari 14 Padukuhan, 30 RW, dan 68 RT</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            {padukuhanList.map((padukuhan, index) => (
                                <div
                                    key={index}
                                    className="bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary p-3 rounded-lg text-center text-sm font-medium transition-colors border border-border hover:border-primary/30 cursor-default"
                                >
                                    {padukuhan}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Kegiatan Terkini */}
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-2">Kegiatan Komunitas Terkini</h2>
                        <p className="text-muted-foreground">Aktivitas dan program terbaru dari komunitas Trimulyo</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {recentActivities.map((activity, index) => (
                            <Card key={index} className="bg-card border-border hover:shadow-md transition-all duration-200 overflow-hidden">
                                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                                    <div className="bg-muted/50 p-6 md:w-44 flex flex-col items-center justify-center text-center shrink-0 border-b md:border-b-0 md:border-r border-border">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{activity.date}</span>
                                        <Badge variant="secondary" className="mt-2 text-xs">{activity.category}</Badge>
                                    </div>
                                    <div className="p-6 flex-1">
                                        <h3 className="font-semibold text-base text-foreground mb-2">{activity.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center text-primary text-sm font-medium hover:underline cursor-pointer">
                                            Lihat Dokumentasi <ArrowRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
