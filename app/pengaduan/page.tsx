"use client";

import { MessageSquare, Phone, Mail, AlertTriangle, Clock, CheckCircle, Send, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PengaduanDisplay, PengaduanItem } from "@/components/ui/custom/PengaduanDisplay";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PengaduanPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [newComplaints, setNewComplaints] = useState<PengaduanItem[]>([]);
    const [formData, setFormData] = useState({
        nama: "",
        nik: "",
        noHp: "",
        email: "",
        kategori: "",
        judul: "",
        isi: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, kategori: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            const newComplaint: PengaduanItem = {
                type: "pengaduan",
                id: `new-${Date.now()}`,
                attributes: {
                    config_id: 1,
                    id_pengaduan: null,
                    nik: formData.nik,
                    nama: formData.nama,
                    email: formData.email,
                    telepon: formData.noHp,
                    judul: formData.judul,
                    isi: formData.isi,
                    status: 1, // Menunggu / Diterima
                    foto: null,
                    ip_address: "127.0.0.1",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    child_count: 0,
                    child: []
                }
            };

            setNewComplaints(prev => [newComplaint, ...prev]);
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                nama: "",
                nik: "",
                noHp: "",
                email: "",
                kategori: "",
                judul: "",
                isi: "",
            });
            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                        <MessageSquare className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Pengaduan Masyarakat</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Salurkan aspirasi, keluhan, dan saran Anda untuk kemajuan Kalurahan Trimulyo. Setiap masukan
                        Anda penting bagi kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section - Takes up 2/3 width on large screens */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Complaint Form */}
                        <Card className="border-t-4 border-t-red-600 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <MessageSquare className="h-5 w-5 text-red-600" />
                                    Formulir Pengaduan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <Alert className="bg-green-50 border-green-200 mb-6">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <AlertTitle className="text-green-800">Berhasil Dikirim!</AlertTitle>
                                        <AlertDescription className="text-green-700">
                                            Pengaduan Anda telah kami terima dan akan segera diproses. 
                                            Silakan cek status pengaduan Anda secara berkala.
                                        </AlertDescription>
                                    </Alert>
                                ) : null}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama">Nama Lengkap <span className="text-red-500">*</span></Label>
                                            <Input 
                                                id="nama" 
                                                name="nama"
                                                placeholder="Masukkan nama lengkap" 
                                                required 
                                                value={formData.nama}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nik">NIK (Opsional)</Label>
                                            <Input 
                                                id="nik" 
                                                name="nik"
                                                placeholder="16 digit NIK" 
                                                value={formData.nik}
                                                onChange={handleInputChange}
                                            />
                                            <p className="text-xs text-muted-foreground">Untuk verifikasi warga kalurahan</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="noHp">Nomor WhatsApp <span className="text-red-500">*</span></Label>
                                            <Input 
                                                id="noHp" 
                                                name="noHp"
                                                type="tel"
                                                placeholder="Contoh: 08123456789" 
                                                required 
                                                value={formData.noHp}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email (Opsional)</Label>
                                            <Input 
                                                id="email" 
                                                name="email"
                                                type="email"
                                                placeholder="nama@email.com" 
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kategori">Kategori Laporan <span className="text-red-500">*</span></Label>
                                        <Select onValueChange={handleSelectChange} value={formData.kategori} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih kategori laporan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="infrastruktur">Infrastruktur (Jalan, Jembatan, dll)</SelectItem>
                                                <SelectItem value="pelayanan">Pelayanan Publik</SelectItem>
                                                <SelectItem value="administrasi">Administrasi Kependudukan</SelectItem>
                                                <SelectItem value="keamanan">Keamanan & Ketertiban</SelectItem>
                                                <SelectItem value="sosial">Bantuan Sosial</SelectItem>
                                                <SelectItem value="lainnya">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="judul">Judul Laporan <span className="text-red-500">*</span></Label>
                                        <Input 
                                            id="judul" 
                                            name="judul"
                                            placeholder="Ringkasan singkat laporan Anda" 
                                            required 
                                            value={formData.judul}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="isi">Isi Laporan Lengkap <span className="text-red-500">*</span></Label>
                                        <Textarea 
                                            id="isi" 
                                            name="isi"
                                            placeholder="Jelaskan detail permasalahan, lokasi, dan waktu kejadian..." 
                                            className="min-h-[150px]"
                                            required 
                                            value={formData.isi}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lampiran">Lampiran Foto/Dokumen (Opsional)</Label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                            <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Klik untuk upload atau drag & drop file</p>
                                            <p className="text-xs text-gray-400 mt-1">Maksimal 5MB (JPG, PNG, PDF)</p>
                                            <Input id="lampiran" type="file" className="hidden" />
                                        </div>
                                    </div>

                                    {/* Dummy Captcha */}
                                    <div className="p-4 bg-gray-50 rounded-lg border flex items-center gap-4">
                                        <div className="bg-white px-4 py-2 border rounded font-mono text-lg font-bold tracking-widest select-none bg-grid-pattern">
                                            X7Y9Z
                                        </div>
                                        <Input 
                                            placeholder="Masukkan kode di samping" 
                                            className="w-40"
                                            required
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Clock className="mr-2 h-5 w-5 animate-spin" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Kirim Laporan
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Info - Takes up 1/3 width on large screens */}
                    <div className="space-y-6">
                        {/* Info Cards - Stacked vertically */}
                        <div className="space-y-4">
                            {/* Response Time */}
                            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-red-700 flex items-center gap-2 text-base">
                                        <AlertTriangle className="h-4 w-4" />
                                        Darurat
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Untuk pengaduan yang memerlukan penanganan segera
                                    </p>
                                    <Badge className="bg-red-600">Respon: 1x24 Jam</Badge>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-yellow-700 flex items-center gap-2 text-base">
                                        <Clock className="h-4 w-4" />
                                        Prioritas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Pengaduan yang memerlukan perhatian khusus
                                    </p>
                                    <Badge className="bg-yellow-600">Respon: 3x24 Jam</Badge>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-green-700 flex items-center gap-2 text-base">
                                        <CheckCircle className="h-4 w-4" />
                                        Reguler
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground mb-2">Pengaduan umum dan saran perbaikan</p>
                                    <Badge className="bg-green-600">Respon: 7x24 Jam</Badge>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-blue-700 text-lg">Kontak Kami</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-4 w-4 text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">Hotline Darurat</h4>
                                        <p className="font-bold text-red-600">112</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">Kantor Kalurahan</h4>
                                        <p className="font-bold text-blue-600">0274-xxxxxx</p>
                                        <p className="text-xs text-gray-600">Senin - Jumat, 08:00-15:00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">Email Resmi</h4>
                                        <p className="font-bold text-green-600">trimulyo@slemankab.go.id</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Informasi Penting</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Semua pengaduan akan ditindaklanjuti sesuai prosedur</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Data pribadi pelapor dijaga kerahasiaannya</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Gunakan bahasa yang sopan dan jelas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Sertakan foto/bukti untuk mempercepat penanganan</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Pengaduan Display - Moved to bottom */}
                <div className="pt-8 border-t">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Riwayat Pengaduan Publik</h2>
                    <PengaduanDisplay newItems={newComplaints} />
                </div>
            </div>
        </div>
    );
}
