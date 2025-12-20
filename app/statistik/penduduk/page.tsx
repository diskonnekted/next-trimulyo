"use client";

import { Users, TrendingUp, BarChart3, PieChart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatistikDisplay } from "@/components/ui/custom/StatistikDisplay";

export default function StatistikPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <BarChart3 className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Statistik Kalurahan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data dan statistik penduduk Kalurahan berdasarkan tingkat pendidikan
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Users className="h-5 w-5" />
                                Data Penduduk
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Informasi lengkap tentang jumlah penduduk Kalurahan berdasarkan data administrasi
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-700">
                                <TrendingUp className="h-5 w-5" />
                                Tingkat Pendidikan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Distribusi penduduk menurut jenjang pendidikan yang telah diselesaikan
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-700">
                                <PieChart className="h-5 w-5" />
                                Analisis Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Visualisasi dan analisis tren pendidikan untuk perencanaan pembangunan
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Data Display */}
                <StatistikDisplay />

                {/* Additional Info */}
                <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Tentang Data Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                                Data statistik ini merupakan data resmi penduduk Kalurahan yang diperoleh dari system
                                administrasi kependudukan dan update secara berkala.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Sumber Data:</h4>
                                    <ul className="space-y-1">
                                        <li>• Database penduduk Kalurahan</li>
                                        <li>• Pencatatan sipil dan administrasi</li>
                                        <li>• Survey lapangan berkala</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Update Data:</h4>
                                    <ul className="space-y-1">
                                        <li>• Update bulanan</li>
                                        <li>• Verifikasi semesteran</li>
                                        <li>• Laporan tahunan resmi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
