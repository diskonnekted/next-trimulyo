"use client";

import { useState } from "react";
import { 
    ExternalLink, 
    ShieldCheck, 
    UserCheck, 
    Info, 
    Smartphone, 
    ChevronRight,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LayananMandiriPage() {
    const [iframeError, setIframeError] = useState(false);
    const targetUrl = "https://trimulyo.sleman-desa.id/layanan-mandiri/masuk";

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Section */}
            <div className="bg-[#10264f] text-white py-12 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                                <UserCheck className="h-8 w-8 text-blue-300" />
                                Layanan Mandiri
                            </h1>
                            <p className="text-blue-100/80 max-w-xl">
                                Akses administrasi kependudukan Anda secara digital dan aman.
                            </p>
                        </div>
                        <Button 
                            variant="secondary"
                            className="bg-white text-[#10264f] hover:bg-blue-50"
                            onClick={() => window.open(targetUrl, "_blank")}
                        >
                            Buka di Tab Baru
                            <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="max-w-6xl mx-auto">
                    {/* Security Info Banner */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-t-xl p-3 flex items-center justify-center gap-2 text-sm text-emerald-700 mb-0">
                        <ShieldCheck className="w-4 h-4" />
                        Terhubung aman dengan Server Kependudukan Kalurahan Trimulyo
                    </div>

                    <Card className="shadow-2xl border-0 overflow-hidden rounded-t-none min-h-[700px] flex flex-col bg-white">
                        <div className="flex-1 relative">
                            {/* Iframe */}
                            {!iframeError ? (
                                <iframe 
                                    src={targetUrl}
                                    className="w-full h-[700px] border-0"
                                    title="Layanan Mandiri Trimulyo"
                                    onError={() => setIframeError(true)}
                                    // Use standard sandbox to allow forms/scripts
                                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                                />
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
                                    <Alert variant="destructive" className="max-w-xl">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Koneksi Terbatas</AlertTitle>
                                        <AlertDescription>
                                            Halaman login tidak dapat ditampilkan langsung di website ini karena kebijakan keamanan browser Anda atau server pusat. 
                                            Silakan klik tombol di bawah untuk membuka portal secara langsung.
                                        </AlertDescription>
                                    </Alert>
                                    <Button 
                                        size="lg"
                                        className="bg-[#dd2d4a] hover:bg-[#c22841] text-white px-8 h-14 text-lg font-bold rounded-xl"
                                        onClick={() => window.open(targetUrl, "_blank")}
                                    >
                                        Masuk ke Layanan Mandiri
                                        <ExternalLink className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Footer Info */}
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-500" />
                                Cara Pendaftaran
                            </h3>
                            <p className="text-sm text-slate-600">
                                Datang ke Kantor Kalurahan dengan membawa KTP/KK untuk mendapatkan PIN akses pertama kali.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <Smartphone className="w-5 h-5 text-blue-500" />
                                Akses Mobile
                            </h3>
                            <p className="text-sm text-slate-600">
                                Layanan ini dapat diakses melalui smartphone Anda untuk kemudahan permohonan surat darimana saja.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-500" />
                                Privasi Data
                            </h3>
                            <p className="text-sm text-slate-600">
                                Pastikan PIN Anda terjaga kerahasiaannya. Jangan berikan PIN kepada orang lain.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
