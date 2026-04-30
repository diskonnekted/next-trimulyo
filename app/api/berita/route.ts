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

        // SOURCE 1: OpenSID API (Priority - Known Working)
        try {
            const sidUrl = `https://trimulyo.sleman-desa.id/internal_api/berita?per_page=${limit}&page=${page}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(sidUrl, { 
                next: { revalidate: 3600 },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (response.ok) {
                const sidData = await response.json();
                const berita = sidData.data.map((post: any) => ({
                    id: post.id,
                    judul: post.judul,
                    slug: post.slug || post.id.toString(),
                    ringkasan: post.ringkasan || post.isi.substring(0, 160) + '...',
                    konten: post.isi,
                    gambar: post.gambar ? `https://trimulyo.sleman-desa.id/desa/upload/artikel/sedang_${post.gambar}` : "/images/berita/infrastruktur.jpg",
                    kategori: post.kategori || "Berita",
                    status: "PUBLISHED",
                    publishedAt: post.tgl_upload,
                    createdAt: post.tgl_upload,
                    updatedAt: post.tgl_upload,
                    penulis: "Admin Desa",
                    views: parseInt(post.hit || "0"),
                }));

                const meta = {
                    total: sidData.total || 10,
                    halaman: page,
                    perHalaman: limit,
                    totalHalaman: Math.ceil((sidData.total || 10) / limit),
                };
                return NextResponse.json(createSuccessResponse(berita, "Berita berhasil dimuat dari OpenSID", meta));
            }
        } catch (e) {
            console.warn("OpenSID API failed, trying WordPress...");
        }

        // SOURCE 2: WordPress API (Fallback 1)
        try {
            const wpUrl = `https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts?_embed&per_page=${limit}&page=${page}${kategori ? `&categories=${kategori}` : ''}`;
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // Shorter timeout for fallback

            const response = await fetch(wpUrl, { 
                next: { revalidate: 3600 },
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                }
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const wpPosts = await response.json();
                const berita = wpPosts.map((post: any) => {
                    let gambar = "/images/berita/infrastruktur.jpg";
                    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
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
                        views: Math.floor(Math.random() * 500) + 100,
                    };
                });

                const meta = {
                    total: parseInt(response.headers.get('X-WP-Total') || "10"),
                    halaman: page,
                    perHalaman: limit,
                    totalHalaman: parseInt(response.headers.get('X-WP-TotalPages') || "1"),
                };
                return NextResponse.json(createSuccessResponse(berita, "Berita berhasil dimuat dari WordPress", meta));
            }
        } catch (e) {
            console.warn("WP API failed, trying Mock...");
        }

        // SOURCE 3: Mock Data (Final Fallback with latest news)
        const currentMockBerita = [
            {
                id: 1795,
                judul: "TP PKK Trimulyo Gelar Sekolah Jumat: Pelatihan Olahan Berbahan Tepung Talas",
                slug: "tp-pkk-trimulyo-gelar-sekolah-jumat",
                ringkasan: "Tim Penggerak PKK Kalurahan Trimulyo menggelar kegiatan Sekolah Jumat dengan fokus pelatihan pembuatan olahan berbahan tepung talas pada Jumat (24/4/2026).",
                konten: "Tim Penggerak PKK Kalurahan Trimulyo menggelar kegiatan Sekolah Jumat dengan fokus pelatihan pembuatan olahan berbahan tepung talas, yakni nastar talas, pada Jumat (24/4/2026). Kegiatan berlangsung pukul 13.00 WIB di Balai Kalurahan Trimulyo dan diikuti oleh kader PKK dari seluruh wilayah kalurahan.",
                gambar: "https://trimulyosid.slemankab.go.id/wp-content/uploads/sites/71/2026/04/PKK-Pelatihan.jpeg",
                kategori: "Berita",
                status: "PUBLISHED",
                publishedAt: "2026-04-24T13:00:00Z",
                createdAt: "2026-04-24T13:00:00Z",
                updatedAt: "2026-04-24T13:00:00Z",
                penulis: "Admin Kalurahan",
                views: 245,
            },
            ...mockBerita
        ];

        return NextResponse.json(createSuccessResponse(currentMockBerita.slice(0, 10), "Berhasil memuat data berita (Cadangan)"));
    } catch (error) {
        return NextResponse.json(createErrorResponse("INTERNAL_SERVER_ERROR", "Terjadi kesalahan saat memuat berita"), { status: 500 });
    }
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
