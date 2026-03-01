"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, User, Eye, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

function ExternalNewsContent() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [isLoading, setIsLoading] = useState(true);
    const [iframeHeight, setIframeHeight] = useState("800px");

    // Construct the target URL
    // We assume the slug matches the WordPress post slug
    const targetUrl = `https://trimulyo.sleman-desa.id/berita/${slug}`;

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Function to handle iframe load
    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header / Navigation Bar */}
            <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Daftar Berita
                    </Button>
                    
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2 hidden sm:flex"
                            onClick={() => window.open(targetUrl, "_blank")}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Buka Sumber Asli
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="max-w-5xl mx-auto">
                    {/* External Content Info Alert */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-start gap-3 text-sm text-blue-800">
                        <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Konten Eksternal</p>
                            <p className="text-blue-700/80">
                                Berita ini dimuat langsung dari website resmi Kalurahan Trimulyo. 
                                Tampilan mungkin berbeda dengan standar website ini.
                            </p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <Card className="overflow-hidden shadow-lg border-0 bg-white">
                        {isLoading && (
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center text-gray-400">
                                    Memuat konten berita...
                                </div>
                            </div>
                        )}
                        {/* Iframe content would go here */}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function ExternalNewsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ExternalNewsContent />
        </Suspense>
    );
}

                        <div className={`relative w-full transition-opacity duration-500 ${isLoading ? 'opacity-0 h-0' : 'opacity-100'}`}>
                            <iframe 
                                src={targetUrl}
                                className="w-full border-0"
                                style={{ height: "100vh", minHeight: "800px" }}
                                title={`Berita: ${slug}`}
                                onLoad={handleIframeLoad}
                                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                            />
                        </div>
                    </Card>

                    {/* Related News Placeholder */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Berita Terbaru Lainnya
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                                    <CardContent className="p-4">
                                        <div className="h-32 bg-gray-100 rounded-md mb-3"></div>
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="text-xs font-normal">Kabar Desa</Badge>
                                            <h4 className="font-semibold text-gray-800 line-clamp-2">
                                                Kegiatan Pemberdayaan Masyarakat Desa Tahun Anggaran 2025
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                <span>12 Mei 2025</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
