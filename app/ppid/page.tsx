"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Calendar, Eye, Download, Shield, Clock, Building, UserCheck, BookOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Fallback loading component
const InformasiPublikDataLoading = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardHeader>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);

// Fallback error component
const InformasiPublikDataNotAvailable = ({ onRetry }: { onRetry: () => void }) => (
    <Card className="p-8">
        <div className="text-center space-y-4">
            <Shield className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
                <p className="text-gray-600">Informasi publik sedang tidak dapat dimuat. Silakan coba lagi nanti.</p>
            </div>
            <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
                Coba Lagi
            </Button>
        </div>
    </Card>
);

interface InformasiPublikItem {
    type: string;
    id: string;
    attributes: {
        config_id?: number;
        satuan?: string | null;
        nama?: string;
        enabled?: number;
        tgl_upload?: string;
        id_pend?: number | null;
        kategori?: string;
        attr?: string;
        tipe?: number;
        url?: string | null;
        gambar?: string | null;
        tahun?: number;
        kategori_info_publik?: number;
        updated_at?: string;
        deleted?: number;
        id_syarat?: number | null;
        id_parent?: number | null;
        created_at?: string;
        created_by?: number | null;
        updated_by?: number | null;
        dok_warga?: number;
        lokasi_arsip?: string;
        keterangan?: string | null;
        status?: string;
        retensi_date?: string | null;
        retensi_number?: string | null;
        retensi_unit?: string | null;
        published_at?: string | null;
        [key: string]: unknown;
    };
}

interface ApiResponse {
    data: InformasiPublikItem[];
    meta?: {
        pagination?: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
        };
    };
    links?: {
        self: string;
        first: string;
        last: string;
    };
}

import { DUMMY_PPID_DATA } from "@/lib/dummy-data";

