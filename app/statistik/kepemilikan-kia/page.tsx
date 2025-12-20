"use client";

import { CreditCard, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KepemilikanKIADisplay } from "@/components/ui/custom/KepemilikanKIADisplay";

export default function KepemilikanKIAPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <CreditCard className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Kepemilikan KIA</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data statistik kepemilikan Kartu Identitas Anak (KIA) Kalurahan Pondokrejo
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* About Kepemilikan KIA */}
                    <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                                Data KIA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                KIA (Kartu Identitas Anak) adalah dokumen identitas resmi untuk anak yang belum memiliki
                                KTP sebagai bentuk pelayanan administrasi kependudukan.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <p>Menampilkan kepemilikan KIA anak</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <p>Digunakan untuk administrasi kependudukan</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <p>Menunjang layanan anak</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* KIA Status Categories */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-orange-600" />
                                Status KIA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Menampilkan status kepemilikan dan pencatatan KIA.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Belum Rekam</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Sudah Rekam</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Card Printed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                                    <span>Belum Wajib</span>
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
                                    <span>Pelayanan inklusif</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <KepemilikanKIADisplay />

                {/* Action Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Layanan Anak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pelayanan administrasi kependudukan khusus untuk anak-anak
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pendaftaran KIA baru</li>
                                <li>• Perekaman biometrik</li>
                                <li>• Pencetakan KIA</li>
                                <li>• Legalisasi dokumen</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-700">Data Anak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pengelolaan data kependudukan anak yang akurat dan terpercaya
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Monitoring kepemilikan</li>
                                <li>• Update data pertumbuhan</li>
                                <li>• Validasi identitas</li>
                                <li>• Statistik anak</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                        <CardHeader>
                            <CardTitle className="text-orange-700">Program Anak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program perlindungan dan pelayanan khusus untuk anak-anak
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Perlindungan anak</li>
                                <li>• Pendidikan anak</li>
                                <li>• Kesehatan anak</li>
                                <li>• Fasilitasi layanan</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
