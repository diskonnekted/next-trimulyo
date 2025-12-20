"use client";

import { GraduationCap, BookOpen, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PendidikanDisplay } from "@/components/ui/custom/PendidikanDisplay";

export default function PendidikanPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full">
                        <GraduationCap className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Data Pendidikan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Analisis tingkat pendidikan masyarakat Kalurahan Pondokrejo untuk monitoring dan peningkatan
                        kualitas sumber daya manusia
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* What is Education */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-indigo-600" />
                                Pentingnya Pendidikan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pendidikan adalah fondasi pembangunan sumber daya manusia yang berkualitas, yang
                                menentukan kemajuan dan kemakmuran suatu daerah.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                                    <p>Meningkatkan daya saing dan produktivitas masyarakat</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                                    <p>Membuka peluang kerja dan entrepreneurship yang lebih baik</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                                    <p>Mendorong inovasi dan kemajuan teknologi</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education Levels */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                Tingkat Pendidikan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 shrink-0" />
                                    <span>Pendidikan Dasar (SD-SMP)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 shrink-0" />
                                    <span>Pendidikan Menengah (SMA-SMK)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 shrink-0" />
                                    <span>Pendidikan Tinggi (D3-D4-S1-S2)</span>
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
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                                    <span>Program wajib belajar 12 tahun</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                                    <span>Bantuan beasiswa untuk masyarakat</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                                    <span>Program pelatihan dan sertifikasi</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <PendidikanDisplay />

                {/* Action Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-linear-to-br from-indigo-50 to-blue-50 border-indigo-200">
                        <CardHeader>
                            <CardTitle className="text-indigo-700">Program Pendidikan Dasar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Memastikan semua anak mendapatkan pendidikan dasar yang berkualitas dan merata
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Program Bos (Bantuan Operasional Sekolah)</li>
                                <li>• Sarana dan prasarana pendidikan</li>
                                <li>• Pelatihan guru dan tenaga pendidik</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-linear-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-700">Beasiswa dan Bantuan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Memberikan dukungan finansial untuk melanjutkan pendidikan ke jenjang yang lebih tinggi
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Beasiswa prestasi akademik</li>
                                <li>• Bantuan biaya pendidikan</li>
                                <li>• Program Kusuma karya</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-linear-to-br from-violet-50 to-purple-50 border-violet-200">
                        <CardHeader>
                            <CardTitle className="text-violet-700">Program Pelatihan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Meningkatkan keterampilan dan kompetensi masyarakat untuk mendukung kehidupan yang lebih
                                baik
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li>• Pelatihan komputer dan IT</li>
                                <li>• Kursus keterampilan generate income</li>
                                <li>• Program sertifikasi kompetensi</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
