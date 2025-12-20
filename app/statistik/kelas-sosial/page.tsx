"use client";

import { Users, UserCheck, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KelasSosialDisplay } from "@/components/ui/custom/KelasSosialDisplay";

export default function KelasSosialPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full">
                        <Users className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Kelas Sosial</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data statistik kelas sosial keluarga berdasarkan tingkat kesejahteraan di Kalurahan Pondokrejo
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* About Social Class */}
                    <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-600" />
                                Data Kelas Sosial
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Klasifikasi tingkat kesejahteraan keluarga berdasarkan kriteria yang ditetapkan untuk
                                program pemberdayaan masyarakat.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                                    <p>Menampilkan 5 klasifikasi tingkat kesejahteraan</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                                    <p>Digunakan untuk program bantuan sosial</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                                    <p>Menunjang program peningkatan kesejahteraan</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Classification Info */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-orange-600" />
                                Klasifikasi Kesejahteraan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Lima tingkat kesejahteraan keluarga berdasarkan kriteria pemerintah.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                                    <span>Pra Sejahtera (kurang mampu)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span>Sejahtera I (cukup mampu)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                                    <span>Sejahtera II (mampu)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <span>Sejahtera III (sangat mampu)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                    <span>Sejahtera III Plus (berkecukupan)</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Our Commitment */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="h-5 w-5 text-emerald-600" />
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
                <KelasSosialDisplay />

                {/* Action Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                        <CardHeader>
                            <CardTitle className="text-indigo-700">Program Bantuan Sosial</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program bantuan untuk meningkatkan kesejahteraan keluarga
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• PKH (Program Keluarga Harapan)</li>
                                <li>• BPNT (Bantuan Pangan Non Tunai)</li>
                                <li>• BPJS Kesehatan</li>
                                <li>• Bantuan Pendidikan</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-700">Pemberdayaan Masyarakat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program pemberdayaan untuk kemandirian ekonomi keluarga
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pelatihan keterampilan</li>
                                <li>• Bantuan usaha mikro</li>
                                <li>• Kelompok produktif</li>
                                <li>• Koperasi simpan pinjam</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                        <CardHeader>
                            <CardTitle className="text-orange-700">Pendampingan Keluarga</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pendampingan untuk peningkatan kualitas hidup keluarga
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Penyuluhan gizi</li>
                                <li>• Kesehatan reproduksi</li>
                                <li>• Parenting education</li>
                                <li>• Financial literacy</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
