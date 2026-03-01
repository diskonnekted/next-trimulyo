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
    UserCheck,
    Store,
    Wifi,
    Activity,
    Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

    // Static data for fallback and structure
    const padukuhanList = [
        "Kadisobo I", "Kadisobo II", "Ngemplak Kalangan", "Klegen", 
        "Pendeman", "Balong", "Jogokerten", "Blunyah", 
        "Kepitu", "Karang Kepanjen", "Pambregan", "Klelen", 
        "Sidomulyo", "Kalirase"
    ];

    const recentActivities = [
        {
            title: "Jalan Sehat \"Desa Terdepan Untuk Indonesia\"",
            date: "15 Januari 2026",
            category: "Olahraga",
            description: "Kegiatan jalan sehat yang diikuti oleh ribuan warga Trimulyo untuk mempererat silaturahmi dan menjaga kebugaran."
        },
        {
            title: "Kelas Parenting",
            date: "9 Februari 2026",
            category: "Edukasi",
            description: "Upaya meningkatkan kualitas pengasuhan anak di lingkungan keluarga melalui seminar interaktif."
        },
        {
            title: "Sosialisasi Kawasan Tanpa Asap Rokok",
            date: "Februari 2026",
            category: "Kesehatan",
            description: "Mendorong lingkungan sehat dan udara bersih bagi warga Trimulyo."
        },
        {
            title: "Vaksinasi PMK Ternak",
            date: "Januari 2026",
            category: "Pertanian",
            description: "Kunjungan Dirjen Peternakan dan Kesehatan Hewan Kementan RI meninjau vaksinasi di kandang Kelompok Lestari Mulyo."
        }
    ];

    // Map API data to UI format or use fallback
    const getIconForCommunity = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("tani") || lowerName.includes("agrotech")) return Sprout;
        if (lowerName.includes("internet") || lowerName.includes("wifi")) return Wifi;
        if (lowerName.includes("sport") || lowerName.includes("olahraga")) return Activity;
        if (lowerName.includes("kesehatan") || lowerName.includes("posyandu")) return Baby;
        if (lowerName.includes("pkk")) return Heart;
        if (lowerName.includes("lpmk")) return Building2;
        if (lowerName.includes("koperasi") || lowerName.includes("marketing")) return Store;
        if (lowerName.includes("linmas") || lowerName.includes("garda") || lowerName.includes("ews")) return Shield;
        return Users;
    };

    const getColorForCommunity = (index: number) => {
        const colors = [
            { text: "text-blue-600", bg: "bg-blue-100" },
            { text: "text-green-600", bg: "bg-green-100" },
            { text: "text-orange-600", bg: "bg-orange-100" },
            { text: "text-purple-600", bg: "bg-purple-100" },
            { text: "text-red-600", bg: "bg-red-100" },
            { text: "text-teal-600", bg: "bg-teal-100" },
            { text: "text-pink-600", bg: "bg-pink-100" },
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-[#10244f] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39a2cf] opacity-20 blur-3xl"></div>
                    <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-[#39a2cf] opacity-20 blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Komunitas Kalurahan Trimulyo</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Membangun sinergi, mempererat persaudaraan, dan mewujudkan kemandirian masyarakat melalui lembaga kemasyarakatan yang aktif dan berdaya.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Intro Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold text-[#10244f] mb-4">Pusat Kegiatan Masyarakat</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Kalurahan Trimulyo tidak hanya menjadi pusat pemerintahan, tetapi juga pusat kegiatan sosial kemasyarakatan. 
                            Dengan dukungan berbagai Lembaga Kemasyarakatan Kalurahan (LKK), kami berupaya menciptakan lingkungan yang 
                            kondusif bagi tumbuh kembangnya kreativitas, ekonomi, dan kesejahteraan warga.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Sinergi antara Pemerintah Kalurahan dengan lembaga-lembaga seperti Karang Taruna, LPMK, dan PKK menjadi 
                            kunci keberhasilan pembangunan desa yang partisipatif dan inklusif.
                        </p>
                    </div>
                    <Card className="bg-white border-blue-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#10244f]">
                                <MapPin className="h-5 w-5 text-[#39a2cf]" />
                                Lokasi Sekretariat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm text-slate-600">
                                <p className="font-medium text-slate-900">Kantor Kalurahan Trimulyo</p>
                                <p>Jl. Salak Km. 3, Trimulyo</p>
                                <p>Kec. Sleman, Kabupaten Sleman</p>
                                <p>Daerah Istimewa Yogyakarta 55513</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone className="h-4 w-4 text-[#39a2cf]" />
                                <span>(0274) 869248</span>
                            </div>
                            <Button className="w-full bg-[#39a2cf] hover:bg-[#2a77a7]" asChild>
                                <a href="https://maps.google.com/?q=Kantor+Desa+Trimulyo+Sleman" target="_blank" rel="noreferrer">
                                    Lihat di Peta
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Lembaga Kemasyarakatan Grid */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#10244f]">Komunitas & Lembaga</h2>
                            <p className="text-slate-500">Wadah aktivitas dan kreativitas warga Trimulyo</p>
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-[#39a2cf]" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {communities.length > 0 ? (
                                communities.map((community, index) => {
                                    const Icon = getIconForCommunity(community.name);
                                    const colorStyle = getColorForCommunity(index);
                                    
                                    // Strip HTML tags from description
                                    const stripHtml = (html: string) => {
                                        const tmp = document.createElement("DIV");
                                        tmp.innerHTML = html;
                                        return tmp.textContent || tmp.innerText || "";
                                    };

                                    const description = typeof window !== 'undefined' ? stripHtml(community.description) : community.description.replace(/<[^>]*>?/gm, '');

                                    // Validate image URL
                                    let isValidImage = false;
                                    try {
                                        if (community.image && (community.image.startsWith('http') || community.image.startsWith('/'))) {
                                            // Basic validation
                                            isValidImage = true;
                                        }
                                    } catch (e) {
                                        isValidImage = false;
                                    }

                                    return (
                                        <Link href={`/komunitas/${community.id}`} key={community.id} className="block h-full">
                                            <Card className="hover:shadow-lg transition-all border-slate-200 h-full flex flex-col group overflow-hidden">
                                                {isValidImage ? (
                                                    <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                                                        <Image 
                                                            src={community.image} 
                                                            alt={community.name}
                                                            fill
                                                            className="object-cover transition-transform group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            onError={(e) => {
                                                                // Fallback if image fails to load
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                                target.parentElement!.classList.add('hidden');
                                                                // You might want to show the fallback icon div here, but for now we just hide the broken image
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                                            <span className="text-white font-medium flex items-center gap-2">
                                                                Lihat Detail <ArrowRight className="h-4 w-4" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`w-full h-48 ${colorStyle.bg} flex items-center justify-center`}>
                                                        <Icon className={`h-16 w-16 ${colorStyle.text} opacity-50`} />
                                                    </div>
                                                )}
                                                <CardContent className="p-6 flex-1 flex flex-col">
                                                    {!isValidImage && (
                                                        <div className={`w-12 h-12 rounded-lg ${colorStyle.bg} flex items-center justify-center mb-4`}>
                                                            <Icon className={`h-6 w-6 ${colorStyle.text}`} />
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-semibold text-lg text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors" title={community.name}>
                                                            {community.name}
                                                        </h3>
                                                    </div>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
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
                                })
                            ) : (
                                <div className="col-span-full text-center py-8 text-slate-500">
                                    Belum ada data komunitas yang tersedia.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Padukuhan Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-[#10244f]">Wilayah Administratif</h2>
                        <p className="text-slate-500">Terdiri dari 14 Padukuhan, 30 RW, dan 68 RT</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {padukuhanList.map((padukuhan, index) => (
                            <div 
                                key={index} 
                                className="bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 p-3 rounded-lg text-center text-sm font-medium transition-colors border border-slate-200 hover:border-blue-200 cursor-default"
                            >
                                {padukuhan}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div>
                    <h2 className="text-2xl font-bold text-[#10244f] mb-8">Kegiatan Komunitas Terkini</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {recentActivities.map((activity, index) => (
                            <Card key={index} className="overflow-hidden border-slate-200 hover:border-blue-200 transition-colors">
                                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                                    <div className="bg-slate-100 p-6 md:w-48 flex flex-col items-center justify-center text-center shrink-0 border-r border-slate-100">
                                        <Calendar className="h-8 w-8 text-[#39a2cf] mb-2" />
                                        <span className="text-sm font-medium text-slate-900">{activity.date}</span>
                                        <Badge variant="outline" className="mt-2 bg-white">{activity.category}</Badge>
                                    </div>
                                    <div className="p-6 flex-1">
                                        <h3 className="font-semibold text-lg text-[#10244f] mb-2">{activity.title}</h3>
                                        <p className="text-slate-600 text-sm mb-4">
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center text-[#39a2cf] text-sm font-medium hover:underline cursor-pointer">
                                            Lihat Dokumentasi <ArrowRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
