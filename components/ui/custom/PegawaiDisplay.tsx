"use client";

import * as React from "react";
import { Users, UserCheck, Briefcase, GraduationCap, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GovernmentOfficial {
    id: string;
    nama: string;
    jabatan: string;
    jenis_kelamin: string;
    pendidikan: string;
    usia: number | string;
    foto: string | null;
    status: string;
}

interface ApiResponse {
    success: boolean;
    data: any[]; // Changed to any[] to support both mock and real data structures
}

interface PegawaiDisplayProps {
    className?: string;
}

// Function to fetch Pegawai data from API
const fetchPegawaiData = async (): Promise<ApiResponse | null> => {
    try {
        const response = await fetch(`/api/pemerintah`);

        if (!response.ok) {
            throw new Error(`Failed to fetch pegawai data: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch pegawai data:", error);
        return null;
    }
};

export function PegawaiDisplay({ className }: PegawaiDisplayProps) {
    const [data, setData] = React.useState<ApiResponse | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setData(null);

            try {
                const result = await fetchPegawaiData();
                setData(result);
            } catch (error) {
                console.error("Failed to load pegawai data:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className={cn("w-full space-y-6", className)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5 text-primary" />
                            Pegawai & Perangkat Kalurahan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!data || !data.data) {
        return (
            <div className={cn("w-full space-y-6", className)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5 text-primary" />
                            Pegawai & Perangkat Kalurahan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <div className="text-center">
                                <p className="text-lg font-semibold mb-2">Data tidak tersedia</p>
                                <p className="text-sm">Tidak dapat memuat data pegawai saat ini</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const pegawaiList = data.data;

    return (
        <div className={cn("w-full space-y-6", className)}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Pegawai & Perangkat Kalurahan
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Total: {pegawaiList.length} orang</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {pegawaiList.map((pegawai) => {
                            // Since our mock data doesn't have foto_staff, we just use foto or null
                            // If we had foto_staff logic, we'd restore it here
                            const photoUrl = pegawai.foto;

                            return (
                                <Card
                                    key={pegawai.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
                                >
                                    <div className="relative w-full h-[316px] bg-gradient-to-br from-sky-100 to-blue-200 overflow-hidden">
                                        {photoUrl ? (
                                            <Image
                                                src={photoUrl}
                                                alt={pegawai.nama}
                                                fill
                                                className="object-cover object-top scale-102"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="h-20 w-20 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4 pt-0 pb-0 space-y-3">
                                        <div>
                                            <h3 className="text-sm font-bold text-primary mb-1">
                                                {pegawai.nama}
                                            </h3>
                                            <Badge variant="secondary" className="text-xs">
                                                {pegawai.jabatan}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2 text-xs">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Briefcase className="h-4 w-4" />
                                                <span>{pegawai.status}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <UserCheck className="h-4 w-4" />
                                                <span>
                                                    {pegawai.jenis_kelamin} • {pegawai.usia} Tahun
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-4 w-4" />
                                                <span>{pegawai.pendidikan}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
