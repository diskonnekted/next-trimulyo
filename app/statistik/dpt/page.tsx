"use client";

import { Users, UserCheck, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DptDisplay } from "@/components/ui/custom/DptDisplay";

export default function DptPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                        <Users className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Daftar Pemilih Tetap</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data statistik pemilih tetap penduduk Kalurahan Pondokrejo
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* About DPT */}
                    <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                Data Pemilih
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Data DPT adalah informasi penting dalam data kependudukan yang menunjukkan distribusi
                                pemilih tetap dalam sebuah wilayah.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <p>Menunjukkan distribusi pemilih tetap</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <p>Digunakan untuk perencanaan pemilihan</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                    <p>Menunjang program demokrasi</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Major Areas & Others */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-orange-600" />
                                Dusun Terbesar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Menampilkan 3 dusun dengan jumlah pemilih terbesar.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span> Dusun #1 (terbesar)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span>Dusun #2 (kedua)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                                    <span>Dusun #3 (ketiga)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                                    <span>Lainnya (kelompok dusun lainnya)</span>
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
                                    <span>Pelayanan administrasi</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <DptDisplay />

                {/* Action Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Layanan Administrasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program peningkatan layanan administrasi kependudukan
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pendaftaran pemilih</li>
                                <li>• Perubahan data</li>
                                <li>• Verifikasi alamat</li>
                                <li>• Dokumen kependudukan</li>
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
                            <CardTitle className="text-orange-700">Program Demokrasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Program peningkatan partisipasi demokrasi masyarakat
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Sosialisasi pemilihan</li>
                                <li>• Pendidikan pemilih</li>
                                <li>• Monitoring proses</li>
                                <li>• Laporan hasil</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
