import {
    PrismaClient,
    JenisLayanan,
    StatusPermohonan,
    StatusAPBDes,
    StatusProyek,
    KategoriKegiatan,
    StatusKegiatan,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // ===========================================
    // USERS & ADMIN
    // ===========================================

    // Create Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.pengguna.upsert({
        where: { email: "admin@pondokrejo.desa.id" },
        update: {},
        create: {
            email: "admin@pondokrejo.desa.id",
            namaLengkap: "Administrator Kalurahan Pondokrejo",
            kataSandi: hashedPassword,
            nik: "3401011234567890",
            telepon: "0274-123456",
            alamat: "Kantor Kalurahan Pondokrejo, Sleman, DIY",
            peran: "ADMIN",
            aktif: true,
        },
    });

    // Create Staff Users
    await Promise.all([
        prisma.pengguna.upsert({
            where: { email: "sekretariat@pondokrejo.desa.id" },
            update: {},
            create: {
                email: "sekretariat@pondokrejo.desa.id",
                namaLengkap: "Sekretaris Kalurahan",
                kataSandi: hashedPassword,
                nik: "3401011234567891",
                telepon: "0274-123457",
                alamat: "Kantor Kalurahan Pondokrejo, Sleman, DIY",
                peran: "STAFF",
                aktif: true,
            },
        }),
        prisma.pengguna.upsert({
            where: { email: "bendahara@pondokrejo.desa.id" },
            update: {},
            create: {
                email: "bendahara@pondokrejo.desa.id",
                namaLengkap: "Bendahara Kalurahan",
                kataSandi: hashedPassword,
                nik: "3401011234567892",
                telepon: "0274-123458",
                alamat: "Kantor Kalurahan Pondokrejo, Sleman, DIY",
                peran: "STAFF",
                aktif: true,
            },
        }),
    ]);

    // ===========================================
    // KONTEN - BERITA
    // ===========================================

    const beritaData = [
        {
            judul: "Pelantikan Perangkat Kalurahan Pondokrejo Periode 2025-2030",
            slug: "pelantikan-perangkat-kalurahan-pondokrejo-periode-2025-2030",
            ringkasan:
                "Acara pelantikan perangkat kalurahan baru dilaksanakan dengan khidmat di Balai Kalurahan Pondokrejo.",
            konten: `Pondokrejo, 24 Oktober 2025 - Acara pelantikan perangkat Kalurahan Pondokrejo periode 2025-2030 telah dilaksanakan dengan khidmat di Balai Kalurahan Pondokrejo. Acara yang dihadiri oleh Bupati Sleman, Camat Mlati, serta seluruh warga masyarakat ini berlangsung tertib dan lancar.

      Dalam sambutannya, Bupati Sleman menekankan pentingnya peran perangkat kalurahan dalam mewujudkan kalurahan yang maju dan mandiri. "Perangkat kalurahan adalah ujung tombak pemerintahan yang langsung bersentuhan dengan masyarakat," ujarnya.

      Lurah Pondokrejo yang baru dilantik, Bapak Ahmad Wijaya, menyampaikan terima kasih atas kepercayaan yang diberikan. "Kami berkomitmen untuk bekerja keras melayani masyarakat dan membawa Kalurahan Pondokrejo menjadi lebih baik lagi," katanya.

      Acara pelantikan juga diisi dengan penandatanganan pakta integritas dan serah terima jabatan dari pejabat lama kepada pejabat baru.`,
            gambar: "/images/berita/pelantikan-perangkat-desa.jpg",
            kategori: "Pemerintahan",
            tag: "pelantikan,perangkat-kalurahan,pondokrejo",
            penulis: "Admin Kalurahan",
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-24"),
            viewCount: 245,
        },
        {
            judul: "Program Vaksinasi COVID-19 Dosis Lanjutan di Kalurahan Pondokrejo",
            slug: "program-vaksinasi-covid-19-dosis-lanjutan-di-kalurahan-pondokrejo",
            ringkasan:
                "Puskesmas Pembantu Kalurahan Pondokrejo menyelenggarakan vaksinasi COVID-19 dosis lanjutan untuk seluruh warga.",
            konten: `Pondokrejo, 23 Oktober 2025 - Puskesmas Pembantu Kalurahan Pondokrejo kembali menyelenggarakan program vaksinasi COVID-19 dosis lanjutan (booster) untuk seluruh warga Kalurahan Pondokrejo yang telah memenuhi syarat.

      Kegiatan yang berlangsung selama dua hari ini berhasil memberikan vaksin kepada 350 warga dari target 400 orang. Kepala Puskesmas Pembantu, Ibu Siti Nurjanah, menyampaikan apresiasi atas antusiasme warga.

      "Tingkat partisipasi warga sangat tinggi, ini menunjukkan kesadaran masyarakat akan pentingnya kesehatan," kata Ibu Siti. "Kami akan terus menggelar vaksinasi hingga seluruh warga mendapatkan vaksin lengkap."

      Pemerintah Kalurahan Pondokrejo menyediakan layanan antar-jemput bagi lansia dan penyandang disabilitas untuk memastikan semua warga dapat mengakses layanan vaksinasi ini.`,
            gambar: "/images/berita/vaksinasi-covid.jpg",
            kategori: "Kesehatan",
            tag: "vaksinasi,covid-19,kesehatan",
            penulis: "Tim Kesehatan Kalurahan",
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-23"),
            viewCount: 189,
        },
        {
            judul: "Pembangunan Jalan Usaha Tani Dusun Krajan Selesai",
            slug: "pembangunan-jalan-usaha-tani-dusun-krajan-selesai",
            ringkasan:
                "Pembangunan jalan usaha tani sepanjang 1,2 km di Dusun Krajan telah selesai dan dapat dimanfaatkan petani.",
            konten: `Pondokrejo, 22 Oktober 2025 - Pembangunan jalan usaha tani sepanjang 1,2 kilometer di Dusun Krajan telah selesai dikerjakan dan sudah dapat dimanfaatkan oleh para petani.

      Proyek yang menggunakan Dana Kalurahan sebesar Rp 350 juta ini mulai dikerjakan pada Agustus 2025 dan selesai tepat waktu pada Oktober 2025. Jalan dengan lebar 3 meter ini dilengkapi dengan drainase di kedua sisinya.

      Ketua Kelompok Tani Makmur, Bapak Slamet Riyadi, menyampaikan terima kasih kepada Pemerintah Kalurahan. "Jalan ini sangat membantu kami dalam mengangkut hasil panen. Sebelumnya, jalannya berat dan becek saat hujan," ujarnya.

      Dengan adanya jalan usaha tani ini, diharapkan produktivitas pertanian di Dusun Krajan dapat meningkat dan biaya transportasi hasil panen dapat ditekan.`,
            gambar: "/images/berita/jalan-usaha-tani.jpg",
            kategori: "Pembangunan",
            tag: "pembangunan,infrastruktur,pertanian",
            penulis: "Admin Pembangunan",
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-22"),
            viewCount: 312,
        },
        {
            judul: "Festival Seni dan Budaya Kalurahan Pondokrejo 2025",
            slug: "festival-seni-dan-budaya-kalurahan-pondokrejo-2025",
            ringkasan:
                "Festival Seni dan Budaya tahunan Kalurahan Pondokrejo kembali digelar dengan menampilkan berbagai pertunjukan seni tradisional.",
            konten: `Pondokrejo, 21 Oktober 2025 - Festival Seni dan Budaya Kalurahan Pondokrejo 2025 kembali digelar meriah di Lapangan Kalurahan Pondokrejo. Acara tahunan ini menampilkan berbagai pertunjukan seni tradisional seperti jathilan, kethoprak, dan tari klasik Jawa.

      Festival yang dibuka oleh Bapak Lurah Pondokrejo ini diikuti oleh 12 sanggar seni dari berbagai dusun di Kalurahan Pondokrejo. Ribuan warga hadir untuk menyaksikan pertunjukan yang berlangsung dari siang hingga malam hari.

      "Festival ini bertujuan untuk melestarikan seni dan budaya tradisional serta menjadi ajang silaturahmi antar warga," kata Bapak Lurah. "Kita harus terus menjaga warisan budaya leluhur kita."

      Selain pertunjukan seni, festival juga dimeriahkan dengan bazaar produk UMKM kalurahan, lomba masak tradisional, dan pameran foto sejarah Kalurahan Pondokrejo.`,
            gambar: "/images/berita/festival-seni-budaya.jpg",
            kategori: "Budaya",
            tag: "festival,seni,budaya,tradisional",
            penulis: "Tim Kebudayaan Kalurahan",
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-21"),
            viewCount: 456,
        },
        {
            judul: "Bantuan Langsung Tunai Dana Kalurahan Tahap III Cair",
            slug: "bantuan-langsung-tunai-dana-kalurahan-tahap-iii-cair",
            ringkasan:
                "BLT Dana Kalurahan tahap III untuk 215 KK di Kalurahan Pondokrejo telah dicairkan melalui rekening masing-masing penerima.",
            konten: `Pondokrejo, 20 Oktober 2025 - Bantuan Langsung Tunai (BLT) Dana Kalurahan tahap III untuk 215 keluarga penerima manfaat di Kalurahan Pondokrejo telah dicairkan.

      Pencairan dilakukan melalui transfer ke rekening masing-masing penerima yang sudah terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS). Setiap KPM menerima bantuan sebesar Rp 300.000 per bulan untuk tiga bulan ke depan.

      "Proses pencairan berjalan lancar dan semua KPM sudah menerima bantuan mereka," kata Bendahara Kalurahan, Ibu Dewi Lestari. "Kita berharap bantuan ini dapat meringankan beban ekonomi warga terdampak pandemi."

      Pemerintah Kalurahan menghimbau kepada KPM untuk menggunakan bantuan ini sesuai kebutuhan pokok keluarga seperti makanan, obat-obatan, dan keperluan sekolah anak-anak.`,
            gambar: "/images/berita/blt-dana-desa.jpg",
            kategori: "Sosial",
            tag: "blt,dana-kalurahan,bantuan-sosial",
            penulis: "Bendahara Kalurahan",
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-20"),
            viewCount: 278,
        },
    ];

    // Create berita
    for (const berita of beritaData) {
        await prisma.berita.upsert({
            where: { slug: berita.slug },
            update: berita,
            create: {
                ...berita,
                createdAt: berita.dipublikasi || new Date(),
            },
        });
    }

    // ===========================================
    // PENGUMUMAN
    // ===========================================

    const pengumumanData = [
        {
            judul: "Pemadaman Listrik Bergilir 25-26 Oktober 2025",
            konten: `Berdasarkan informasi dari PLN Rayon Mlati, akan ada pemadaman listrik bergilir pada tanggal 25-26 Oktober 2025.

      Jadwal pemadaman:
      - Senin, 25 Oktober 2025: Pukul 09:00 - 12:00 WIB
      - Selasa, 26 Oktober 2025: Pukul 13:00 - 16:00 WIB

      Wilayah terdampak:
      - Dusun Krajan RW 01, RW 02
      - Dusun Karangasem RW 03

      Mohon warga bersiap-siap dan menyiapkan keperluan listrik penting sebelum pemadaman. Terima kasih.`,
            gambar: "/images/pengumuman/pemadaman-listrik.jpg",
            prioritas: "TINGGI" as const,
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-24"),
            expiresAt: new Date("2025-10-27"),
        },
        {
            judul: "Imunisasi Anak Balita di Posyandu",
            konten: `Jadwal imunisasi rutin untuk anak balita di Posyandu Kalurahan Pondokrejo:

      Posyandu Mawar: Setiap Senin, pukul 08:00 - 10:00 WIB
      Posyandu Melati: Setiap Rabu, pukul 08:00 - 10:00 WIB
      Posyandu Sakura: Setiap Jumat, pukul 08:00 - 10:00 WIB

      Dimohon kepada orang tua untuk membawa Kartu Menuju Sehat (KMS) dan buku imunisasi anak. Gratis bagi seluruh anak balita di Kalurahan Pondokrejo.`,
            gambar: "/images/pengumuman/imunisasi-balita.jpg",
            prioritas: "NORMAL" as const,
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-23"),
            expiresAt: new Date("2025-11-30"),
        },
        {
            judul: "Pembayaran PBB-P2 Tahun 2025",
            konten: `Pembayaran Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBB-P2) tahun 2025 dapat dilakukan di Kantor Kalurahan Pondokrejo.

      Waktu: Senin - Jumat, pukul 08:00 - 15:00 WIB
      Tempat: Kantor Kalurahan Pondokrejo

      Persyaratan:
      - SPPT PBB-P2 asli
      - KTP pemilik

      Pembayaran juga dapat dilakukan melalui:
      - Kantor Pos
      - ATM/Banking (kode billing)
      - Aplikasi Pajak Daerah DIY

      Batas akhir pembayaran: 31 Desember 2025

      Ayow, bayar PBB tepat waktu!`,
            gambar: "/images/pengumuman/pembayaran-pbb.jpg",
            prioritas: "NORMAL" as const,
            status: "PUBLISHED" as const,
            dipublikasi: new Date("2025-10-22"),
            expiresAt: new Date("2025-12-31"),
        },
    ];

    // Create pengumuman
    for (const pengumuman of pengumumanData) {
        await prisma.pengumuman.upsert({
            where: { id: pengumumanData.indexOf(pengumuman) + 1 },
            update: pengumuman,
            create: {
                ...pengumuman,
                createdAt: pengumuman.dipublikasi || new Date(),
            },
        });
    }

    // ===========================================
    // SDGs PROGRESS
    // ===========================================

    const sdgsProgressData = [
        {
            goal: 1,
            judul: "Tanpa Kemiskinan",
            deskripsi: "Menghapus kemiskinan dalam segala bentuknya di mana pun termasuk di Kalurahan Pondokrejo",
            progress: 78.5,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 2,
            judul: "Keadilan Pangan",
            deskripsi:
                "Mengakhiri kelaparan, mencapai ketahanan pangan dan gizi yang baik, serta mendukung pertanian berkelanjutan",
            progress: 85.2,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 3,
            judul: "Hidup Sehat dan Sejahtera",
            deskripsi: "Menjamin kehidupan yang sehat dan mendukung kesejahteraan bagi semua usia",
            progress: 82.7,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 4,
            judul: "Pendidikan Berkualitas",
            deskripsi:
                "Memastikan pendidikan inklusif dan merata berkualitas serta mendukung kesempatan belajar sepanjang hayat",
            progress: 90.3,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 5,
            judul: "Kesetaraan Jender",
            deskripsi: "Mencapai kesetaraan jender dan memberdayakan semua perempuan dan anak perempuan",
            progress: 75.8,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 6,
            judul: "Air Bersih dan Sanitasi",
            deskripsi: "Menjamin ketersediaan dan pengelolaan air bersih dan sanitasi yang berkelanjutan",
            progress: 88.9,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 7,
            judul: "Energi Bersih dan Terjangkau",
            deskripsi: "Memastikan akses terhadap energi yang terjangkau, andal, berkelanjutan, dan modern",
            progress: 92.1,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 8,
            judul: "Pekerjaan Layak dan Pertumbuhan Ekonomi",
            deskripsi:
                "Mendorong pertumbuhan ekonomi yang inklusif dan berkelanjutan, kesempatan kerja yang penuh dan produktif",
            progress: 68.4,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 9,
            judul: "Industri, Inovasi, dan Infrastruktur",
            deskripsi:
                "Membangun infrastruktur yang tangguh, mendorong industrialisasi yang inklusif dan berkelanjutan",
            progress: 71.6,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 10,
            judul: "Berkurangnya Kesenjangan",
            deskripsi: "Mengurangi kesenjangan di dalam dan antar negara",
            progress: 73.2,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 11,
            judul: "Kota dan Komunitas Berkelanjutan",
            deskripsi: "Membuat kota dan permukiman manusia yang inklusif, aman, tangguh, dan berkelanjutan",
            progress: 76.9,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 12,
            judul: "Konsumsi dan Produksi yang Bertanggung Jawab",
            deskripsi: "Memastikan pola konsumsi dan produksi yang berkelanjutan",
            progress: 64.7,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 13,
            judul: "Penanganan Perubahan Iklim",
            deskripsi: "Mengambil tindakan mendesak untuk memerangi perubahan iklim dan dampaknya",
            progress: 58.3,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 14,
            judul: "Ekosistem Laut",
            deskripsi: "Mengelola ekosistem laut secara berkelanjutan untuk pembangunan berkelanjutan",
            progress: 45.2,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 15,
            judul: "Ekosistem Darat",
            deskripsi: "Melindungi, mengembalikan dan mempromosikan penggunaan ekosistem darat secara berkelanjutan",
            progress: 67.8,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 16,
            judul: "Perdamaian, Keadilan, dan Kelembagaan yang Kuat",
            deskripsi: "Mendorong masyarakat yang damai dan inklusif untuk pembangunan berkelanjutan",
            progress: 81.5,
            targetTahun: 2030,
            satuan: "%",
        },
        {
            goal: 17,
            judul: "Kemitraan untuk Mencapai Tujuan",
            deskripsi:
                "Memperkuat sarana implementasi dan menggiatkan kemitraan global untuk pembangunan berkelanjutan",
            progress: 72.4,
            targetTahun: 2030,
            satuan: "%",
        },
    ];

    // Create SDGs Progress
    for (const sdgs of sdgsProgressData) {
        await prisma.sDGsProgress.upsert({
            where: { goal: sdgs.goal },
            update: sdgs,
            create: sdgs,
        });
    }

    // ===========================================
    // LOKASI INTERAKTIF
    // ===========================================

    const lokasiData = [
        {
            nama: "Kantor Kalurahan Pondokrejo",
            deskripsi: "Kantor Pemerintah Kalurahan Pondokrejo, pusat layanan administrasi dan pelayanan masyarakat",
            jenis: "PEMERINTAHAN" as const,
            alamat: "Jl. Kembang Kepuh No. 1, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7706,110.3762",
            telepon: "0274-123456",
            jamOperasi: "Senin-Jumat: 08:00-15:00 WIB",
            website: "https://pondokrejo.clasnet.co.id",
            gambar: "/images/lokasi/kantor-desa.jpg",
            aktif: true,
        },
        {
            nama: "Puskesmas Pembantu Pondokrejo",
            deskripsi: "Fasilitas kesehatan primer untuk layanan kesehatan dasar masyarakat Kalurahan Pondokrejo",
            jenis: "KESEHATAN" as const,
            alamat: "Jl. Kembang Kepuh No. 15, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7712,110.3758",
            telepon: "0274-123457",
            jamOperasi: "Senin-Sabtu: 08:00-14:00 WIB",
            website: null,
            gambar: "/images/lokasi/puskesmas.jpg",
            aktif: true,
        },
        {
            nama: "SD Negeri Pondokrejo",
            deskripsi: "Sekolah Dasar Negeri unggulan di Kalurahan Pondokrejo dengan fasilitas lengkap",
            jenis: "PENDIDIKAN" as const,
            alamat: "Jl. Flamboyan No. 3, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7698,110.3769",
            telepon: "0274-123458",
            jamOperasi: "Senin-Jumat: 07:00-13:00 WIB",
            website: "https://sdpondokrejo.sch.id",
            gambar: "/images/lokasi/sd-negeri.jpg",
            aktif: true,
        },
        {
            nama: "Masjid Jami Al-Hikmah",
            deskripsi: "Masjid utama Kalurahan Pondokrejo untuk kegiatan ibadah dan syiar Islam",
            jenis: "IBADAH" as const,
            alamat: "Jl. Kembang Kepuh No. 25, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7702,110.3765",
            telepon: "0274-123459",
            jamOperasi: "24 jam",
            website: null,
            gambar: "/images/lokasi/masjid-al-hikmah.jpg",
            aktif: true,
        },
        {
            nama: "Lapangan Kalurahan Pondokrejo",
            deskripsi: "Fasilitas olahraga dan kegiatan kemasyarakatan umum",
            jenis: "FASILITAS_UMUM" as const,
            alamat: "Jl. Melati No. 5, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7718,110.3752",
            telepon: null,
            jamOperasi: "05:00-21:00 WIB",
            website: null,
            gambar: "/images/lokasi/lapangan-desa.jpg",
            aktif: true,
        },
        {
            nama: "Pasar Kalurahan Pondokrejo",
            deskripsi: "Pasar tradisional untuk kegiatan ekonomi dan perdagangan masyarakat",
            jenis: "EKONOMI" as const,
            alamat: "Jl. Kembang Kepuh No. 50, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7708,110.3770",
            telepon: "0274-123460",
            jamOperasi: "04:00-12:00 WIB",
            website: null,
            gambar: "/images/lokasi/pasar-desa.jpg",
            aktif: true,
        },
        {
            nama: "Balai Seni dan Budaya Pondokrejo",
            deskripsi: "Pusat kegiatan seni, budaya, dan pelatihan keterampilan masyarakat",
            jenis: "BUDAYA" as const,
            alamat: "Jl. Kenanga No. 8, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7695,110.3773",
            telepon: "0274-123461",
            jamOperasi: "Senin-Sabtu: 09:00-16:00 WIB",
            website: null,
            gambar: "/images/lokasi/balai-seni.jpg",
            aktif: true,
        },
        {
            nama: "Lapangan Futsal Pondokrejo",
            deskripsi: "Fasilitas olahraga futsal sintetis untuk masyarakat",
            jenis: "OLAHRAGA" as const,
            alamat: "Jl. Mawar No. 12, Pondokrejo, Mlati, Sleman, DIY",
            koordinat: "-7.7715,110.3755",
            telepon: "0274-123462",
            jamOperasi: "08:00-22:00 WIB",
            website: null,
            gambar: "/images/lokasi/lapangan-futsal.jpg",
            aktif: true,
        },
    ];

    // Create lokasi
    for (const lokasi of lokasiData) {
        await prisma.lokasiInteraktif.upsert({
            where: { id: lokasiData.indexOf(lokasi) + 1 },
            update: lokasi,
            create: lokasi,
        });
    }

    // ===========================================
    // COMMUNITY POLLING
    // ===========================================

    const communityPollData = [
        {
            pertanyaan: "Apa prioritas pembangunan yang paling Anda harapkan di Kalurahan Pondokrejo tahun 2026?",
            deskripsi: "Pilih program pembangunan yang menurut Anda paling penting untuk kemajuan Kalurahan Pondokrejo",
            kategori: "Pembangunan",
            tanggalMulai: new Date("2025-10-01"),
            tanggalSelesai: new Date("2025-11-30"),
            aktif: true,
            pilihan: [
                "Peningkatan infrastruktur jalan kalurahan",
                "Pembangunan drainase dan irigasi",
                "Fasilitas kesehatan dan kesejahteraan",
                "Pendidikan dan beasiswa pelajar",
                "Ekonomi kreatif dan UMKM",
            ],
        },
        {
            pertanyaan: "Bagaimana kualitas pelayanan publik di Kantor Kalurahan Pondokrejo?",
            deskripsi: "Berikan penilaian Anda terhadap kualitas pelayanan yang kami berikan",
            kategori: "Pelayanan",
            tanggalMulai: new Date("2025-10-15"),
            tanggalSelesai: new Date("2025-12-15"),
            aktif: true,
            pilihan: ["Sangat Baik", "Baik", "Cukup", "Kurang", "Sangat Kurang"],
        },
        {
            pertanyaan: "Program apa yang Anda inginkan untuk pemuda Kalurahan Pondokrejo?",
            deskripsi: "Pilih program yang paling relevan untuk pengembangan potensi pemuda",
            kategori: "Pemuda",
            tanggalMulai: new Date("2025-10-20"),
            tanggalSelesai: new Date("2025-11-20"),
            aktif: true,
            pilihan: [
                "Pelatihan kewirausahaan",
                "Kegiatan olahraga dan e-sport",
                "Pengembangan skill digital",
                "Seni dan budaya",
                "Kegiatan sosial kemasyarakatan",
            ],
        },
    ];

    // Create community polls
    for (const pollData of communityPollData) {
        const poll = await prisma.communityPoll.upsert({
            where: { id: communityPollData.indexOf(pollData) + 1 },
            update: {
                pertanyaan: pollData.pertanyaan,
                deskripsi: pollData.deskripsi,
                kategori: pollData.kategori,
                tanggalMulai: pollData.tanggalMulai,
                tanggalSelesai: pollData.tanggalSelesai,
                aktif: pollData.aktif,
            },
            create: {
                pertanyaan: pollData.pertanyaan,
                deskripsi: pollData.deskripsi,
                kategori: pollData.kategori,
                tanggalMulai: pollData.tanggalMulai,
                tanggalSelesai: pollData.tanggalSelesai,
                aktif: pollData.aktif,
            },
        });

        // Create poll options
        for (const [index, pilihan] of pollData.pilihan.entries()) {
            await prisma.pollingPilihan.upsert({
                where: {
                    pollId_urutan: {
                        pollId: poll.id,
                        urutan: index + 1,
                    },
                },
                update: { pilihan },
                create: {
                    pollId: poll.id,
                    pilihan,
                    urutan: index + 1,
                },
            });
        }
    }

    // ===========================================
    // LIVE STATISTICS
    // ===========================================

    const liveStatsData = [
        {
            kategori: "Demografi",
            judul: "Total Penduduk",
            nilai: 4567,
            satuan: "jiwa",
            persenChange: 2.3,
        },
        {
            kategori: "Demografi",
            judul: "Kepala Keluarga",
            nilai: 1243,
            satuan: "KK",
            persenChange: 1.8,
        },
        {
            kategori: "Ekonomi",
            judul: "UMM Aktif",
            nilai: 89,
            satuan: "unit",
            persenChange: 12.5,
        },
        {
            kategori: "Ekonomi",
            judul: "Tenaga Kerja",
            nilai: 2156,
            satuan: "orang",
            persenChange: 3.7,
        },
        {
            kategori: "Pendidikan",
            judul: "Siswa SD/Sederajat",
            nilai: 567,
            satuan: "orang",
            persenChange: 1.2,
        },
        {
            kategori: "Pendidikan",
            judul: "Siswa SMP/Sederajat",
            nilai: 234,
            satuan: "orang",
            persenChange: -2.1,
        },
        {
            kategori: "Kesehatan",
            judul: "Ibu Hamil",
            nilai: 45,
            satuan: "orang",
            persenChange: 5.2,
        },
        {
            kategori: "Kesehatan",
            judul: "Bayi < 1 Tahun",
            nilai: 28,
            satuan: "orang",
            persenChange: 8.7,
        },
        {
            kategori: "Keuangan",
            judul: "APBDes 2025",
            nilai: BigInt(2450000000),
            satuan: " rupiah",
            persenChange: 8.5,
        },
        {
            kategori: "Keuangan",
            judul: "Realisasi Anggaran",
            nilai: BigInt(1687000000),
            satuan: " rupiah",
            persenChange: 68.8,
        },
        {
            kategori: "Pembangunan",
            judul: "Proyek Berjalan",
            nilai: 12,
            satuan: "proyek",
            persenChange: 20.0,
        },
        {
            kategori: "Layanan",
            judul: "Pengajuan Bulan Ini",
            nilai: 156,
            satuan: "permohonan",
            persenChange: 15.6,
        },
    ];

    // Create live statistics
    for (const stats of liveStatsData) {
        await prisma.liveStatistics.upsert({
            where: {
                kategori_judul: {
                    kategori: stats.kategori,
                    judul: stats.judul,
                },
            },
            update: stats,
            create: stats,
        });
    }

    // ===========================================
    // EMERGENCY ALERTS
    // ===========================================

    const emergencyAlertData = [
        {
            judul: "Peringatan Dini Cuaca Ekstrem",
            pesan: "BMKG mengeluarkan peringatan dini potensi hujan lebat disertai angin kencang di wilayah Sleman dan sekitarnya pada 24-26 Oktober 2025. Warga diimbau untuk waspada dan menghindari area yang rawan banjir dan longsor.",
            tingkat: "HIGH",
            kategori: "Cuaca",
            lokasi: "Seluruh wilayah Kalurahan Pondokrejo",
            koordinat: "-7.7706,110.3762",
            expiresAt: new Date("2025-10-27"),
            aktif: true,
        },
        {
            judul: "Pemadaman Listrik Darurat",
            pesan: "Pemadaman listrik darurat di Dusun Krajan dan Karangasem karena adanya perbaikan jaringan. Perkiraan pemulihan 3-4 jam. Mohon maaf atas ketidaknyamanannya.",
            tingkat: "MEDIUM",
            kategori: "Infrastruktur",
            lokasi: "Dusun Krajan dan Karangasem",
            koordinat: "-7.7706,110.3762",
            expiresAt: new Date("2025-10-24"),
            aktif: false,
        },
        {
            judul: "Informasi Penting COVID-19",
            pesan: "Satgas COVID-19 Kalurahan Pondokrejo menginformasikan adanya penambahan 2 kasus konfirmasi COVID-19. Masyarakat diimbau untuk tetap disiplin protokol kesehatan dan segera melapor jika mengalami gejala.",
            tingkat: "LOW",
            kategori: "Kesehatan",
            lokasi: "RW 02 Dusun Krajan",
            koordinat: "-7.7708,110.3760",
            expiresAt: new Date("2025-10-31"),
            aktif: false,
        },
    ];

    // Create emergency alerts
    for (const alert of emergencyAlertData) {
        await prisma.emergencyAlert.upsert({
            where: { id: emergencyAlertData.indexOf(alert) + 1 },
            update: alert,
            create: alert,
        });
    }

    // ===========================================
    // WEATHER DATA
    // ===========================================

    const weatherData = {
        suhu: 28.5,
        kelembaban: 75.2,
        tekanan: 1010.8,
        kecepatanAngin: 12.3,
        arahAngin: "Barat Laut",
        kondisi: "Cerah Berawan",
        deskripsi:
            "Cerah berawan dengan potensi hujan lokal di sore hari. Suhu terasa hangat dengan kelembaban tinggi.",
        lastUpdate: new Date(),
    };

    await prisma.weatherData.upsert({
        where: { id: 1 },
        update: weatherData,
        create: weatherData,
    });

    // ===========================================
    // NOTIFICATIONS
    // ===========================================

    const notificationData = [
        {
            judul: "Pengumuman: Libur Nasional",
            pesan: "Diberitahukan kepada seluruh warga Kalurahan Pondokrejo bahwa Kantor Kalurahan akan libur pada tanggal 28 Oktober 2025 dalam rangka Hari Sumpah Pemuda. Pelayanan akan kembali normal pada 29 Oktober 2025.",
            jenis: "PENGUMUMAN" as const,
            icon: "calendar",
            link: "/pengumuman/libur-nasional",
            global: true,
            expiresAt: new Date("2025-10-29"),
        },
        {
            judul: "Jadwal Vaksinasi COVID-19",
            pesan: "Puskesmas Pembantu Kalurahan Pondokrejo akan menyelenggarakan vaksinasi COVID-19 dosis lanjutan pada 30-31 Oktober 2025. Daftar sekarang juga!",
            jenis: "INFORMASI" as const,
            icon: "syringe",
            link: "/layanan/kesehatan",
            global: true,
            expiresAt: new Date("2025-11-01"),
        },
        {
            judul: "Pembayaran PBB-P2",
            pesan: "Jangan lupa bayar PBB-P2 tahun 2025 sebelum 31 Desember 2025 untuk menghindari denda. Pembayaran dapat dilakukan di Kantor Kalurahan.",
            jenis: "INFORMASI" as const,
            icon: "file-text",
            link: "/layanan/keuangan",
            global: true,
            expiresAt: new Date("2025-12-31"),
        },
    ];

    // Create notifications
    for (const notification of notificationData) {
        const notif = await prisma.notifikasi.upsert({
            where: { id: notificationData.indexOf(notification) + 1 },
            update: notification,
            create: notification,
        });

        // Assign to all users if global
        if (notification.global) {
            const users = await prisma.pengguna.findMany({
                where: { aktif: true },
            });

            for (const user of users) {
                await prisma.notifikasiUser.upsert({
                    where: {
                        notifikasiId_penggunaId: {
                            notifikasiId: notif.id,
                            penggunaId: user.id,
                        },
                    },
                    update: {},
                    create: {
                        notifikasiId: notif.id,
                        penggunaId: user.id,
                        dibaca: false,
                    },
                });
            }
        }
    }

    // ===========================================
    // LAYANAN PERMOHONAN
    // ===========================================

    const layananPermohonanData = [
        {
            namaPemohon: "Budi Santoso",
            nikPemohon: "3401011501850001",
            emailPemohon: "budi.santoso@email.com",
            teleponPemohon: "0812-3456-7890",
            alamatLengkap: "Jl. Melati No. 15, Pondokrejo, Mlati, Sleman, DIY",
            jenisLayanan: JenisLayanan.KK,
            keterangan: "Pengajuan KK baru karena pindah rumah",
            dokumen: "/documents/layanan/kk_budi_santoso.pdf",
            statusPermohonan: StatusPermohonan.SELESAI,
            idPelacakan: "KK-2025-0001",
            tanggalPengajuan: new Date("2025-10-20"),
        },
        {
            namaPemohon: "Siti Nurhaliza",
            nikPemohon: "3401015202750002",
            emailPemohon: "siti.nurhaliza@email.com",
            teleponPemohon: "0813-9876-5432",
            alamatLengkap: "Jl. Kenanga No. 8, Pondokrejo, Mlati, Sleman, DIY",
            jenisLayanan: JenisLayanan.KTP,
            keterangan: "Perpanjangan KTP elektronik",
            dokumen: "/documents/layanan/ktp_siti_nurhaliza.pdf",
            statusPermohonan: StatusPermohonan.DIPROSES,
            idPelacakan: "KTP-2025-0002",
            tanggalPengajuan: new Date("2025-10-22"),
        },
        {
            namaPemohon: "Ahmad Fauzi",
            nikPemohon: "3401011001850003",
            emailPemohon: "ahmad.fauzi@email.com",
            teleponPemohon: "0815-2345-6789",
            alamatLengkap: "Jl. Flamboyan No. 3, Pondokrejo, Mlati, Sleman, DIY",
            jenisLayanan: JenisLayanan.KELAHIRAN,
            keterangan: "Pengajuan akta kelahiran anak pertama",
            dokumen: "/documents/layanan/akta_kelahiran_ahmad_fauzi.pdf",
            statusPermohonan: StatusPermohonan.MENUNGGU,
            idPelacakan: "AKTA-2025-0001",
            tanggalPengajuan: new Date("2025-10-24"),
        },
    ];

    // Create layanan permohonan
    for (const layanan of layananPermohonanData) {
        await prisma.layananPermohonan.upsert({
            where: { idPelacakan: layanan.idPelacakan },
            update: layanan,
            create: layanan,
        });
    }

    // ===========================================
    // APBDES
    // ===========================================

    const apbdesData = {
        tahunAnggaran: "2025",
        totalAnggaran: 2450000000, // 2.45 Miliar
        totalRealisasi: 1687000000, // 1.687 Miliar
        status: StatusKegiatan.AKTIF,
        rincian: [
            {
                kategori: "Bidang Penyelenggaraan Pemerintahan Kalurahan",
                subKategori: "Belanja Pegawai",
                anggaran: 850000000,
                realisasi: 720000000,
                persentase: 84.7,
            },
            {
                kategori: "Bidang Pelaksanaan Pembangunan Kalurahan",
                subKategori: "Belanja Pembangunan",
                anggaran: 1200000000,
                realisasi: 750000000,
                persentase: 62.5,
            },
            {
                kategori: "Bidang Pembinaan Kemasyarakatan",
                subKategori: "Belanja Kemasyarakatan",
                anggaran: 300000000,
                realisasi: 187000000,
                persentase: 62.3,
            },
            {
                kategori: "Bidang Pemberdayaan Masyarakat",
                subKategori: "Belanja Pemberdayaan",
                anggaran: 100000000,
                realisasi: 30000000,
                persentase: 30.0,
            },
        ],
    };

    const apbdes = await prisma.aPBDes.upsert({
        where: { tahunAnggaran: apbdesData.tahunAnggaran },
        update: {
            totalAnggaran: apbdesData.totalAnggaran,
            totalRealisasi: apbdesData.totalRealisasi,
            status: StatusAPBDes.AKTIF,
        },
        create: {
            tahunAnggaran: apbdesData.tahunAnggaran,
            totalAnggaran: apbdesData.totalAnggaran,
            totalRealisasi: apbdesData.totalRealisasi,
            status: StatusAPBDes.AKTIF,
        },
    });

    // Create APBDes rincian
    for (const rincian of apbdesData.rincian) {
        await prisma.aPBDesRincian.upsert({
            where: {
                apbdesId_kategori_subKategori: {
                    apbdesId: apbdes.id,
                    kategori: rincian.kategori,
                    subKategori: rincian.subKategori,
                },
            },
            update: rincian,
            create: {
                apbdesId: apbdes.id,
                kategori: rincian.kategori,
                subKategori: rincian.subKategori,
                anggaran: rincian.anggaran,
                realisasi: rincian.realisasi,
                persentase: rincian.persentase,
            },
        });
    }

    // ===========================================
    // PROYEK PEMBANGUNAN
    // ===========================================

    const proyekData = [
        {
            nama: "Pembangunan Jalan Usaha Tani Dusun Krajan",
            deskripsi: "Pembangunan jalan usaha tani sepanjang 1,2 km dengan lebar 3 meter dilengkapi drainase",
            lokasi: "Dusun Krajan, Pondokrejo",
            anggaran: 350000000,
            progress: 100,
            status: StatusProyek.SELESAI,
            mulai: new Date("2025-08-01"),
            selesai: new Date("2025-10-15"),
            koordinat: "-7.7700,110.3760",
        },
        {
            nama: "Rehabilitasi Balai Kalurahan Pondokrejo",
            deskripsi: "Penataan ulang Balai Kalurahan dengan fasilitas modern dan aksesibilitas disabilitas",
            lokasi: "Kantor Kalurahan Pondokrejo",
            anggaran: 500000000,
            progress: 75,
            status: StatusProyek.BERJALAN,
            mulai: new Date("2025-09-01"),
            selesai: new Date("2025-12-15"),
            koordinat: "-7.7706,110.3762",
        },
        {
            nama: "Pembangunan Drainase Jl. Flamboyan",
            deskripsi: "Konstruksi drainase beton sepanjang 500 meter untuk mengatasi genangan air",
            lokasi: "Jl. Flamboyan, Pondokrejo",
            anggaran: 150000000,
            progress: 45,
            status: StatusProyek.BERJALAN,
            mulai: new Date("2025-10-01"),
            selesai: new Date("2025-11-30"),
            koordinat: "-7.7698,110.3769",
        },
    ];

    // Create proyek
    for (const proyek of proyekData) {
        await prisma.proyek.upsert({
            where: { id: proyekData.indexOf(proyek) + 1 },
            update: proyek,
            create: proyek,
        });
    }

    // ===========================================
    // KEGIATAN MASYARAKAT
    // ===========================================

    const kegiatanData = [
        {
            nama: "Senam Pagi Bersama",
            deskripsi: "Senam pagi rutin untuk menjaga kesehatan dan kebugaran masyarakat",
            kategori: KategoriKegiatan.LAINNYA,
            tanggal: new Date("2025-10-25"),
            waktu: new Date("1970-01-01T06:00:00Z"),
            lokasi: "Lapangan Kalurahan Pondokrejo",
            koordinat: "-7.7718,110.3752",
            status: StatusKegiatan.AKTIF,
        },
        {
            nama: 'Posyandu Balita "Mawar"',
            deskripsi: "Pelayanan kesehatan ibu dan balita serta imunisasi rutin",
            kategori: KategoriKegiatan.LAINNYA,
            tanggal: new Date("2025-10-27"),
            waktu: new Date("1970-01-01T08:00:00Z"),
            lokasi: "Posyandu Mawar, Dusun Krajan",
            koordinat: "-7.7702,110.3765",
            status: StatusKegiatan.AKTIF,
        },
        {
            nama: "Pertemuan PKK",
            deskripsi: "Rapat rutin PKK Kalurahan Pondokrejo untuk program kerja bulanan",
            kategori: KategoriKegiatan.LAINNYA,
            tanggal: new Date("2025-10-28"),
            waktu: new Date("1970-01-01T10:00:00Z"),
            lokasi: "Balai Kalurahan Pondokrejo",
            koordinat: "-7.7706,110.3762",
            status: StatusKegiatan.AKTIF,
        },
        {
            nama: "Latihan Jathilan Sangga Budaya",
            deskripsi: "Latihan rutin seni tradisional jathilan untuk melestarikan budaya lokal",
            kategori: KategoriKegiatan.BUDAYA,
            tanggal: new Date("2025-10-29"),
            waktu: new Date("1970-01-01T19:00:00Z"),
            lokasi: "Balai Seni dan Budaya Pondokrejo",
            koordinat: "-7.7695,110.3773",
            status: StatusKegiatan.AKTIF,
        },
        {
            nama: "Pertandingan Futsal Persahabatan",
            deskripsi: "Turnamen futsal antar RW dalam rangka memperingati Hari Sumpah Pemuda",
            kategori: KategoriKegiatan.OLAHRAGA,
            tanggal: new Date("2025-10-30"),
            waktu: new Date("1970-01-01T08:00:00Z"),
            lokasi: "Lapangan Futsal Pondokrejo",
            koordinat: "-7.7715,110.3755",
            status: StatusKegiatan.AKTIF,
        },
    ];

    // Create kegiatan
    for (const kegiatan of kegiatanData) {
        await prisma.kegiatan.upsert({
            where: { id: kegiatanData.indexOf(kegiatan) + 1 },
            update: kegiatan,
            create: kegiatan,
        });
    }

    // ===========================================
    // KONFIGURASI
    // ===========================================

    const konfigurasiData = [
        {
            kunci: "nama_desa",
            nilai: "Kalurahan Pondokrejo",
            kategori: "informasi_umum",
        },
        {
            kunci: "alamat_desa",
            nilai: "Jl. Kembang Kepuh No. 1, Pondokrejo, Mlati, Sleman, DIY 55284",
            kategori: "informasi_umum",
        },
        {
            kunci: "telepon_desa",
            nilai: "(0274) 123456",
            kategori: "informasi_umum",
        },
        {
            kunci: "email_desa",
            nilai: "info@pondokrejo.clasnet.co.id",
            kategori: "informasi_umum",
        },
        {
            kunci: "website_desa",
            nilai: "https://pondokrejo.clasnet.co.id",
            kategori: "informasi_umum",
        },
        {
            kunci: "nama_lurah",
            nilai: "Ahmad Wijaya, S.Sos.",
            kategori: "pemerintahan",
        },
        {
            kunci: "nik_lurah",
            nilai: "3401010112690001",
            kategori: "pemerintahan",
        },
        {
            kunci: "jam_kerja",
            nilai: "Senin - Jumat: 08:00 - 15:00 WIB",
            kategori: "pelayanan",
        },
        {
            kunci: "sosmed_facebook",
            nilai: "https://facebook.com/desapondokrejo",
            kategori: "sosial_media",
        },
        {
            kunci: "sosmed_instagram",
            nilai: "https://instagram.com/desapondokrejo",
            kategori: "sosial_media",
        },
        {
            kunci: "sosmed_youtube",
            nilai: "https://youtube.com/desapondokrejo",
            kategori: "sosial_media",
        },
        {
            kunci: "rekening_bri",
            nilai: "1234-5678-9012-3456 a.n. Kalurahan Pondokrejo",
            kategori: "keuangan",
        },
        {
            kunci: "rekening_bni",
            nilai: "9876-5432-1098-7654 a.n. Kalurahan Pondokrejo",
            kategori: "keuangan",
        },
    ];

    // Create konfigurasi
    for (const konfig of konfigurasiData) {
        await prisma.konfigurasi.upsert({
            where: { kunci: konfig.kunci },
            update: {
                nilai: konfig.nilai,
                kategori: konfig.kategori,
            },
            create: konfig,
        });
    }

    console.log(`
Database seeded successfully with:
  - Users: ${await prisma.pengguna.count()} users
  - Berita: ${await prisma.berita.count()} artikel
  - Pengumuman: ${await prisma.pengumuman.count()} pengumuman
  - SDGs Progress: ${await prisma.sDGsProgress.count()} goals
  - Lokasi Interaktif: ${await prisma.lokasiInteraktif.count()} lokasi
  - Community Polls: ${await prisma.communityPoll.count()} polling
  - Live Statistics: ${await prisma.liveStatistics.count()} statistik
  - Emergency Alerts: ${await prisma.emergencyAlert.count()} alerts
  - Layanan Permohonan: ${await prisma.layananPermohonan.count()} permohonan
  - Proyek: ${await prisma.proyek.count()} proyek
  - Kegiatan: ${await prisma.kegiatan.count()} kegiatan
  - Konfigurasi: ${await prisma.konfigurasi.count()} konfigurasi
  `);
}

main()
    .catch(() => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
