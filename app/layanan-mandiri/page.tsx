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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LayananMandiriPage() {
    const targetUrl = "https://trimulyo.sleman-desa.id/layanan-mandiri/masuk";

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Section */}
            <div className="bg-[#10264f] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm mb-6 border border-white/20">
                        <UserCheck className="h-10 w-10 text-blue-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Mandiri</h1>
                    <p className="text-blue-100/80 max-w-2xl mx-auto text-lg">
                        Portal administrasi kependudukan resmi Kalurahan Trimulyo.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-2xl border-0 overflow-hidden rounded-2xl bg-white">
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-2">
                                {/* Left side: CTA */}
                                <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                                    <div className="space-y-6">
                                        <div>
                                            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                                                <ShieldCheck className="w-3 h-3 mr-1" />
                                                Koneksi Aman & Terenkripsi
                                            </Badge>
                                            <h2 className="text-2xl font-bold text-slate-800">Siap Melayani Anda</h2>
                                            <p className="text-slate-500 mt-2">
                                                Klik tombol di bawah untuk masuk ke sistem kependudukan aman kami.
                                            </p>
                                        </div>

                                        <Button 
                                            size="lg"
                                            className="w-full h-16 text-xl font-bold bg-[#dd2d4a] hover:bg-[#c22841] text-white shadow-xl shadow-red-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                            onClick={() => window.open(targetUrl, "_blank")}
                                        >
                                            Masuk Layanan Mandiri
                                            <ExternalLink className="ml-3 w-6 h-6" />
                                        </Button>

                                        <p className="text-xs text-center text-slate-400">
                                            Anda akan diarahkan ke server kependudukan resmi Trimulyo.
                                        </p>
                                    </div>
                                </div>

                                {/* Right side: Quick Info */}
                                <div className="bg-slate-50 p-8 md:p-12 space-y-6">
                                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Persyaratan Akses:</h3>
                                    <div className="space-y-4">
                                        {[
                                            { icon: UserCheck, text: "Terdaftar sebagai penduduk Trimulyo" },
                                            { icon: Smartphone, text: "Memiliki NIK yang valid" },
                                            { icon: Info, text: "Memiliki PIN (Minta ke Kantor Desa)" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                                    <item.icon className="w-4 h-4 text-blue-500" />
                                                </div>
                                                <span className="text-sm font-medium">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Alert className="bg-blue-50 border-blue-100 text-blue-800 mt-6">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        <AlertTitle className="text-xs font-bold uppercase">Informasi</AlertTitle>
                                        <AlertDescription className="text-xs leading-relaxed">
                                            Layanan ini memungkinkan warga untuk mencetak surat keterangan secara mandiri tanpa harus menunggu di loket pelayanan.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Help */}
                    <div className="mt-12 text-center space-y-4">
                        <p className="text-slate-500">Belum memiliki PIN atau butuh bantuan teknis?</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button variant="outline" className="rounded-full px-6" onClick={() => window.open("https://wa.me/6281234567890", "_blank")}>
                                Hubungi Operator (WA)
                            </Button>
                            <Button variant="ghost" className="rounded-full px-6" asChild>
                                <Link href="/kontak">Lihat Lokasi Kantor</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
