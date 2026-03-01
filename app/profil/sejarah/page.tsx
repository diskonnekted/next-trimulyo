import Link from "next/link";
import { History, ArrowLeft, Calendar, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SejarahPage() {
    // Historical data from Maklumat Nomor 16 tahun 1946
    const sejarahData = {
        tahunMaklumat: "1946",
        nomorMaklumat: "16",
        deskripsi:
            "Berdasarkan Maklumat Nomor 16 Tahun 1946 Daerah Istimewa Negara Republik Indonesia Yogyakarta (Kasultanan dan Paku Alaman) tertanggal 11 April 1946, wilayah Kapanewon Sleman melaksanakan penggabungan 3 Kalurahan lama menjadi Kalurahan Trimulyo, yaitu:",
        kalurahanLama: [
            {
                nama: "Kalurahan Polowidi",
                dusun: ["Pepen", "Kadisobo 1", "Kadisobo 2", "Kalangan", "Ngemplak Polowidi", "Polowidi", "Klegen", "Pendeman"],
                pusatPemerintahan: "Polowidi",
            },
            {
                nama: "Kalurahan Kepitu",
                dusun: ["Mantaran", "Balong", "Jogokerten", "Blunyah", "Kepitu", "Kepanjen", "Karang"],
                pusatPemerintahan: "Kepitu",
            },
            {
                nama: "Kalurahan Pambregan",
                dusun: ["Pambregan", "Tegalsari", "Klelen", "Sidomulyo", "Kalirase"],
                pusatPemerintahan: "Pambregan",
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Back button */}
            <Link href="/profil">
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali ke Profil Kalurahan
                </Button>
            </Link>

            {/* Page Title */}
            <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                    <History className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Sejarah Kalurahan Trimulyo</h1>
                <p className="text-xl text-gray-600">
                    Menelusuri perjalanan panjang Kalurahan Trimulyo dari masa ke masa
                </p>
            </div>

            {/* Main Content */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Asal-usul Pembentukan Kalurahan</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Historical Reference */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    Maklumat Nomor 16 Tahun 1946
                                </h3>
                                <p className="text-sm text-blue-800">
                                    <span className="font-medium">
                                        Tanggal: 11 April {sejarahData.tahunMaklumat}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 text-center max-w-4xl mx-auto">{sejarahData.deskripsi}</p>

                    {/* The Former Kalurahans */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {sejarahData.kalurahanLama.map((kalurahan, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-xl font-bold text-gray-900">{kalurahan.nama}</h3>
                                </div>

                                {/* Daftar Dusun */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Wilayah / Dusun:</h4>
                                    <div className="space-y-1">
                                        {kalurahan.dusun.map((dusun, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{dusun}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
