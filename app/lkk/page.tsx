"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Activity, Heart, Award } from "lucide-react";

// RT/RW Data
const rtrwData = [
    { no: 1, padukuhan: "Kadisobo 1/Pepen", rw: ["RW 01", "RW 02"], rt: ["RT 01,02", "RT 03,04,05"] },
    { no: 2, padukuhan: "Kadisobo 2", rw: ["RW 03", "RW 04"], rt: ["RT 01,02", "RT 03,04"] },
    { no: 3, padukuhan: "Ngemplak Polowidi/Kalangan", rw: ["RW 05", "RW 06"], rt: ["RT 01,02", "RT 03,04"] },
    { no: 4, padukuhan: "Polowidi/Klegen", rw: ["RW 07", "RW 08"], rt: ["RT 01,02", "RT 03,04"] },
    { no: 5, padukuhan: "Pendeman", rw: ["RW 09", "RW 10"], rt: ["RT 01,02, 05", "RT 03,04"] },
    { no: 6, padukuhan: "Mantaran/Balong", rw: ["RW 11", "RW 12"], rt: ["RT 01,02, 03", "RT 04,05"] },
    { no: 7, padukuhan: "Jogokerten", rw: ["RW 13", "RW 14"], rt: ["RT 01,02, 05", "RT 03,04"] },
    { no: 8, padukuhan: "Blunyah", rw: ["RW 15", "RW 16"], rt: ["RT 01,02", "RT 03,04"] },
    { no: 9, padukuhan: "Kepitu", rw: ["RW 17", "RW 18"], rt: ["RT 01,02", "RT 03,04,05"] },
    { no: 10, padukuhan: "Karang/Kepanjen", rw: ["RW 19", "RW 20"], rt: ["RT 01,02, 03", "RT 04,05"] },
    { no: 11, padukuhan: "Pambregan", rw: ["RW 21", "RW 22"], rt: ["RT 01,02", "RT 03,04"] },
    { no: 12, padukuhan: "Klelen/Tegalsari", rw: ["RW 23", "RW 24", "RW 25"], rt: ["RT 01,02", "RT 03,04", "RT 05,06,07"] },
    { no: 13, padukuhan: "Sidomulyo", rw: ["RW 26", "RW 27", "RW 28"], rt: ["RT 01,02", "RT 03,04", "RT 05,06,07"] },
    { no: 14, padukuhan: "Kalirase", rw: ["RW 29", "RW 30"], rt: ["RT 01,02", "RT 03,04"] },
];

// Karang Taruna Data
const karangTarunaPengurus = [
    { jabatan: "KETUA UMUM", nama: "SAKTI INDRA W" },
    { jabatan: "KETUA I", nama: "ANISSA NUR" },
    { jabatan: "KETUA II", nama: "YUSUF FEBRIANSYAH" },
    { jabatan: "SEKRETARIS I", nama: "AGUSTINA DIAH K" },
    { jabatan: "SEKRETARIS II", nama: "NABILA" },
    { jabatan: "BENDAHARA I", nama: "EVITA" },
    { jabatan: "BENDAHARA II", nama: "ADI RIVANTO" },
];

