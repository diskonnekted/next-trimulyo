"use client";

import { useEffect, useState } from "react";
import { Building, Users, Award, FileText, GraduationCap, Briefcase, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

interface GovernmentOfficial {
    id: string;
    nama: string;
    jabatan: string;
    jenis_kelamin: string;
    pendidikan: string;
    usia: number;
    foto: string | null;
    status: string;
}

const OfficialCard = ({ official, className = "" }: { official: GovernmentOfficial, className?: string }) => (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
        <div className="aspect-[3/4] relative bg-gray-100">
            {official.foto ? (
                <Image
                    src={official.foto}
                    alt={official.nama}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <User className="w-20 h-20" />
                </div>
            )}
        </div>
        <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-center leading-tight min-h-[3rem] flex items-center justify-center">
                {official.nama}
            </CardTitle>
            <CardDescription className="text-center font-medium text-primary">
                {official.jabatan}
            </CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-2 pt-0">
            <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>{official.pendidikan}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{official.usia} Tahun</span>
            </div>
        </CardContent>
    </Card>
);

const BPKalCard = ({ member }: { member: { nama: string, jabatan: string, foto: string | null } }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-[3/4] relative bg-gray-100">
             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <User className="w-20 h-20" />
             </div>
        </div>
        <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-center leading-tight min-h-[3rem] flex items-center justify-center">
                {member.nama}
            </CardTitle>
            <CardDescription className="text-center font-medium text-primary">
                {member.jabatan}
            </CardDescription>
        </CardHeader>
    </Card>
);

export default function PemerintahanPage() {
    const [officials, setOfficials] = useState<GovernmentOfficial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchOfficials = async () => {
            try {
                const response = await fetch("/api/pemerintah", { signal: controller.signal });
                if (response.ok) {
                    const data = await response.json();
                    setOfficials(data.data || []);
                }
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") return;
                console.error("Failed to fetch officials:", error);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchOfficials();

        return () => {
            controller.abort();
        };
    }, []);

    // Group officials by role for better display
    const lurah = officials.find(o => o.jabatan.toLowerCase() === "lurah");
    const carik = officials.find(o => o.jabatan.toLowerCase() === "carik");
    const kasiKaur = officials.filter(o => 
        (o.jabatan.toLowerCase().includes("kaur") || o.jabatan.toLowerCase().includes("kasi") || 
         o.jabatan.toLowerCase().includes("ulu-ulu") || o.jabatan.toLowerCase().includes("kamituwa") ||
         o.jabatan.toLowerCase().includes("jagabaya")) && 
        o.id !== lurah?.id && o.id !== carik?.id
    );
    const dukuh = officials.filter(o => o.jabatan.toLowerCase().includes("dukuh"));
    const staff = officials.filter(o => o.jabatan.toLowerCase().includes("staff"));

    // BPKal Data
    const bpkalMembers = [
        { nama: "drh. Yoyong Wahyono", jabatan: "Ketua", foto: null },
        { nama: "Sayun, S.Ag., M.Si.", jabatan: "Wakil Ketua", foto: null },
        { nama: "Ngudah Khusnul Hayati, SE", jabatan: "Sekretaris", foto: null },
        { nama: "Aman Santosa, S.Pd.", jabatan: "Anggota", foto: null },
        { nama: "Haryono", jabatan: "Anggota", foto: null },
        { nama: "R. A. Andrijanto", jabatan: "Anggota", foto: null },
        { nama: "Sugiharto, B.Sc., S.Pd.", jabatan: "Anggota", foto: null },
        { nama: "Untari Sahban, S.Pd.", jabatan: "Anggota", foto: null },
        { nama: "Suyanto, BA.", jabatan: "Anggota", foto: null },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Title */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                    <Building className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Pemerintahan Kalurahan Trimulyo</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Struktur organisasi dan profil aparatur pemerintah Kalurahan Trimulyo
                </p>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-500">Memuat data aparatur...</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Lurah & Carik */}
                    <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
                        {lurah && <OfficialCard official={lurah} className="w-full md:w-80 border-blue-200 bg-blue-50/50" />}
                        {carik && <OfficialCard official={carik} className="w-full md:w-80 border-green-200 bg-green-50/50" />}
                    </div>

                    {/* Kasi & Kaur */}
                    {kasiKaur.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                                <Award className="w-6 h-6 text-primary" />
                                Pelaksana Teknis & Kewilayahan
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {kasiKaur.map((official) => (
                                    <OfficialCard key={official.id} official={official} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dukuh */}
                    {dukuh.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                                <Users className="w-6 h-6 text-primary" />
                                Dukuh
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {dukuh.map((official) => (
                                    <OfficialCard key={official.id} official={official} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Staff */}
                    {staff.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                                <FileText className="w-6 h-6 text-primary" />
                                Staff Pamong
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {staff.map((official) => (
                                    <OfficialCard key={official.id} official={official} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BPKal Section */}
                    <div className="pt-16 border-t">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full mb-4 shadow-sm border border-amber-100">
                                <Image 
                                    src="/images/bpkal.webp" 
                                    alt="Logo BPKal" 
                                    width={60} 
                                    height={60} 
                                    className="object-contain"
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Badan Permusyawaratan Kalurahan (BPKal)</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Mitra kerja Pemerintah Kalurahan dalam penyelenggaraan pemerintahan kalurahan
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center max-w-7xl mx-auto">
                            {bpkalMembers.map((member, index) => (
                                <BPKalCard key={index} member={member} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
