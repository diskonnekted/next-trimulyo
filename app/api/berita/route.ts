import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { ApiResponse } from "@/lib/api-response";
import { createSuccessResponse, createErrorResponse, createValidationErrorResponse } from "@/lib/api-response";

// Mock data for berita (will be replaced with database queries)
const mockBerita = [
    {
        id: 1,
        judul: "Pembangunan Menuju Kemajuan dan Kemandirian",
        slug: "pembangunan-menuju-kemajuan-dan-kemandirian",
        ringkasan: "Pembangunan desa merupakan salah satu upaya penting dalam meningkatkan kesejahteraan masyarakat dan kualitas hidup warga.",
        konten: `
            <p>Pembangunan desa merupakan salah satu upaya penting dalam meningkatkan kesejahteraan masyarakat dan kualitas hidup warga. Berbagai program pembangunan terus dijalankan secara bertahap, baik yang bersumber dari dana pemerintah maupun swadaya masyarakat.</p>
            <p>Fokus utama pembangunan desa terletak pada perbaikan infrastruktur dasar seperti jalan, jembatan, saluran irigasi, serta fasilitas umum lainnya. Dalam beberapa tahun terakhir, telah dilakukan peningkatan kualitas jalan lingkungan agar akses antarwilayah menjadi lebih mudah. Pembangunan dan perbaikan saluran air juga dilakukan untuk mendukung kegiatan pertanian, yang menjadi sumber penghidupan utama masyarakat.</p>
            <p>Selain infrastruktur fisik, pemerintah desa juga mendorong pembangunan di bidang pendidikan dan kesehatan. Renovasi gedung sekolah, penyediaan fasilitas belajar, serta peningkatan kualitas tenaga pendidik menjadi perhatian utama agar anak-anak desa mendapat akses pendidikan yang lebih baik. Di bidang kesehatan, pembangunan posyandu dan peningkatan layanan kesehatan dasar turut membantu menjaga kesejahteraan masyarakat.</p>
            <p>Bidang perekonomian desa juga mendapat perhatian melalui pembentukan dan penguatan Badan Usaha Milik Desa (BUMDes). Melalui BUMDes, warga dapat mengembangkan usaha bersama seperti perdagangan hasil pertanian, simpan pinjam, dan pengelolaan wisata desa. Kegiatan ini tidak hanya menciptakan lapangan kerja, tetapi juga meningkatkan pendapatan masyarakat secara berkelanjutan.</p>
            <p>Selain itu, pembangunan desa juga diarahkan untuk memperkuat ketahanan sosial dan lingkungan. Program penghijauan, pengelolaan sampah, serta pelatihan kebencanaan dilakukan agar masyarakat lebih siap menghadapi perubahan iklim dan menjaga kelestarian alam.</p>
            <p>Seluruh kegiatan pembangunan ini dilaksanakan dengan semangat gotong royong dan partisipasi aktif masyarakat. Warga terlibat mulai dari tahap perencanaan hingga pelaksanaan agar hasil pembangunan benar-benar sesuai dengan kebutuhan bersama.</p>
            <p>Secara keseluruhan, pembangunan desa menunjukkan kemajuan yang positif. Melalui kerja sama antara pemerintah dan masyarakat, diharapkan desa dapat terus berkembang menjadi wilayah yang mandiri, produktif, dan berdaya saing, sekaligus tetap menjaga nilai-nilai kebersamaan yang menjadi ciri khas kehidupan pedesaan.</p>
        `,
        gambar: "/images/berita/infrastruktur.jpg",
        kategori: "Pembangunan",
        status: "PUBLISHED",
        publishedAt: "2026-02-12T10:00:00Z",
        createdAt: "2026-02-12T09:30:00Z",
        updatedAt: "2026-02-12T10:00:00Z",
        penulis: "Admin Kalurahan",
        views: 150,
    },
    {
        id: 2,
        judul: "Program Pembangunan Infrastruktur Tahun 2025",
        slug: "program-pembangunan-infrastruktur-tahun-2025",
        ringkasan:
            "Pemerintah Kalurahan Trimulyo mengalokasikan dana untuk pembangunan infrastruktur jalan dan drainase.",
        konten: "Pemerintah Kalurahan Trimulyo dalam tahun anggaran 2025 mengalokasikan dana pembangunan sebesar Rp 2.5 Miliar...",
        gambar: "/images/berita/infrastruktur.jpg",
        kategori: "Pembangunan",
        status: "PUBLISHED",
        publishedAt: "2025-10-23T14:30:00Z",
        createdAt: "2025-10-23T13:00:00Z",
        updatedAt: "2025-10-23T14:30:00Z",
        penulis: "Bagian Pembangunan",
        views: 89,
    },
    {
        id: 3,
        judul: "Vaksinasi COVID-19 Tahap Lanjutan",
        slug: "vaksinasi-covid-19-tahap-lanjutan",
        ringkasan: "Puskesmas Pembantu Kalurahan Trimulyo menyelenggarakan vaksinasi COVID-19 tahap lanjutan.",
        konten: "Puskesmas Pembantu Kalurahan Trimulyo kembali menyelenggarakan vaksinasi COVID-19 tahap lanjutan untuk dosis ketiga...",
        gambar: "/images/berita/vaksinasi.jpg",
        kategori: "Kesehatan",
        status: "PUBLISHED",
        publishedAt: "2025-10-22T08:00:00Z",
        createdAt: "2025-10-21T16:00:00Z",
        updatedAt: "2025-10-22T08:00:00Z",
        penulis: "Bidang Kesehatan",
        views: 234,
    },
];

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("halaman") ?? "1");
        const limit = parseInt(searchParams.get("limit") ?? "10");
        const kategori = searchParams.get("kategori");
        const search = searchParams.get("search");

        // Filter berita based on parameters
        let filteredBerita = mockBerita.filter((berita) => berita.status === "PUBLISHED");

        if (kategori) {
            filteredBerita = filteredBerita.filter(
                (berita) => berita.kategori.toLowerCase() === kategori.toLowerCase()
            );
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filteredBerita = filteredBerita.filter(
                (berita) =>
                    berita.judul.toLowerCase().includes(searchLower) ||
                    berita.ringkasan.toLowerCase().includes(searchLower) ||
                    berita.konten.toLowerCase().includes(searchLower)
            );
        }

        // Pagination
        const total = filteredBerita.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const berita = filteredBerita.slice(startIndex, endIndex);

        const meta = {
            total,
            halaman: page,
            perHalaman: limit,
            totalHalaman: totalPages,
        };

        return NextResponse.json(createSuccessResponse(berita, "Daftar berita berhasil dimuat", meta));
    } catch {
        return NextResponse.json(createErrorResponse("INTERNAL_SERVER_ERROR", "Terjadi kesalahan saat memuat berita"), {
            status: 500,
        });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body = await request.json();

        // Basic validation
        const validationErrors: Record<string, string> = {};
        if (!body.judul) validationErrors.judul = "Judul wajib diisi";
        if (!body.konten) validationErrors.konten = "Konten wajib diisi";

        if (Object.keys(validationErrors).length > 0) {
            return NextResponse.json(createValidationErrorResponse(validationErrors), { status: 400 });
        }

        // Mock creating a new berita
        const newBerita = {
            id: mockBerita.length + 1,
            judul: body.judul,
            slug: body.judul.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            ringkasan: body.ringkasan ?? "",
            konten: body.konten,
            gambar: body.gambar ?? null,
            kategori: body.kategori ?? "umum",
            status: body.status ?? "DRAFT",
            publishedAt: body.status === "PUBLISHED" ? new Date().toISOString() : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            penulis: body.penulis ?? "Admin",
            views: 0,
        };

        return NextResponse.json(createSuccessResponse(newBerita, "Berita berhasil dibuat"), { status: 201 });
    } catch {
        return NextResponse.json(
            createErrorResponse("INTERNAL_SERVER_ERROR", "Terjadi kesalahan saat membuat berita"),
            { status: 500 }
        );
    }
}
