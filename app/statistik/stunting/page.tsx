"use client";

import { Baby, Heart, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StuntingDisplay } from "@/components/ui/custom/StuntingDisplay";

export default function StuntingPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full">
                        <Baby className="h-10 w-10 text-pink-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Stunting</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Monitoring dan pencegahan stunting untuk anak 0-23 bulan di Kalurahan Pondokrejo
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* What is Stunting */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-pink-600" />
                                Apa itu Stunting?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Stunting adalah kondisi gagal tumbuh pada anak-anak karena kekurangan gizi kronis, yang
                                mempengaruhi pertumbuhan fisik dan perkembangan otak.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                                    <p>Dapat menyebabkan kemampuan认知 dan daya ingat yang rendah</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                                    <p>Meningkatkan risiko penyakit kronis di masa depan</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                                    <p>Dapat mempengaruhi produktivitas saat dewasa</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Prevention */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                Pencegahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <span>Pemberian ASI eksklusif</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <span>Gizi seimbang untuk ibu hamil</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <span>Pemantauan pertumbuhan rutin</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Our Commitment */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Komitmen Kami
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Pemantauan rutin di posyandu</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Edukasi gizi masyarakat</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Program intervensi tepat sasaran</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <StuntingDisplay />

                {/* Action Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                        <CardHeader>
                            <CardTitle className="text-pink-700">Program Ibu Hamil</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pemeriksaan rutin dan pemantauan gizi untuk ibu hamil di semua posyandu
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pemeriksaan kehamilanan</li>
                                <li>• Konsultasi gizi</li>
                                <li>• Pemberian vitamin</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Program Anak 0-23 Bulan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pemantauan pertumbuhan dan perkembangan anak melalui posyandu
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Penimbangan bulanan</li>
                                <li>• Pengukuran tinggi badan</li>
                                <li>• Konsultasi pertumbuhan</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-700">Edukasi Masyarakat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Peningkatan pengetahuan masyarakat tentang pencegahan stunting
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Penyuluhan gizi</li>
                                <li>• Demo cocinar jendela asi</li>
                                <li>• Workshop pola makan sehat</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
