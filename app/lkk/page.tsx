"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Activity, Heart, Award, MapPin, Building2, UserCircle2, ShieldCheck, Briefcase, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

// RT/RW Data
const rtrwData = [
    { no: 1, padukuhan: "Kadisobo 1/Pepen", rw: ["RW 01", "RW 02"], rt: ["RT 01, 02", "RT 03, 04, 05"] },
    { no: 2, padukuhan: "Kadisobo 2", rw: ["RW 03", "RW 04"], rt: ["RT 01, 02", "RT 03, 04"] },
    { no: 3, padukuhan: "Ngemplak Polowidi/Kalangan", rw: ["RW 05", "RW 06"], rt: ["RT 01, 02", "RT 03, 04"] },
    { no: 4, padukuhan: "Polowidi/Klegen", rw: ["RW 07", "RW 08"], rt: ["RT 01, 02", "RT 03, 04"] },
    { no: 5, padukuhan: "Pendeman", rw: ["RW 09", "RW 10"], rt: ["RT 01, 02, 05", "RT 03, 04"] },
    { no: 6, padukuhan: "Mantaran/Balong", rw: ["RW 11", "RW 12"], rt: ["RT 01, 02, 03", "RT 04, 05"] },
    { no: 7, padukuhan: "Jogokerten", rw: ["RW 13", "RW 14"], rt: ["RT 01, 02, 05", "RT 03, 04"] },
    { no: 8, padukuhan: "Blunyah", rw: ["RW 15", "RW 16"], rt: ["RT 01, 02", "RT 03, 04"] },
    { no: 9, padukuhan: "Kepitu", rw: ["RW 17", "RW 18"], rt: ["RT 01, 02", "RT 03, 04, 05"] },
    { no: 10, padukuhan: "Karang/Kepanjen", rw: ["RW 19", "RW 20"], rt: ["RT 01, 02, 03", "RT 04, 05"] },
    { no: 11, padukuhan: "Pambregan", rw: ["RW 21", "RW 22"], rt: ["RT 01, 02", "RT 03, 04"] },
    { no: 12, padukuhan: "Klelen/Tegalsari", rw: ["RW 23", "RW 24", "RW 25"], rt: ["RT 01, 02", "RT 03, 04", "RT 05, 06, 07"] },
    { no: 13, padukuhan: "Sidomulyo", rw: ["RW 26", "RW 27", "RW 28"], rt: ["RT 01, 02", "RT 03, 04", "RT 05, 06, 07"] },
    { no: 14, padukuhan: "Kalirase", rw: ["RW 29", "RW 30"], rt: ["RT 01, 02", "RT 03, 04"] },
];

// Karang Taruna Data
const karangTarunaPengurus = [
    { jabatan: "Ketua Umum", nama: "Sakti Indra W" },
    { jabatan: "Ketua I", nama: "Anissa Nur" },
    { jabatan: "Ketua II", nama: "Yusuf Febriansyah" },
    { jabatan: "Sekretaris I", nama: "Agustina Diah K" },
    { jabatan: "Sekretaris II", nama: "Nabila" },
    { jabatan: "Bendahara I", nama: "Evita" },
    { jabatan: "Bendahara II", nama: "Adi Rivanto" },
];

const karangTarunaDepartemen = [
    {
        nama: "Kerohanian & Pembinaan Mental",
        anggota: ["Alfiano Dwi Y- Blunyah", "Fitria Nurul", "Dea Nur"],
        icon: <Heart className="w-4 h-4" />
    },
    {
        nama: "Kesenian & Pariwisata",
        anggota: ["Anja- Balong", "Lukman – Balong", "Aziz – Balong", "Mata W – Karang", "Sidik Purnomo — Pendeman", "Nur Isnaini – Pendeman"],
        icon: <Activity className="w-4 h-4" />
    },
    {
        nama: "Kewirausahaan",
        anggota: ["Ilham — Sidomulyo Tegal", "Tika – Blunyah", "Ryan Pratama"],
        icon: <Briefcase className="w-4 h-4" />
    },
    {
        nama: "Olahraga",
        anggota: [
            "Hasnan — Polowidi", "Febriana — Sidomulyo Tegal", "Dadang", "Ikhsan – Balong",
            "Riski — Balong", "Fitria Nur", "Anggi — Sidomulyo", "Ragil", "Susilo",
            "Rout — Sidomulyo", "Fajar — Sidomulyo", "Ipin — Klegen", "Rukma— Pendeman",
            "Nevtavia", "Nofia"
        ],
        icon: <Activity className="w-4 h-4" />
    },
    {
        nama: "Kesejahteraan Sosial",
        anggota: ["Aisyah Ria", "Nadya Sekar - Karang", "Mata K – Karang", "Hanifah Rahma – Karang", "Ravisena— Klegen"],
        icon: <Heart className="w-4 h-4" />
    },
    {
        nama: "Pengembangan & Pemberdayaan Masyarakat",
        anggota: ["Anas Fauzi – Kepanjen"],
        icon: <Users className="w-4 h-4" />
    },
    {
        nama: "Keorganisasian & Informatika",
        anggota: ["Anton — Polowidi"],
        icon: <Award className="w-4 h-4" />
    },
];

