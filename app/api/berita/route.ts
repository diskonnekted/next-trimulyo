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
        ringkasan: "Pembangunan kalurahan merupakan salah satu upaya penting dalam meningkatkan kesejahteraan masyarakat dan kualitas hidup warga.",
        konten: `
            <p>Pembangunan kalurahan merupakan salah satu upaya penting dalam meningkatkan kesejahteraan masyarakat dan kualitas hidup warga. Berbagai program pembangunan terus dijalankan secara bertahap, baik yang bersumber dari dana pemerintah maupun swadaya masyarakat.</p>
            <p>Fokus utama pembangunan kalurahan terletak pada perbaikan infrastruktur dasar seperti jalan, jembatan, saluran irigasi, serta fasilitas umum lainnya. Dalam beberapa tahun terakhir, telah dilakukan peningkatan kualitas jalan lingkungan agar akses antarwilayah menjadi lebih mudah. Pembangunan dan perbaikan saluran air juga dilakukan untuk mendukung kegiatan pertanian, yang menjadi sumber penghidupan utama masyarakat.</p>
            <p>Selain infrastruktur fisik, pemerintah kalurahan juga mendorong pembangunan di bidang pendidikan dan kesehatan. Renovasi gedung sekolah, penyediaan fasilitas belajar, serta peningkatan kualitas tenaga pendidik menjadi perhatian utama agar anak-anak kalurahan mendapat akses pendidikan yang lebih baik. Di bidang kesehatan, pembangunan posyandu dan peningkatan layanan kesehatan dasar turut membantu menjaga kesejahteraan masyarakat.</p>
            <p>Bidang perekonomian kalurahan juga mendapat perhatian melalui pembentukan dan penguatan Badan Usaha Milik Kalurahan (BUMDes). Melalui BUMDes, warga dapat mengembangkan usaha bersama seperti perdagangan hasil pertanian, simpan pinjam, dan pengelolaan wisata kalurahan. Kegiatan ini tidak hanya menciptakan lapangan kerja, tetapi juga meningkatkan pendapatan masyarakat secara berkelanjutan.</p>
            <p>Selain itu, pembangunan kalurahan juga diarahkan untuk memperkuat ketahanan sosial dan lingkungan. Program penghijauan, pengelolaan sampah, serta pelatihan kebencanaan dilakukan agar masyarakat lebih siap menghadapi perubahan iklim dan menjaga kelestarian alam.</p>
            <p>Seluruh kegiatan pembangunan ini dilaksanakan dengan semangat gotong royong dan partisipasi aktif masyarakat. Warga terlibat mulai dari tahap perencanaan hingga pelaksanaan agar hasil pembangunan benar-benar sesuai dengan kebutuhan bersama.</p>
            <p>Secara keseluruhan, pembangunan kalurahan menunjukkan kemajuan yang positif. Melalui kerja sama antara pemerintah dan masyarakat, diharapkan kalurahan dapat terus berkembang menjadi wilayah yang mandiri, produktif, dan berdaya saing, sekaligus tetap menjaga nilai-nilai kebersamaan yang menjadi ciri khas kehidupan pekalurahanan.</p>
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

        // Fetch from WordPress API
        // _embed is needed to get featured media and author info
        const wpUrl = `https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts?_embed&per_page=${limit}&page=${page}${kategori ? `&categories=${kategori}` : ''}`;
        
        const response = await fetch(wpUrl, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error("WP API response not ok");
        }

        const wpPosts = await response.json();

        // Map WP posts to our format
        const berita = wpPosts.map((post: any) => {
            // Extract featured image
            let gambar = "/images/berita/infrastruktur.jpg"; // fallback
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                gambar = post._embedded['wp:featuredmedia'][0].source_url;
            }

            return {
                id: post.id,
                judul: post.title.rendered,
                slug: post.slug,
                ringkasan: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
                konten: post.content.rendered,
                gambar: gambar,
                kategori: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Umum",
                status: "PUBLISHED",
                publishedAt: post.date,
                createdAt: post.date,
                updatedAt: post.modified,
                penulis: post._embedded?.author?.[0]?.name || "Admin Kalurahan",
                views: Math.floor(Math.random() * 500) + 100, // WP API doesn't provide views by default
            };
        });

        const meta = {
            total: parseInt(response.headers.get('X-WP-Total') || "10"),
            halaman: page,
            perHalaman: limit,
            totalHalaman: parseInt(response.headers.get('X-WP-TotalPages') || "1"),
        };

        return NextResponse.json(createSuccessResponse(berita, "Daftar berita berhasil dimuat dari WordPress resmi", meta));
    } catch (error) {
        console.error("WP News API Error, falling back to mock:", error);
        
        // Fallback to mock data
        const filteredBerita = mockBerita.filter((berita) => berita.status === "PUBLISHED");
        return NextResponse.json(createSuccessResponse(filteredBerita.slice(0, 10), "Memuat berita cadangan (Koneksi server utama sibuk)"));
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
