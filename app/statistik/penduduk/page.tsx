"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, BarChart3, PieChart, Home, MapPin } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PopulationStat {
    dusun: string;
    kepalaDusun: string;
    jumlahRw: number;
    jumlahRt: number;
    jumlahKk: number;
    jiwa: number;
    lakiLaki: number;
    perempuan: number;
}

interface TotalStats {
    jumlahKk: number;
    jiwa: number;
    lakiLaki: number;
    perempuan: number;
}

export default function StatistikPage() {
    const [data, setData] = useState<PopulationStat[]>([]);
    const [total, setTotal] = useState<TotalStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/statistik/penduduk");
                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                    setTotal(result.total);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <BarChart3 className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Statistik Kependudukan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Data Demografi Penduduk Kalurahan Trimulyo Berdasarkan Wilayah Padukuhan
                    </p>
                </div>

                {/* Summary Cards */}
                {total && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
                                    <Users className="h-4 w-4" /> Total Penduduk
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-900">{total.jiwa.toLocaleString()}</div>
                                <p className="text-xs text-blue-600">Jiwa</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-2">
                                    <Home className="h-4 w-4" /> Total KK
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-900">{total.jumlahKk.toLocaleString()}</div>
                                <p className="text-xs text-green-600">Kepala Keluarga</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-sky-600 flex items-center gap-2">
                                    <Users className="h-4 w-4" /> Laki-laki
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-sky-900">{total.lakiLaki.toLocaleString()}</div>
                                <p className="text-xs text-sky-600">
                                    {((total.lakiLaki / total.jiwa) * 100).toFixed(1)}% dari total
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-pink-600 flex items-center gap-2">
                                    <Users className="h-4 w-4" /> Perempuan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-pink-900">{total.perempuan.toLocaleString()}</div>
                                <p className="text-xs text-pink-600">
                                    {((total.perempuan / total.jiwa) * 100).toFixed(1)}% dari total
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Charts */}
                <div className="grid md:grid-cols-1 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Grafik Penduduk per Padukuhan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="dusun" angle={-45} textAnchor="end" height={100} interval={0} fontSize={12} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="lakiLaki" name="Laki-laki" fill="#0ea5e9" stackId="a" />
                                        <Bar dataKey="perempuan" name="Perempuan" fill="#ec4899" stackId="a" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Detail Data per Padukuhan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-bold">Nama Dusun</TableHead>
                                        <TableHead className="font-bold">Kepala Dusun</TableHead>
                                        <TableHead className="text-center font-bold">RW</TableHead>
                                        <TableHead className="text-center font-bold">RT</TableHead>
                                        <TableHead className="text-center font-bold">KK</TableHead>
                                        <TableHead className="text-center font-bold">L</TableHead>
                                        <TableHead className="text-center font-bold">P</TableHead>
                                        <TableHead className="text-center font-bold">Total Jiwa</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{row.dusun}</TableCell>
                                            <TableCell>{row.kepalaDusun}</TableCell>
                                            <TableCell className="text-center">{row.jumlahRw}</TableCell>
                                            <TableCell className="text-center">{row.jumlahRt}</TableCell>
                                            <TableCell className="text-center">{row.jumlahKk}</TableCell>
                                            <TableCell className="text-center">{row.lakiLaki}</TableCell>
                                            <TableCell className="text-center">{row.perempuan}</TableCell>
                                            <TableCell className="text-center font-bold">{row.jiwa}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