// Posyandu Data
const posyanduPengurus = [
    { no: 1, nama: "CHOLIK HARMOKO, S.TP", jabatan: "Penanggungjawab", unsur: "Lurah" },
    { no: 2, nama: "SURAHMAN, A.Md.", jabatan: "Pembina", unsur: "Kamituwa" },
    { no: 3, nama: "IDA KRISMIYATI", jabatan: "Ketua", unsur: "Kader Posyandu" },
    { no: 4, nama: "SULASTRI", jabatan: "Wakil Ketua", unsur: "Kader Posyandu" },
    { no: 5, nama: "WARTINI", jabatan: "Sekretaris", unsur: "Kader Posyandu" },
    { no: 6, nama: "ETI WIDAYANI", jabatan: "Bendahara", unsur: "Kader Posyandu" },
    { no: 7, nama: "ENDAH TRIYUNINGSIH", jabatan: "Pelaksana Teknis Bidang Gizi", unsur: "Kader Posyandu" },
    { no: 8, nama: "KUTSIYAH", jabatan: "Pelaksana Teknis Bidang Imunisasi", unsur: "Kader Posyandu" },
    { no: 9, nama: "SITI MARDIYAH", jabatan: "Pelaksana Teknis Bidang KB", unsur: "Kader Posyandu" },
    { no: 10, nama: "SRI LESTARI", jabatan: "Pelaksana Teknis Bidang Pencegahan Penyakit", unsur: "Kader Posyandu" },
    { no: 11, nama: "ISTIQOMAH NUR ROHMAN", jabatan: "Pelaksana Teknis Bidang Kesehatan Ibu dan Anak", unsur: "Kader Posyandu" },
    { no: 12, nama: "SRI SUDARMI", jabatan: "Pelaksana Teknis Bidang Pengembangan Ekonomi", unsur: "Kader Posyandu" },
    { no: 13, nama: "SRI MULYATI", jabatan: "Pelaksana Teknis Bidang Pengembangan Ekonomi", unsur: "Kader Posyandu" },
];

// LPMK Data
const lpmkPengurus = [
    { no: "I", jabatan: "Ketua", nama: "Fatah Ariyanto", icon: <UserCircle2 className="w-4 h-4" /> },
    { no: "II", jabatan: "Wakil Ketua", nama: "Hardiyana, SH", icon: <UserCircle2 className="w-4 h-4" /> },
    { no: "III", jabatan: "Sekretaris", nama: "1. Muh Nur Susilo\n2. Agus Sudirman", icon: <UserCircle2 className="w-4 h-4" /> },
    { no: "IV", jabatan: "Bendahara", nama: "1. Edi Purwoko\n2. Drs. Bujang Sabri, M.Pd.", icon: <UserCircle2 className="w-4 h-4" /> },
    { no: "V", jabatan: "Keamanan & Kesmas", nama: "1. Yuliyanto\n2. Kasiyono\n3. Faisol Najib", icon: <ShieldCheck className="w-4 h-4" /> },
    { no: "VI", jabatan: "Linmas & Kesbang", nama: "1. H. Sutrismanto\n2. Walijo, S.Pd.\n3. C. Sugiarto\n4. Suyanto, BA", icon: <ShieldCheck className="w-4 h-4" /> },
    { no: "VII", jabatan: "Pendidikan & Seni", nama: "1. H. Muhardi\n2. Danu Yulisdiantara\n3. FX. Sumini\n4. Iwan Yulianto", icon: <Award className="w-4 h-4" /> },
    { no: "VIII", jabatan: "Ekonomi & Pembangunan", nama: "1. Th. Herwadi\n2. Indri Widarto\n3. Candra Karoni, S.Pd.\n4. Murjito", icon: <Briefcase className="w-4 h-4" /> },
    { no: "IX", jabatan: "Kesehatan & Pemberdayaan", nama: "1. Wartini\n2. Sulastri\n3. Istiqomah", icon: <Heart className="w-4 h-4" /> },
];

