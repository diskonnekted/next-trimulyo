"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, Users, Building } from "lucide-react";

export default function SejarahPage() {
    const lurahList = [
        { nama: "Bapak Rais Tedjohartono", periode: "1946 - 1952" },
        { nama: "Bapak R Sastro Sudarmo", periode: "1953 - 1976" },
        { nama: "Bapak HMR Soebarno Sastrosudarmo", periode: "1976 - 2004" },
        { nama: "Bapak Bambang Basuki Ilyas", periode: "2004 - 2006" },
        { nama: "Bapak Iksan Waluyo, S.Sos (Plt.)", periode: "2007 - 2009" },
        { nama: "Bapak Suhardjono HK, S.Pd.", periode: "2009 - 2021", detail: "Periode I: 2009 - 2015\nPeriode II: 2016 - 2021" },
        { nama: "Ibu Istu Irbarini, S.IP. (Pj.)", periode: "16 Sep 2021 - 15 Nov 2021" },
        { nama: "Bapak Cholik Harmoko, S.TP.", periode: "15 Nov 2021 - Sekarang" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Banner */}
            <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                    src="/images/sampul.jpg"
                    alt="Sejarah Kalurahan Trimulyo"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
                        Sejarah Kalurahan Trimulyo
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Card className="mb-12 shadow-lg">
                    <CardContent className="p-8 space-y-6 text-lg text-gray-700 leading-relaxed">
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Building className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-gray-900">Pembentukan Kalurahan</h2>
                        </div>
                        <p>
                            Berdasarkan maklumat Nomor 16 tahun 1946 Daerah Istimewa Negara Republik Indonesia Yogyakarta (Kasultanan dan Paku Alaman) tertanggal 11/04/1946, maka wilayah Kapanewon Sleman (18 Kalurahan) juga melaksanakan penggabungan 3 Kalurahan lama.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h3 className="font-bold text-blue-800 mb-2">Kalurahan Lama Polowidi</h3>
                                <p className="text-sm">Pepen, Kadisobo 1, Kadisobo 2, Kalangan, Ngemplak Polowidi, Polowidi, Klegen, Pendeman.</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                <h3 className="font-bold text-emerald-800 mb-2">Kalurahan Lama Kepitu</h3>
                                <p className="text-sm">Mantaran, Balong, Jogokerten, Blunyah, Kepitu, Kepanjen, Karang.</p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                <h3 className="font-bold text-amber-800 mb-2">Kalurahan Lama Pambregan</h3>
                                <p className="text-sm">Pambregan, Tegalsari, Klelen, Sidomulyo, Kalirase.</p>
                            </div>
                        </div>

                        <p>
                            Untuk selanjutnya ketiga kalurahan lama meleburkan diri dan bergabung menjadi satu wilayah pemerintahan baru dengan nama <strong>Trimulyo</strong>. Sedangkan pengisian Lurah Kalurahan serta Pamong Kalurahan diatur sesuai dengan maklumat Nomor 15 tahun 1946 tanggal 11/04/1946.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Wilayah Kring */}
                    <Card className="shadow-lg h-full">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 text-primary mb-6">
                                <Users className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900">Wilayah Kring</h2>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                                {[
                                    "Kring Pepen-Kadisobo 1", "Kring Kadisobo 2", "Kring Kalangan-Ngemplak Polowidi",
                                    "Kring Klegen Polowidi", "Kring Pendeman", "Kring Balong Mantaran",
                                    "Kring Jogokerten", "Kring Blunyah", "Kring Kepitu", "Kring Karang Kepanjen",
                                    "Kring Pambregan", "Kring Klelen Tegalsari", "Kring Sidomulyo", "Kring Kalirase"
                                ].map((kring, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                        {kring}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Daftar Lurah */}
                    <Card className="shadow-lg h-full">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 text-primary mb-6">
                                <Clock className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900">Estafet Kepemimpinan</h2>
                            </div>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                {lurahList.map((lurah, idx) => (
                                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-slate-900">{lurah.nama}</div>
                                            </div>
                                            <div className="text-primary font-medium">{lurah.periode}</div>
                                            {lurah.detail && <div className="text-xs text-gray-500 mt-1 whitespace-pre-line">{lurah.detail}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
