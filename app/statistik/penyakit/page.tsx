"use client";

import { Heart, Users, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiseaseDisplay } from "@/components/ui/custom/PenyakitDisplay";

export default function EnfermededadPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                        <Heart className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Sakit/Penyakit</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data statistik sakit dan penyakit penduduk Kalurahan Pondokrejo
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* About Disease */}
                    <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-red-600" />
                                Data Sakit/Penyakit
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Data sakit dan penyakit adalah informasi penting dalam data kesehatan masyarakat yang
                                menunjukkan pola penyakit penduduk dalam sebuah wilayah.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                                    <p>Menunjukkan pola penyakit penduduk</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                                    <p>Digunakan untuk perencanaan kesehatan</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                                    <p>Menunjang program preventif</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Major Diseases & Others */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-orange-600" />
                                Sakit Terbesar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Menampilkan 3 sakit/penyakit dengan jumlah penduduk terbesar dan kelompok lainnya.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span> Sakit #1 (terbesar)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span>Sakit #2 (kedua)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span>Sakit #3 (ketiga)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                                    <span>Lainnya (kelompok sakit lainnya)</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Our Commitment */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-emerald-600" />
                                Komitmen Kami
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                                    <span>Data akurat dan terkini</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                                    <span>Transparansi data publik</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                                    <span>Kesehatan masyarakat</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <DiseaseDisplay />

                {/* Action Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                        <CardHeader>
                            <CardTitle className="text-red-700">Program Kesehatan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program pencegahan dan penatalaksanaan penyakit masyarakat
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pemeriksaan kesehatan rutin</li>
                                <li>• Imunisasi</li>
                                <li>• Edukasi kesehatan</li>
                                <li>• Posyandu</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-700">Data Kependudukan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pengelolaan data kependudukan yang akurat dan terpercaya
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pencatatan sipil</li>
                                <li>• Update data rutin</li>
                                <li>• Verifikasi data</li>
                                <li>• Layanan kependudukan</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                        <CardHeader>
                            <CardTitle className="text-orange-700">Program Preventif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program pencegahan penyakit dan promosi kesehatan
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Germas</li>
                                <li>• Posbindu</li>
                                <li>• PKM</li>
                                <li>• Layanan ambulance</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
