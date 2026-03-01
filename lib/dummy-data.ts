
export const DUMMY_TOTAL_PENDUDUK = 11629;

// Helper to calculate percentages
const calcPersen = (val: number, total: number) => ((val / total) * 100).toFixed(2);

export const DUMMY_PENDUDUK_DATA = {
    data: [
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
        {
            type: "statistik",
            id: "kk",
            attributes: {
                nama: "KEPALA KELUARGA",
                jumlah: 3500, // Estimate
                laki: 3000,
                perempuan: 500,
                persen: calcPersen(3500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "sementara",
            attributes: {
                nama: "PENDUDUK SEMENTARA",
                jumlah: 150,
                laki: 80,
                perempuan: 70,
                persen: calcPersen(150, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "mutasi",
            attributes: {
                nama: "MUTASI PENDUDUK",
                jumlah: 50,
                laki: 25,
                perempuan: 25,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
    ],
};

export const DUMMY_APBDES_DATA = {
    data: [
        {
            type: "keuangan",
            id: "2025",
            attributes: {
                tahun: "2025",
                pendapatan: {
                    "PENDAPATAN ASLI DESA": {
                        anggaran: "250000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "PADes",
                    },
                    "DANA DESA": {
                        anggaran: "1200000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "DD",
                    },
                    "BAGI HASIL PAJAK & RETRIBUSI": {
                        anggaran: "450000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "PBH",
                    },
                    "ALOKASI DANA DESA": {
                        anggaran: "800000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "ADD",
                    },
                    "LAIN-LAIN PENDAPATAN DESA YANG SAH": {
                        anggaran: "50000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Lainnya",
                    },
                },
                belanja: {
                    "BIDANG PENYELENGGARAAN PEMERINTAHAN DESA": {
                        anggaran: "950000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Pemerintahan",
                    },
                    "BIDANG PELAKSANAAN PEMBANGUNAN DESA": {
                        anggaran: "1100000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Pembangunan",
                    },
                    "BIDANG PEMBINAAN KEMASYARAKATAN": {
                        anggaran: "350000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Pembinaan",
                    },
                    "BIDANG PEMBERDAYAAN MASYARAKAT": {
                        anggaran: "250000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Pemberdayaan",
                    },
                    "BIDANG PENANGGULANGAN BENCANA, DARURAT DAN MENDESAK DESA": {
                        anggaran: "100000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Bencana",
                    },
                },
                pembiayaan: {
                    "PENERIMAAN PEMBIAYAAN": {
                        anggaran: "150000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Penerimaan",
                    },
                    "PENGELUARAN PEMBIAYAAN": {
                        anggaran: "50000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "Pengeluaran",
                    },
                },
                pelaksanaan: {
                    "PENDAPATAN": {
                        anggaran: "2750000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "PENDAPATAN",
                    },
                    "BELANJA": {
                        anggaran: "2750000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "BELANJA",
                    },
                    "PEMBIAYAAN": {
                        anggaran: "100000000",
                        realisasi: 0,
                        persen: 0,
                        judul: "PEMBIAYAAN",
                    }
                },
                laporan: "Laporan Realisasi APBDes Tahun Anggaran 2025",
                updated_at: "2025-01-15T10:00:00Z",
            },
        },
        {
            type: "keuangan",
            id: "2024",
            attributes: {
                tahun: "2024",
                pendapatan: {
                    "PENDAPATAN ASLI DESA": {
                        anggaran: "225000000",
                        realisasi: 230000000,
                        persen: 102.22,
                        judul: "PADes",
                    },
                    "DANA DESA": {
                        anggaran: "1150000000",
                        realisasi: 1150000000,
                        persen: 100,
                        judul: "DD",
                    },
                    "BAGI HASIL PAJAK & RETRIBUSI": {
                        anggaran: "420000000",
                        realisasi: 425000000,
                        persen: 101.19,
                        judul: "PBH",
                    },
                    "ALOKASI DANA DESA": {
                        anggaran: "780000000",
                        realisasi: 780000000,
                        persen: 100,
                        judul: "ADD",
                    },
                    "LAIN-LAIN PENDAPATAN DESA YANG SAH": {
                        anggaran: "45000000",
                        realisasi: 40000000,
                        persen: 88.89,
                        judul: "Lainnya",
                    },
                },
                belanja: {
                    "BIDANG PENYELENGGARAAN PEMERINTAHAN DESA": {
                        anggaran: "900000000",
                        realisasi: 890000000,
                        persen: 98.89,
                        judul: "Pemerintahan",
                    },
                    "BIDANG PELAKSANAAN PEMBANGUNAN DESA": {
                        anggaran: "1050000000",
                        realisasi: 1000000000,
                        persen: 95.24,
                        judul: "Pembangunan",
                    },
                    "BIDANG PEMBINAAN KEMASYARAKATAN": {
                        anggaran: "320000000",
                        realisasi: 310000000,
                        persen: 96.88,
                        judul: "Pembinaan",
                    },
                    "BIDANG PEMBERDAYAAN MASYARAKAT": {
                        anggaran: "230000000",
                        realisasi: 200000000,
                        persen: 86.96,
                        judul: "Pemberdayaan",
                    },
                    "BIDANG PENANGGULANGAN BENCANA, DARURAT DAN MENDESAK DESA": {
                        anggaran: "120000000",
                        realisasi: 50000000,
                        persen: 41.67,
                        judul: "Bencana",
                    },
                },
                pembiayaan: {
                    "PENERIMAAN PEMBIAYAAN": {
                        anggaran: "135000000",
                        realisasi: 135000000,
                        persen: 100,
                        judul: "Penerimaan",
                    },
                    "PENGELUARAN PEMBIAYAAN": {
                        anggaran: "40000000",
                        realisasi: 40000000,
                        persen: 100,
                        judul: "Pengeluaran",
                    },
                },
                pelaksanaan: {
                    "PENDAPATAN": {
                        anggaran: "2620000000",
                        realisasi: 2625000000,
                        persen: 100.19,
                        judul: "PENDAPATAN",
                    },
                    "BELANJA": {
                        anggaran: "2620000000",
                        realisasi: 2450000000,
                        persen: 93.51,
                        judul: "BELANJA",
                    },
                    "PEMBIAYAAN": {
                        anggaran: "95000000",
                        realisasi: 95000000,
                        persen: 100,
                        judul: "PEMBIAYAAN",
                    }
                },
                laporan: "Laporan Realisasi APBDes Tahun Anggaran 2024",
                updated_at: "2024-12-31T23:59:59Z",
            },
        },
    ],
};

export const DUMMY_PPID_DATA = {
    data: [
        // Perencanaan & Penganggaran
        {
            type: "informasi_publik",
            id: "1",
            attributes: {
                nama: "PENJABARAN APBKAL 2025",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2025-07-23",
                keterangan: "PERATURAN LURAH TRIMULYO NO 4 TAHUN 2024 TENTANG PENJABARAN ANGGARAN PENDAPATAN DAN BELANJA TAHUN ANGGARAN 2025",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "2",
            attributes: {
                nama: "APBKAL TRIMULYO 2025",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2025-07-23",
                keterangan: "PERKAL TRIMULYO NO 4 TAHUN 2024 TENTANG ANGGARAN PENDAPATAN DAN BELANJA KALURAHAN TAHUN ANGGARAN 2025",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "3",
            attributes: {
                nama: "PENJABARAN ANGGARAN PENDAPATAN DAN BELANJA TAHUN ANGGARAN 2024",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2025-01-08",
                keterangan: "PERATURAN LURAH TRIMULYO NO 5 TAHUN 2023 TENTANG PENJABARAN ANGGARAN PENDAPATAN DAN BELANJA TAHUN ANGGARAN 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "4",
            attributes: {
                nama: "Infografis APBKAL 2024",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2024-03-05",
                keterangan: "Infografis Anggaran Pendapatan dan Belanja Kalurahan Tahun Anggaran 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "5",
            attributes: {
                nama: "RKPKAL TRIMULYO TAHUN ANGGARAN 2024",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2024-02-01",
                keterangan: "PERATURAN KALURAHAN TRIMULYO NOMOR 4 TAHUN 2023 TENTANG RENCANA KERJA PEMERINTAH KALURAHAN (RKPKAL) TAHUN ANGGARAN 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "6",
            attributes: {
                nama: "APBKAL TRIMULYO TAHUN ANGGARAN 2024",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2024-02-01",
                keterangan: "PERATURAN KALURAHAN TRIMULYO NOMOR 5 TAHUN 2023 TENTANG ANGGARAN PENDAPATAN DAN BELANJA KALURAHAN TAHUN ANGGARAN 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "7",
            attributes: {
                nama: "PENJABARAN PERUBAHAN APBKAL TAHUN ANGGARAN 2023",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2023-11-16",
                keterangan: "Peraturan Lurah Tentang Penjabaran Perubahan APBKAL Trimulyo Tahun Anggaran 2023",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "8",
            attributes: {
                nama: "Infografis APBKAL 2023",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2023-02-03",
                keterangan: "Infografis Anggaran Pendapatan dan Belanja Kalurahan Tahun Anggaran 2023",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "9",
            attributes: {
                nama: "APBKAL TRIMULYO TAHUN ANGGARAN 2023",
                kategori: "Perencanaan & Penganggaran",
                tgl_upload: "2023-01-26",
                keterangan: "Peraturan Kalurahan Trimulyo Nomor 6 Tahun 2022 Tentang Anggaran Pendapatan dan Belanja Kalurahan Tahun Anggaran 2023",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },

        // Laporan
        {
            type: "informasi_publik",
            id: "10",
            attributes: {
                nama: "Laporan Kinerja Pemerintah Kalurahan Trimulyo Tahun 2025",
                kategori: "Laporan",
                tgl_upload: "2025-12-29",
                keterangan: "Laporan kinerja pemkal Trimulyo",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "11",
            attributes: {
                nama: "LRA SEMESTER 1 TA 2025",
                kategori: "Laporan",
                tgl_upload: "2025-07-23",
                keterangan: "LAPORAN REALISASI PELAKSANAAN ANGGARAN PENDAPATAN DAN BELANJA KALURAHAN SEMESTER 1 PEMKAL TRIMULYO TAHUN ANGGARAN 2025",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "12",
            attributes: {
                nama: "LRA TAHUN ANGGARAN 2024",
                kategori: "Laporan",
                tgl_upload: "2025-07-23",
                keterangan: "PERKAL NO 1 TAHUN 2025 TENTANG LAPORAN PERTANGGUNGJAWABAN REALISASI ANGGARAN PENDAPATAN DAN BELANJA KALURAHAN TAHUN ANGGARAN 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "13",
            attributes: {
                nama: "LPPKAL TAHUN 2024",
                kategori: "Laporan",
                tgl_upload: "2025-07-23",
                keterangan: "LAPORAN PENYELENGGARAAN PEMERINTAHAN KALURAHAN TRIMULYO TAHUN ANGGARAN 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "14",
            attributes: {
                nama: "Infografis APBKAL Tahun 2025",
                kategori: "Laporan",
                tgl_upload: "2025-01-17",
                keterangan: "BANNER APBKAL 2025",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "15",
            attributes: {
                nama: "IPPKAL Trimulyo 2024",
                kategori: "Laporan",
                tgl_upload: "2025-01-14",
                keterangan: "Informasi Penyelenggaraan Pemerintahan Kalurahan Trimulyo Tahun Anggaran 2024",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "16",
            attributes: {
                nama: "Infografis IPPKal 2023",
                kategori: "Laporan",
                tgl_upload: "2024-06-04",
                keterangan: "Infografis Informasi Penyelenggaraan Pemerintahan Kalurahan Tahun 2023",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "17",
            attributes: {
                nama: "LPPKAL Tahun Anggaran 2023",
                kategori: "Laporan",
                tgl_upload: "2024-03-28",
                keterangan: "Laporan Penyelenggaraan Pemerintahan Kalurahan Tahun Anggaran 2023",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "18",
            attributes: {
                nama: "LAPORAN PERTANGGUNGJAWABAN REALISASI ANGGARAN PENDAPATAN DAN BELANJA KALURAHAN TAHUN ANGGARAN 2023",
                kategori: "Laporan",
                tgl_upload: "2024-03-18",
                keterangan: "LAPORAN PERTANGGUNGJAWABAN REALISASI ANGGARAN PENDAPATAN DAN BELANJA KALURAHAN TAHUN ANGGARAN 2023",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
        {
            type: "informasi_publik",
            id: "19",
            attributes: {
                nama: "LAPORAN REALISASI ANGGARAN 2022 KALURAHAN TRIMULYO",
                kategori: "Laporan",
                tgl_upload: "2023-05-29",
                keterangan: "Peraturan Kalurahan Trimulyo Nomor 1 Tahun 2023 Tentang Laporan Realisasi Anggaran 2022",
                url: "#",
                gambar: "/images/pdf-cover.png"
            },
        },
    ],
};

export const DUMMY_DISABILITAS_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "CACAT FISIK",
                jumlah: 50,
                laki: 30,
                perempuan: 20,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "CACAT NETRA/BUTA",
                jumlah: 20,
                laki: 10,
                perempuan: 10,
                persen: calcPersen(20, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "CACAT RUNGU/WICARA",
                jumlah: 30,
                laki: 15,
                perempuan: 15,
                persen: calcPersen(30, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "CACAT MENTAL/JIWA",
                jumlah: 40,
                laki: 20,
                perempuan: 20,
                persen: calcPersen(40, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "TIDAK CACAT",
                jumlah: 11489,
                laki: 5725,
                perempuan: 5764,
                persen: calcPersen(11489, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_ETNIS_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "JAWA",
                jumlah: 11000,
                laki: 5500,
                perempuan: 5500,
                persen: calcPersen(11000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "SUNDA",
                jumlah: 200,
                laki: 100,
                perempuan: 100,
                persen: calcPersen(200, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "BATAK",
                jumlah: 100,
                laki: 50,
                perempuan: 50,
                persen: calcPersen(100, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "LAINNYA",
                jumlah: 329,
                laki: 150,
                perempuan: 179,
                persen: calcPersen(329, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};
export const DUMMY_AGAMA_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "ISLAM",
                jumlah: 10500,
                laki: 5200,
                perempuan: 5300,
                persen: calcPersen(10500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "KRISTEN",
                jumlah: 600,
                laki: 300,
                perempuan: 300,
                persen: calcPersen(600, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "KATHOLIK",
                jumlah: 400,
                laki: 200,
                perempuan: 200,
                persen: calcPersen(400, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "HINDU",
                jumlah: 50,
                laki: 25,
                perempuan: 25,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "BUDHA",
                jumlah: 50,
                laki: 25,
                perempuan: 25,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_PEKERJAAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "PELAJAR/MAHASISWA",
                jumlah: 2500,
                laki: 1250,
                perempuan: 1250,
                persen: calcPersen(2500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "WIRASWASTA",
                jumlah: 2000,
                laki: 1200,
                perempuan: 800,
                persen: calcPersen(2000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "PETANI/PEKEBUN",
                jumlah: 1500,
                laki: 1000,
                perempuan: 500,
                persen: calcPersen(1500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "BURUH HARIAN LEPAS",
                jumlah: 1000,
                laki: 800,
                perempuan: 200,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "KARYAWAN SWASTA",
                jumlah: 1000,
                laki: 600,
                perempuan: 400,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
         {
            type: "statistik",
            id: "6",
            attributes: {
                nama: "IBU RUMAH TANGGA",
                jumlah: 1500,
                laki: 0,
                perempuan: 1500,
                persen: calcPersen(1500, DUMMY_TOTAL_PENDUDUK),
            },
        },
         {
            type: "statistik",
            id: "7",
            attributes: {
                nama: "BELUM/TIDAK BEKERJA",
                jumlah: 2129,
                laki: 950,
                perempuan: 1179,
                persen: calcPersen(2129, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_PENDIDIKAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "TAMAT SD / SEDERAJAT",
                jumlah: 3000,
                laki: 1500,
                perempuan: 1500,
                persen: calcPersen(3000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "SLTP / SEDERAJAT",
                jumlah: 2500,
                laki: 1300,
                perempuan: 1200,
                persen: calcPersen(2500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "SLTA / SEDERAJAT",
                jumlah: 3500,
                laki: 1800,
                perempuan: 1700,
                persen: calcPersen(3500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "DIPLOMA IV / STRATA I",
                jumlah: 1000,
                laki: 500,
                perempuan: 500,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "BELUM TAMAT SD / SEDERAJAT",
                jumlah: 1629,
                laki: 700,
                perempuan: 929,
                persen: calcPersen(1629, DUMMY_TOTAL_PENDUDUK),
            },
        },
         {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_UMUR_DATA = {
    data: [
         {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "0-5 TAHUN",
                jumlah: 800,
                laki: 400,
                perempuan: 400,
                persen: calcPersen(800, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "6-12 TAHUN",
                jumlah: 1200,
                laki: 600,
                perempuan: 600,
                persen: calcPersen(1200, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "13-17 TAHUN",
                jumlah: 1000,
                laki: 500,
                perempuan: 500,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "18-60 TAHUN",
                jumlah: 7000,
                laki: 3500,
                perempuan: 3500,
                persen: calcPersen(7000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "> 60 TAHUN",
                jumlah: 1629,
                laki: 800,
                perempuan: 829,
                persen: calcPersen(1629, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ]
};

export const DUMMY_BDT_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "DESIL 1",
                jumlah: 800,
                laki: 400,
                perempuan: 400,
                persen: calcPersen(800, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "DESIL 2",
                jumlah: 1200,
                laki: 600,
                perempuan: 600,
                persen: calcPersen(1200, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "DESIL 3",
                jumlah: 1500,
                laki: 750,
                perempuan: 750,
                persen: calcPersen(1500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "DESIL 4",
                jumlah: 1000,
                laki: 500,
                perempuan: 500,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "NON BDT",
                jumlah: 7129,
                laki: 3550,
                perempuan: 3579,
                persen: calcPersen(7129, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_PERKAWINAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "BELUM KAWIN",
                jumlah: 3000,
                laki: 1600,
                perempuan: 1400,
                persen: calcPersen(3000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "KAWIN",
                jumlah: 8000,
                laki: 4000,
                perempuan: 4000,
                persen: calcPersen(8000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "CERAI HIDUP",
                jumlah: 500,
                laki: 150,
                perempuan: 350,
                persen: calcPersen(500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "CERAI MATI",
                jumlah: 129,
                laki: 50,
                perempuan: 79,
                persen: calcPersen(129, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_KEWARGANEGARAAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "WNI",
                jumlah: 11629,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "WNA",
                jumlah: 0,
                laki: 0,
                perempuan: 0,
                persen: "0",
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};