export default function LKKPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
                        <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Lembaga Kemasyarakatan Kalurahan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Mitra strategis Pemerintah Kalurahan Trimulyo dalam upaya pemberdayaan masyarakat dan pembangunan partisipatif.
                    </p>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">14</div>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Padukuhan</div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">30</div>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Rukun Warga</div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">68</div>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Rukun Tangga</div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">4</div>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Lembaga Utama</div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="rtrw" className="w-full">
                    <TabsList className="flex flex-wrap md:grid md:grid-cols-4 gap-2 bg-transparent p-0 mb-12 h-auto">
                        <TabsTrigger 
                            value="rtrw" 
                            className="flex-1 py-4 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl border border-gray-200 bg-white transition-all duration-300"
                        >
                            <MapPin className="w-4 h-4 mr-2" />
                            RT & RW
                        </TabsTrigger>
                        <TabsTrigger 
                            value="karangtaruna" 
                            className="flex-1 py-4 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl border border-gray-200 bg-white transition-all duration-300"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Karang Taruna
                        </TabsTrigger>
                        <TabsTrigger 
                            value="posyandu" 
                            className="flex-1 py-4 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl border border-gray-200 bg-white transition-all duration-300"
                        >
                            <Stethoscope className="w-4 h-4 mr-2" />
                            Posyandu
                        </TabsTrigger>
                        <TabsTrigger 
                            value="lpmk" 
                            className="flex-1 py-4 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl border border-gray-200 bg-white transition-all duration-300"
                        >
                            <Building2 className="w-4 h-4 mr-2" />
                            LPMK
                        </TabsTrigger>
                    </TabsList>

                    {/* RT & RW Content */}
                    <TabsContent value="rtrw" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-xl overflow-hidden bg-white">
                            <div className="bg-primary/5 p-8 border-b border-primary/10">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="w-24 h-24 relative shrink-0 bg-white p-2 rounded-2xl shadow-md border border-primary/5">
                                        <Image src="/images/rt.png" alt="Logo RT RW" fill className="object-contain" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Administrasi Wilayah</CardTitle>
                                        <CardDescription className="text-gray-600 max-w-2xl text-base">
                                            Kalurahan Trimulyo mengelola tata wilayah yang terorganisir melalui 14 Padukuhan dengan sinergi antara pengurus RW dan RT.
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-gray-50/50">
                                            <TableRow>
                                                <TableHead className="w-[80px] text-center font-bold">NO</TableHead>
                                                <TableHead className="font-bold">PADUKUHAN</TableHead>
                                                <TableHead className="font-bold">UNIT RW</TableHead>
                                                <TableHead className="font-bold">DAFTAR RT</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rtrwData.map((item) => (
                                                <TableRow key={item.no} className="hover:bg-primary/5 transition-colors">
                                                    <TableCell className="text-center font-semibold text-primary">{item.no}</TableCell>
                                                    <TableCell className="font-bold text-gray-800">{item.padukuhan}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.rw.map((rw, idx) => (
                                                                <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                                                    {rw}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.rt.map((rt, idx) => (
                                                                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                    {rt}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Karang Taruna Content */}
                    <TabsContent value="karangtaruna" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-xl overflow-hidden bg-white">
                            <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="w-24 h-24 relative shrink-0 bg-white p-2 rounded-2xl shadow-xl">
                                        <Image src="/images/karangtaruna.jpg" alt="Logo Karang Taruna" fill className="object-contain" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <CardTitle className="text-2xl md:text-3xl font-bold mb-2">Karang Taruna Tri Wira Manunggal</CardTitle>
                                        <CardDescription className="text-blue-100 text-base font-medium">
                                            Membangun generasi muda yang tangguh, mandiri, dan berjiwa sosial (Periode 2022-2027)
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <div className="grid gap-12 lg:grid-cols-3">
                                    {/* Pengurus Inti */}
                                    <div className="lg:col-span-1">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Users className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Pengurus Inti</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {karangTarunaPengurus.map((pengurus, idx) => (
                                                <div key={idx} className="group p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100">
                                                    <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">{pengurus.jabatan}</div>
                                                    <div className="text-lg font-bold text-gray-800">{pengurus.nama}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Departemen */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Activity className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Struktur Departemen</h3>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {karangTarunaDepartemen.map((dept, idx) => (
                                                <Card key={idx} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden group">
                                                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3 group-hover:bg-blue-50 transition-colors">
                                                        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                                                            {dept.icon}
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 leading-tight">{dept.nama}</h4>
                                                    </div>
                                                    <CardContent className="p-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {dept.anggota.map((anggota, i) => (
                                                                <span key={i} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                                    {anggota}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Posyandu Content */}
                    <TabsContent value="posyandu" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-xl overflow-hidden bg-white">
                            <div className="bg-emerald-600 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="w-24 h-24 relative shrink-0 bg-white p-2 rounded-2xl shadow-xl">
                                        <Image src="/images/posyandu.png" alt="Logo Posyandu" fill className="object-contain" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <CardTitle className="text-2xl md:text-3xl font-bold mb-2">Pokja Posyandu Kalurahan Trimulyo</CardTitle>
                                        <CardDescription className="text-emerald-100 text-base font-medium">
                                            Layanan kesehatan dasar terintegrasi untuk masyarakat (Periode 2022-2027)
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-gray-50/50">
                                            <TableRow>
                                                <TableHead className="w-[80px] text-center font-bold uppercase tracking-wider text-xs">No</TableHead>
                                                <TableHead className="font-bold uppercase tracking-wider text-xs">Nama Lengkap</TableHead>
                                                <TableHead className="font-bold uppercase tracking-wider text-xs">Jabatan Organisasi</TableHead>
                                                <TableHead className="font-bold uppercase tracking-wider text-xs">Asal Unsur</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {posyanduPengurus.map((item) => (
                                                <TableRow key={item.no} className="hover:bg-emerald-50/50 transition-colors">
                                                    <TableCell className="text-center font-medium text-emerald-700">{item.no}</TableCell>
                                                    <TableCell className="font-bold text-gray-900">{item.nama}</TableCell>
                                                    <TableCell>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                            {item.jabatan}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600 italic">{item.unsur}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LPMK Content */}
                    <TabsContent value="lpmk" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-xl overflow-hidden bg-white">
                            <div className="bg-amber-600 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="w-24 h-24 relative shrink-0 bg-white p-2 rounded-2xl shadow-xl">
                                        <Image src="/images/lpmk.png" alt="Logo LPMK" fill className="object-contain" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <CardTitle className="text-2xl md:text-3xl font-bold mb-2">Lembaga Pemberdayaan Masyarakat Kalurahan</CardTitle>
                                        <CardDescription className="text-amber-100 text-base font-medium">
                                            Wadah aspirasi dalam perencanaan dan pelaksanaan pembangunan (Periode 2022-2027)
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {lpmkPengurus.map((item, idx) => (
                                        <Card key={idx} className="border border-gray-100 shadow-sm hover:border-amber-200 transition-all group overflow-hidden">
                                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between group-hover:bg-amber-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm">
                                                        {item.icon}
                                                    </div>
                                                    <h4 className="font-bold text-gray-800 uppercase tracking-tight text-sm">{item.jabatan}</h4>
                                                </div>
                                                <span className="text-xs font-black text-amber-300 group-hover:text-amber-400">{item.no}</span>
                                            </div>
                                            <CardContent className="p-5">
                                                <div className="whitespace-pre-line text-gray-700 font-semibold leading-relaxed">
                                                    {item.nama}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                
                {/* Footer Note */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                        <Award className="w-4 h-4 text-primary" />
                        Sinergi Membangun Trimulyo yang Mandiri & Sejahtera
                    </div>
                </div>
            </div>
        </div>
    );
}

