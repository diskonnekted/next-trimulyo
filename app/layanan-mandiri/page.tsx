"use client";

import { useState } from "react";
import { ExternalLink, Shield, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LayananMandiriPage() {
    const [iframeError, setIframeError] = useState(false);
    const targetUrl = "https://trimulyo.sleman-desa.id/layanan-mandiri/masuk";

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 space-y-6">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                        <UserCheck className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Layanan Mandiri</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Silakan masuk untuk mengakses layanan administrasi kependudukan secara mandiri.
                        Anda dapat memperbarui biodata, mencetak dokumen, dan memantau bantuan.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="max-w-5xl mx-auto">
                    <Card className="overflow-hidden shadow-lg bg-white border-0">
                        {/* Control Bar */}
                        <div className="bg-gray-50 border-b p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Shield className="w-4 h-4 text-green-600" />
                                <span>Koneksi aman ke sistem kependudukan desa</span>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2 bg-white hover:bg-gray-50 text-blue-600 border-blue-200"
                                onClick={() => window.open(targetUrl, "_blank")}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Buka di Tab Baru
                            </Button>
                        </div>

                        {/* Iframe Container */}
                        <div className="relative w-full min-h-[800px] bg-gray-100">
                            {!iframeError ? (
                                <iframe 
                                    src={targetUrl}
                                    className="w-full h-[800px] border-0"
                                    title="Layanan Mandiri Trimulyo"
                                    onError={() => setIframeError(true)}
                                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <Alert variant="destructive" className="max-w-md bg-white shadow-lg">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Gagal Memuat Halaman</AlertTitle>
                                        <AlertDescription className="mt-2 space-y-4">
                                            <p>
                                                Halaman Layanan Mandiri tidak dapat dimuat di dalam website ini karena kebijakan keamanan browser.
                                            </p>
                                            <Button 
                                                className="w-full bg-blue-600 hover:bg-blue-700"
                                                onClick={() => window.open(targetUrl, "_blank")}
                                            >
                                                Buka Halaman Login
                                                <ExternalLink className="ml-2 w-4 h-4" />
                                            </Button>
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Information Section */}
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <Card className="bg-blue-50 border-blue-100">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-blue-900 mb-2">Apa itu Layanan Mandiri?</h3>
                                <p className="text-sm text-blue-800/80">
                                    Fasilitas bagi warga untuk mengurus administrasi surat-menyurat dan mengecek data kependudukan secara online tanpa harus datang ke kantor desa.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-emerald-50 border-emerald-100">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-emerald-900 mb-2">Bagaimana cara mendapatkan PIN?</h3>
                                <p className="text-sm text-emerald-800/80">
                                    Silakan hubungi operator desa atau datang langsung ke Kantor Kalurahan Trimulyo dengan membawa KTP dan KK untuk mendapatkan PIN akses.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-purple-50 border-purple-100">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-purple-900 mb-2">Keamanan Data</h3>
                                <p className="text-sm text-purple-800/80">
                                    Data Anda dilindungi dengan enkripsi. Pastikan tidak memberikan PIN Anda kepada orang lain untuk mencegah penyalahgunaan data.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