export default function InformasiPublikPage() {
    const [items, setItems] = useState<InformasiPublikItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<InformasiPublikItem | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/ppid");
            if (!response.ok) {
                console.warn(`Failed to fetch ppid data: ${response.status}, using dummy data`);
                setItems(DUMMY_PPID_DATA.data as unknown as InformasiPublikItem[]);
                setError(null);
                return;
            }
            const data = await response.json();

            // Handle different response structures
            const itemsArray = Array.isArray(data)
                ? data
                : Array.isArray(data.data)
                    ? data.data
                    : [];
            
            if (itemsArray.length === 0) {
                 setItems(DUMMY_PPID_DATA.data as unknown as InformasiPublikItem[]);
            } else {
                 setItems(itemsArray);
            }
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            // Use dummy data on error
            setItems(DUMMY_PPID_DATA.data as unknown as InformasiPublikItem[]);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories for filter
    const categories = Array.isArray(items)
        ? Array.from(new Set(items.map((item) => item.attributes.kategori || "Lainnya")))
        : [];

    // Filter items
    const filteredItems = Array.isArray(items) ? items.filter((item) => {
        const attrs = item.attributes;
        const title = attrs.nama || "";
        const description = attrs.keterangan || "";
        const matchesSearch =
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase());
        const category = attrs.kategori || "Lainnya";
        const matchesCategory = selectedCategory === null || category === selectedCategory;
        return matchesSearch && matchesCategory;
    }) : [];

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getCategoryBadge = (category: string) => {
        const categoryColors: { [key: string]: string } = {
            "Informasi Berkala": "bg-blue-600",
            "Informasi Setiap Saat": "bg-green-600",
            "Informasi Sukarela": "bg-purple-600",
            Lainnya: "bg-gray-600",
        };

        const colorClass = categoryColors[category] || "bg-gray-600";

        return <Badge className={`${colorClass} hover:${colorClass} text-white border-0`}>{category}</Badge>;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4 space-y-8">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                            <Shield className="h-10 w-10 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Informasi Publik</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Pejabat Pengelola Informasi dan Dokumentasi (PPID) - Informasi publik yang dapat diakses
                            oleh masyarakat
                        </p>
                    </div>
                    <InformasiPublikDataLoading />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
                <div className="container mx-auto px-4 space-y-8">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                            <Shield className="h-10 w-10 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Informasi Publik</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Pejabat Pengelola Informasi dan Dokumentasi (PPID) - Informasi publik yang dapat diakses
                            oleh masyarakat
                        </p>
                    </div>
                    <InformasiPublikDataNotAvailable onRetry={fetchData} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        <Shield className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Informasi Publik</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pejabat Pengelola Informasi dan Dokumentasi (PPID) - Informasi publik yang dapat diakses oleh
                        masyarakat sesuai dengan ketentuan UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Informasi */}
                    <Card className="relative overflow-hidden bg-linear-to-br from-blue-200 to-blue-300 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-blue-600">
                            <FileText className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Total Informasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-blue-900 mb-2">{items.length}</div>
                            <p className="text-xs text-blue-700">Dokumen tersedia</p>
                        </CardContent>
                    </Card>

                    {/* Informasi Berkala */}
                    <Card className="relative overflow-hidden bg-linear-to-br from-emerald-200 to-emerald-300 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-emerald-600">
                            <Clock className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Berkala
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-emerald-900 mb-2">
                                {items.filter((i) => i.attributes.kategori === "Informasi Berkala").length}
                            </div>
                            <p className="text-xs text-emerald-700">Dijadwalkan</p>
                        </CardContent>
                    </Card>

                    {/* Informasi Setiap Saat */}
                    <Card className="relative overflow-hidden bg-linear-to-br from-purple-200 to-purple-300 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-purple-600">
                            <Building className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-purple-800 flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                Setiap Saat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-purple-900 mb-2">
                                {items.filter((i) => i.attributes.kategori === "Informasi Setiap Saat").length}
                            </div>
                            <p className="text-xs text-purple-700">Tersedia</p>
                        </CardContent>
                    </Card>

                    {/* Kategori Lainnya */}
                    <Card className="relative overflow-hidden bg-linear-to-br from-amber-200 to-amber-300 border-0">
                        <div className="absolute -top-4 -right-4 opacity-10 text-amber-600">
                            <BookOpen className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Lainnya
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-amber-900 mb-2">
                                {
                                    items.filter(
                                        (i) =>
                                            !["Informasi Berkala", "Informasi Setiap Saat"].includes(
                                                i.attributes.kategori || ""
                                            )
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-amber-700">Berkategori lain</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-8">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Cari dokumen..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap justify-center md:justify-end">
                                <Button
                                    variant={selectedCategory === null ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(null)}
                                    size="sm"
                                    className={cn(
                                        "transition-colors",
                                        selectedCategory === null ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
                                    )}
                                >
                                    Semua
                                </Button>
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        onClick={() => setSelectedCategory(category)}
                                        size="sm"
                                        className={cn(
                                            "transition-colors",
                                            selectedCategory === category
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : ""
                                        )}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Items Grid */}
                {filteredItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                         <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                         <h3 className="text-lg font-semibold text-gray-900">Tidak ada dokumen ditemukan</h3>
                         <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                        {filteredItems.map((item) => {
                            const attrs = item.attributes;
                            const title = attrs.nama || "Tanpa Judul";
                            const description = attrs.keterangan || "Tidak ada deskripsi";
                            const category = attrs.kategori || "Lainnya";
                            const date = attrs.tgl_upload;
                            const image = attrs.gambar;

                            return (
                                <Card
                                    key={item.id}
                                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-gray-200 hover:border-blue-200"
                                >
                                    {/* Cover Image */}
                                    <div className="aspect-[3/4] relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden border-b flex items-center justify-center group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-300">
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="text-center p-4 transition-transform duration-300 group-hover:scale-105">
                                                {category === "Perencanaan & Penganggaran" ? (
                                                    <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                                        <Building className="w-7 h-7 text-blue-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                                        <FileText className="w-7 h-7 text-emerald-600" />
                                                    </div>
                                                )}
                                                <div className="w-8 h-0.5 bg-gray-300 mx-auto rounded-full group-hover:bg-blue-400 transition-colors" />
                                            </div>
                                        )}

                                        {/* Overlay Date */}
                                        <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded text-[9px] font-medium text-gray-700 shadow-sm flex items-center gap-0.5">
                                            <Calendar className="w-2.5 h-2.5" />
                                            {date ? new Date(date).toLocaleDateString("id-ID", { year: 'numeric', month: 'short', day: 'numeric' }) : "-"}
                                        </div>
                                    </div>

                                    <CardContent className="p-2 flex-1 flex flex-col">
                                        <div className="mb-1.5">
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 mb-1 text-[9px] px-1 py-0 leading-none">
                                                {category}
                                            </Badge>
                                            <h3 className="font-bold text-[11px] text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors" title={title}>
                                                {title}
                                            </h3>
                                        </div>

                                        <p className="text-[10px] text-gray-600 line-clamp-2 mb-2 flex-1">
                                            {description}
                                        </p>

                                        <div className="flex gap-1 mt-auto pt-2 border-t border-gray-100">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="w-full h-6 text-[10px] bg-blue-600 hover:bg-blue-700 text-white shadow-sm px-1"
                                                asChild
                                            >
                                                <a href={attrs.satuan || attrs.url || "#"} target="_blank" rel="noopener noreferrer">
                                                    <Download className="w-2.5 h-2.5 mr-0.5" />
                                                    Unduh
                                                </a>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full h-6 text-[10px] border-blue-200 text-blue-700 hover:bg-blue-50 px-1"
                                                asChild
                                            >
                                                <a href={attrs.satuan || attrs.url || "#"} target="_blank" rel="noopener noreferrer">
                                                    <Eye className="w-2.5 h-2.5 mr-0.5" />
                                                    Lihat
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* PPID Info Section */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <UserCheck className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    PPID adalah pejabat yang bertanggung jawab di bidang penyimpanan, pendokumentasian,
                                    penyediaan, dan/atau pelayanan informasi di setiap badan publik. Jika Anda
                                    memerlukan informasi publik yang tidak tersedia di website ini, silakan hubungi kami
                                    melalui mekanisme permintaan informasi publik.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Jenis Informasi:</h4>
                                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                            <li>Informasi Berkala</li>
                                            <li>Informasi Setiap Saat</li>
                                            <li>Informasi Sukarela</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Permohonan Informasi:</h4>
                                        <p className="text-sm text-gray-600">
                                            Dilayani sesuai mekanisme yang diatur dalam Perda Kab. Sleman tentang
                                            Keterbukaan Informasi Publik
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PDF Viewer Modal */}
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
                            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                                <div>
                                    <CardTitle className="text-lg line-clamp-1">{selectedItem.attributes.nama}</CardTitle>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedItem.attributes.kategori} • {selectedItem.attributes.tahun || "-"}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
                                    <span className="sr-only">Close</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-auto p-0 bg-gray-100 relative">
                                {selectedItem.attributes.satuan || selectedItem.attributes.url ? (
                                    <iframe
                                        src={selectedItem.attributes.satuan || selectedItem.attributes.url || ""}
                                        className="w-full h-full min-h-[60vh]"
                                        title="Document Viewer"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-4">
                                        <FileText className="w-16 h-16 opacity-50" />
                                        <p>Pratinjau dokumen tidak tersedia</p>
                                        <Button 
                                            variant="outline"
                                            onClick={() => window.open(selectedItem.attributes.satuan || selectedItem.attributes.url || "#", "_blank")}
                                        >
                                            Buka Tautan Eksternal
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                            <div className="p-4 border-t flex justify-end gap-2 bg-white">
                                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                                    Tutup
                                </Button>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => window.open(selectedItem.attributes.satuan || selectedItem.attributes.url || "#", "_blank")}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Unduh Dokumen
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
