"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
    ArrowLeft, 
    Calendar, 
    MapPin, 
    Phone, 
    Mail, 
    ExternalLink, 
    Loader2,
    Users,
    Activity,
    ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCommunityDetail, type CommunityDetail } from "@/lib/api-komunitas";

export default function KomunitasDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    
    const [community, setCommunity] = useState<CommunityDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;

        async function fetchDetail() {
            try {
                // Use the API route proxy or direct fetch depending on setup
                // Since we have a client component, we'll fetch via our proxy route to avoid CORS if possible,
                // or use the lib function directly if it supports client-side
                
                // For now, let's try using the lib function directly but wrapped in an API route call 
                // to handle potential server-side logic or CORS.
                // However, since we defined getCommunityDetail in lib, let's use it.
                // If CORS is an issue, we should use /api/komunitas?id={id}
                
                const response = await fetch(`/api/komunitas?id=${id}`);
                const data = await response.json();
                
                if (data.success) {
                    setCommunity(data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch community detail:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();
    }, [id]);

    const stripHtml = (html: string) => {
        if (typeof window === 'undefined') return html;
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-[#39a2cf]" />
            </div>
        );
    }

    if (error || !community) {
        // Fallback to iframe if API fails
        const smartVillageUrl = `https://trimulyo.smartvillage.center/communities/${id}`;
        return (
            <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-112px)]">
                <div className="bg-white border-b p-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-semibold text-lg text-[#10244f]">Detail Komunitas</h1>
                    <div className="ml-auto">
                        <Button variant="outline" size="sm" asChild>
                            <a href={smartVillageUrl} target="_blank" rel="noopener noreferrer">
                                Buka di Tab Baru
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="flex-1 w-full bg-slate-50 relative">
                    <iframe
                        src={smartVillageUrl}
                        className="w-full h-full border-0"
                        title="Detail Komunitas"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header / Cover */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-semibold text-lg text-[#10244f] line-clamp-1">{community.name}</h1>
                    <div className="ml-auto">
                        <Button variant="outline" size="sm" asChild>
                            <a href={`https://trimulyo.smartvillage.center/communities/${id}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Website Asli
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="overflow-hidden border-slate-200 shadow-sm">
                            <div className="relative aspect-video bg-slate-100">
                                {community.image ? (
                                    <Image
                                        src={community.image}
                                        alt={community.name || "Community Image"}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        <Users className="h-16 w-16" />
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#10244f] mb-4">{community.name}</h2>
                                <div className="space-y-3 text-sm text-slate-600">
                                    {community.category && (
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">{community.category}</Badge>
                                        </div>
                                    )}
                                    {community.contact && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-[#39a2cf]" />
                                            <span>{community.contact}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-[#39a2cf]" />
                                        <span>Bergabung sejak {new Date(community.created_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Statistik</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <div className="text-xl font-bold text-blue-600">{community.news_count}</div>
                                    <div className="text-xs text-slate-600 mt-1">Berita</div>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <div className="text-xl font-bold text-green-600">{community.activities_count}</div>
                                    <div className="text-xs text-slate-600 mt-1">Kegiatan</div>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <div className="text-xl font-bold text-orange-600">{community.galleries_count}</div>
                                    <div className="text-xs text-slate-600 mt-1">Galeri</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="about" className="w-full">
                            <TabsList className="w-full justify-start bg-white border border-slate-200 p-1 h-auto flex-wrap">
                                <TabsTrigger value="about" className="data-[state=active]:bg-[#39a2cf] data-[state=active]:text-white">Tentang</TabsTrigger>
                                <TabsTrigger value="news" className="data-[state=active]:bg-[#39a2cf] data-[state=active]:text-white">
                                    Berita {community.news_count > 0 && `(${community.news_count})`}
                                </TabsTrigger>
                                <TabsTrigger value="activities" className="data-[state=active]:bg-[#39a2cf] data-[state=active]:text-white">
                                    Kegiatan {community.activities_count > 0 && `(${community.activities_count})`}
                                </TabsTrigger>
                                <TabsTrigger value="gallery" className="data-[state=active]:bg-[#39a2cf] data-[state=active]:text-white">
                                    Galeri {community.galleries_count > 0 && `(${community.galleries_count})`}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="mt-6">
                                <Card className="border-slate-200 shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Tentang Komunitas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div 
                                            className="prose max-w-none text-slate-600"
                                            dangerouslySetInnerHTML={{ __html: community.description }}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="news" className="mt-6">
                                <div className="grid gap-4">
                                    {community.news && community.news.length > 0 ? (
                                        community.news.map((item) => (
                                            <Card key={item.id} className="border-slate-200 hover:border-blue-300 transition-colors">
                                                <CardContent className="p-0 flex flex-col md:flex-row gap-4">
                                                    <div className="relative w-full md:w-48 h-48 md:h-auto bg-slate-100 shrink-0">
                                                        {item.image ? (
                                                            <Image 
                                                                src={item.image} 
                                                                alt={item.title || "News Image"} 
                                                                fill 
                                                                className="object-cover" 
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-slate-400">
                                                                <ImageIcon className="h-8 w-8" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-4 flex-1">
                                                        <div className="text-xs text-slate-500 mb-2">
                                                            {new Date(item.published_at || item.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric', month: 'long', year: 'numeric'
                                                            })}
                                                        </div>
                                                        <h3 className="font-bold text-lg text-[#10244f] mb-2">{item.title}</h3>
                                                        <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                                                            {stripHtml(item.content)}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                                            Belum ada berita yang dipublikasikan.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="activities" className="mt-6">
                                <div className="grid gap-4">
                                    {community.activities && community.activities.length > 0 ? (
                                        community.activities.map((item) => (
                                            <Card key={item.id} className="border-slate-200">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600 shrink-0">
                                                            <Activity className="h-6 w-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-lg text-[#10244f] mb-1">{item.title}</h3>
                                                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {new Date(item.date).toLocaleDateString('id-ID')}
                                                                </span>
                                                                {item.location && (
                                                                    <span className="flex items-center gap-1">
                                                                        <MapPin className="h-3 w-3" />
                                                                        {item.location}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div 
                                                                className="prose prose-sm max-w-none text-slate-600 prose-headings:text-[#10244f] prose-a:text-[#39a2cf]"
                                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                                            Belum ada kegiatan yang tercatat.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="gallery" className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {community.galleries && community.galleries.length > 0 ? (
                                        community.galleries.map((item) => (
                                            <div key={item.id} className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group">
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.title || "Gallery Image"} 
                                                    fill 
                                                    className="object-cover transition-transform group-hover:scale-105" 
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                    <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                                            Belum ada galeri foto.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
