"use client";

import { useState } from "react";
import { 
    ExternalLink, 
    ShieldCheck, 
    UserCheck, 
    Info, 
    Key, 
    Smartphone, 
    ChevronRight,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LayananMandiriPage() {
    const targetUrl = "https://trimulyo.sleman-desa.id/layanan-mandiri";

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Hero Header */}
            <div className="bg-[#10264f] text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm mb-6 border border-white/20">
                        <UserCheck className="h-10 w-10 text-blue-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Mandiri</h1>
                    <p className="text-blue-100/80 max-w-2xl mx-auto text-lg">
                        Akses administrasi kependudukan Anda secara digital, cepat, dan transparan dari mana saja.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Info & Instructions */}
                    <div className="lg:col-span-7 space-y-6">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Info className="w-6 h-6 text-primary" />
                                Tentang Layanan
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                Layanan Mandiri adalah portal digital khusus warga Kalurahan Trimulyo yang memungkinkan Anda untuk melakukan permohonan surat, memantau data keluarga, dan mendapatkan informasi bantuan sosial secara mandiri tanpa harus mengantri di kantor kalurahan.
                            </p>
                        </section>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { 
                                    icon: Key, 
                                    title: "Akses PIN", 
                                    desc: "Gunakan NIK dan PIN rahasia Anda untuk masuk ke sistem.",
                                    color: "bg-amber-50 text-amber-600 border-amber-100"
                                },
                                { 
                                    icon: Smartphone, 
                                    title: "Mobile Friendly", 
                                    desc: "Dapat diakses dengan lancar melalui smartphone Anda.",
                                    color: "bg-blue-50 text-blue-600 border-blue-100"
                                }
                            ].map((item, i) => (
                                <Card key={i} className={`border ${item.color}`}>
                                    <CardContent className="p-5 space-y-3">
                                        <item.icon className="w-8 h-8" />
                                        <h3 className="font-bold">{item.title}</h3>
                                        <p className="text-sm opacity-90">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="border-slate-200 shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b">
                                <CardTitle className="text-lg">Panduan Pendaftaran PIN</CardTitle>
                                <CardDescription>Bagi warga yang belum memiliki akses PIN</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-none w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                                    <p className="text-slate-600 pt-1">Kunjungi Kantor Kalurahan Trimulyo pada jam kerja (08:00 - 15:00 WIB).</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-none w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                                    <p className="text-slate-600 pt-1">Bawa fotokopi KTP dan Kartu Keluarga (KK) sebagai syarat verifikasi.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-none w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                                    <p className="text-slate-600 pt-1">Petugas akan memberikan PIN akses yang dapat Anda gunakan selamanya.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Login Card */}
                    <div className="lg:col-span-5">
                        <Card className="shadow-2xl border-0 ring-1 ring-slate-200 sticky top-24">
                            <CardHeader className="space-y-1 text-center pb-2">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">Masuk Layanan</CardTitle>
                                <CardDescription>Akses data kependudukan secara aman</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-2 space-y-6">
                                <div className="space-y-4 opacity-70 grayscale pointer-events-none">
                                    <div className="space-y-2">
                                        <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                                        <Input id="nik" placeholder="16 digit NIK Anda" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pin">PIN / Kata Sandi</Label>
                                        <Input id="pin" type="password" placeholder="Masukkan PIN rahasia" />
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-500 border border-dashed border-slate-300">
                                    <p className="flex gap-2">
                                        <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        Untuk alasan keamanan, Anda akan diarahkan ke sistem server kependudukan Trimulyo yang terenkripsi.
                                    </p>
                                </div>

                                <Button 
                                    className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 group"
                                    onClick={() => window.open(targetUrl, "_blank")}
                                >
                                    Buka Portal Login
                                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                <div className="text-center">
                                    <button 
                                        className="text-sm text-slate-400 hover:text-primary underline-offset-4 hover:underline"
                                        onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
                                    >
                                        Lupa PIN atau butuh bantuan?
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
