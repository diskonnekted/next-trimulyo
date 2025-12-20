"use client";

import { Heart, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HamilDisplay } from "@/components/ui/custom/HamilDisplay";

export default function HamilPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full">
                        <Heart className="h-10 w-10 text-pink-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Ibu Hamil</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Monitoring dan data statistik ibu hamil serta wanita usia subur di Kalurahan Pondokrejo
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* What is Stunting */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-pink-600" />
                                Pentingnya Pemantauan Ibu Hamil
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pemantauan kesehatan ibu hamil sangat penting untuk mencegah stunting pada anak sejak
                                dalam kandungan dan memastikan tumbuh kembang yang optimal.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                                    <p>Pemeriksaan rutin menjaga kesehatan ibu dan bayi</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                                    <p>Pemberian nutrisi yang cukup untuk perkembangan otak</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                                    <p>Pencegahan stunting sejak dalam kandungan</p>
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
                                    <span>Pemeriksaan kandungan rutin</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <span>Konsumsi asam folat dan vitamin</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <span>Gizi seimbang untuk ibu hamil</span>
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
                                    <span>Pemeriksaan gratis di posyandu</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Edukasi gizi untuk ibu hamil</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Program konseling nutrisi</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <HamilDisplay />

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
                                <li>• USG gratis</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Wanita Usia Subur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pemantauan kesehatan reproduksi dan kesiapan hamil
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pemeriksaan kesehatan</li>
                                <li>• Konsultasi perencanaan keluarga</li>
                                <li>• Edukasi kesehatan reproduksi</li>
                                <li>• Program KB</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-700">Edukasi Masyarakat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Peningkatan pengetahuan masyarakat tentang kesehatan ibu dan anak
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Penyuluhan gizi</li>
                                <li>• Kelas persiapan hamil</li>
                                <li>• Workshop pola makan sehat</li>
                                <li>• Konseling ASI</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