const karangTarunaDepartemen = [
    {
        nama: "DEPARTEMEN KEROHANIAN DAN PEMHINAAN MENTAL",
        anggota: ["Alfiano Dwi Y- Blunyah", "Fitria Nurul –", "Dea NuR"],
    },
    {
        nama: "DEPARTEMEN KESENIAN & PARIWISATA",
        anggota: ["Anja- Balong", "Luknian – Balong", "Aziz – Balong", "Mata w – Karang", "Sidik Purnomo — Pendeman", "Nur Isnaini – Pendeman"],
    },
    {
        nama: "DEPARTEMEN KEWIRAUSAHAAN",
        anggota: ["Ilham — Sidomulyo Tegal", "Tika – Blunyah", "Ryan Pratama —"],
    },
    {
        nama: "DEPARTEMEN OLAHRAGA",
        anggota: [
            "Hasnan — Polowidi", "Febriana — Sidomulyo Tegal", "Dadang –", "Ikhsan – Balong",
            "Riski — Balong", "Fitria Nur —", "Anggi — Sidomulyo", "Ragil", "Susilo",
            "Rout — Sidomulyo", "Fajar — Sidomuly", "Ipin — Klegen", "Rukma— Pendeman",
            "Nevtavia—", "Nofia"
        ],
    },
    {
        nama: "DEPARTEMEN KESEJAHTERAAN SOSIAL",
        anggota: ["Aisyah Ria –", "Nadya Sekar -Karang", "Mata K – Karang", "Hanifah Rahma – Karang", "Ravisena— Klegen"],
    },
    {
        nama: "DEPARTEMEN PENGEMBANGAN DAN PEMBERDAYAAN MASYARAKAT",
        anggota: ["Anas Fauzi – Kepanjen"],
    },
    {
        nama: "DEPARTEMEN KEORGANISASIAN DAN INFORMATIKA",
        anggota: ["Anton — Polowidi"],
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
    { no: "I", jabatan: "Ketua", nama: "Fatah Ariyanto" },
    { no: "II", jabatan: "Wakil Ketua", nama: "Hardiyana, SH" },
    { no: "III", jabatan: "Sekretaris", nama: "1. Muh Nur Susilo\n2. Agus Sudirman" },
    { no: "IV", jabatan: "Bendahara", nama: "1. Edi Purwoko\n2. Drs. Bujang Sabri, M.Pd." },
    { no: "V", jabatan: "Seksi Keamanan dan Kesejahteraan Masyarakat", nama: "1. Yuliyanto\n2. Kasiyono\n3. Faisol Najib" },
    { no: "VI", jabatan: "Seksi Perlindungan Masyarakat dan Kesatuan Bangsa", nama: "1. H. Sutrismanto\n2. Walijo, S.Pd.\n3. C. Sugiarto\n4. Suyanto, BA" },
    { no: "VII", jabatan: "Seksi Pendidikan, Pemuda, Olahraga dan Kesenian", nama: "1. H. Muhardi\n2. Danu Yulisdiantara\n3. Fx. Sumini\n4. Iwan Yulianto" },
    { no: "VIII", jabatan: "Seksi Ekonomi dan Pembangunan", nama: "1. Th. Herwadi\n2. Indri Widarto\n3. Candra Karoni, S.Pd.\n4. Murjito" },
    { no: "IX", jabatan: "Seksi Kesehatan, Pemberdayaan Perempuan, Anak dan Remaja", nama: "1. Wartini\n2. Sulastri\n3. Istiqomah" },
];

export default function LKKPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Lembaga Kemasyarakatan Kalurahan (LKK)</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Mitra Pemerintah Kalurahan dalam memberdayakan masyarakat
                </p>
            </div>

            <Tabs defaultValue="rtrw" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="rtrw" className="py-3">RT & RW</TabsTrigger>
                    <TabsTrigger value="karangtaruna" className="py-3">Karang Taruna</TabsTrigger>
                    <TabsTrigger value="posyandu" className="py-3">Posyandu</TabsTrigger>
                    <TabsTrigger value="lpmk" className="py-3">LPMK</TabsTrigger>
                </TabsList>

                {/* RT & RW Content */}
                <TabsContent value="rtrw" className="mt-8">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 w-24 h-24 relative">
                                <Image src="/images/rt.png" alt="Logo RT RW" fill className="object-contain" />
                            </div>
                            <CardTitle>Daftar RT/RW Kalurahan Trimulyo</CardTitle>
                            <CardDescription>
                                Wilayah Kalurahan Trimulyo terdiri dari 14 Padukuhan, terdiri dari 30 Rukun Warga (RW) dan 68 Rukun Tangga (RT)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">No</TableHead>
                                            <TableHead>Nama Padukuhan</TableHead>
                                            <TableHead>RW</TableHead>
                                            <TableHead>RT</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rtrwData.map((item) => (
                                            <TableRow key={item.no}>
                                                <TableCell className="font-medium">{item.no}</TableCell>
                                                <TableCell>{item.padukuhan}</TableCell>
                                                <TableCell>
                                                    {item.rw.map((rw, idx) => (
                                                        <div key={idx}>{rw}</div>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    {item.rt.map((rt, idx) => (
                                                        <div key={idx}>{rt}</div>
                                                    ))}
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
                <TabsContent value="karangtaruna" className="mt-8">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 w-24 h-24 relative">
                                <Image src="/images/karangtaruna.jpg" alt="Logo Karang Taruna" fill className="object-contain" />
                            </div>
                            <CardTitle>Karang Taruna Tri Wira Manunggal</CardTitle>
                            <CardDescription>Periode 2022-2027</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-8 md:grid-cols-2">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                                        <Users className="w-5 h-5" /> Pengurus Inti
                                    </h3>
                                    <div className="space-y-3">
                                        {karangTarunaPengurus.map((pengurus, idx) => (
                                            <div key={idx} className="flex justify-between border-b pb-2">
                                                <span className="font-medium text-gray-600">{pengurus.jabatan}</span>
                                                <span className="font-bold">{pengurus.nama}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                                        <Activity className="w-5 h-5" /> Departemen
                                    </h3>
                                    <div className="space-y-6">
                                        {karangTarunaDepartemen.map((dept, idx) => (
                                            <div key={idx}>
                                                <h4 className="font-bold text-gray-800 mb-2">{dept.nama}</h4>
                                                <ul className="list-disc list-inside text-gray-600 text-sm">
                                                    {dept.anggota.map((anggota, i) => (
                                                        <li key={i}>{anggota}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Posyandu Content */}
                <TabsContent value="posyandu" className="mt-8">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 w-24 h-24 relative">
                                <Image src="/images/posyandu.png" alt="Logo Posyandu" fill className="object-contain" />
                            </div>
                            <CardTitle>Pokja Posyandu Kalurahan Trimulyo</CardTitle>
                            <CardDescription>Periode 2022-2027</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">No</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Jabatan</TableHead>
                                            <TableHead>Unsur</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {posyanduPengurus.map((item) => (
                                            <TableRow key={item.no}>
                                                <TableCell className="font-medium">{item.no}</TableCell>
                                                <TableCell className="font-bold">{item.nama}</TableCell>
                                                <TableCell>{item.jabatan}</TableCell>
                                                <TableCell>{item.unsur}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* LPMK Content */}
                <TabsContent value="lpmk" className="mt-8">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 w-24 h-24 relative">
                                <Image src="/images/lpmk.png" alt="Logo LPMK" fill className="object-contain" />
                            </div>
                            <CardTitle>Lembaga Pemberdayaan Masyarakat Kalurahan (LPMK)</CardTitle>
                            <CardDescription>Periode 2022-2027</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">No</TableHead>
                                            <TableHead>Jabatan</TableHead>
                                            <TableHead>Nama</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lpmkPengurus.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium align-top">{item.no}</TableCell>
                                                <TableCell className="align-top font-semibold">{item.jabatan}</TableCell>
                                                <TableCell className="whitespace-pre-line">{item.nama}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
