"use client";

import { Building, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

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

export default function BPKalPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Title */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full mb-4 shadow-sm border border-amber-100">
                    <Image 
                        src="/images/bpkal.png" 
                        alt="Logo BPKal" 
                        width={60} 
                        height={60} 
                        className="object-contain"
                    />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Badan Permusyawaratan Kalurahan (BPKal)</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Mitra kerja Pemerintah Kalurahan dalam penyelenggaraan pemerintahan kalurahan
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center max-w-7xl mx-auto">
                {bpkalMembers.map((member, index) => (
                    <BPKalCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
}
