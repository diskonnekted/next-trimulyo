import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/api-response";
import { createSuccessResponse, createErrorResponse, createValidationErrorResponse } from "@/lib/api-response";

const mockBerita = [
    {
        id: 1,
        judul: "Pembangunan Menuju Kemajuan dan Kemandirian",
        slug: "pembangunan-menuju-kemajuan-dan-kemandirian",
        ringkasan: "Pembangunan kalurahan merupakan salah satu upaya penting dalam meningkatkan kesejahteraan masyarakat dan kualitas hidup warga.",
        konten: `<p>Pembangunan kalurahan merupakan salah satu upaya penting dalam meningkatkan kesejahteraan masyarakat dan kualitas hidup warga.</p>`,
        gambar: "/images/berita/infrastruktur.jpg",
        kategori: "Pembangunan",
        status: "PUBLISHED",
        publishedAt: "2026-02-12T10:00:00Z",
        createdAt: "2026-02-12T09:30:00Z",
        updatedAt: "2026-02-12T10:00:00Z",
        penulis: "Admin Kalurahan",
        views: 150,
    }
];

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("halaman") ?? "1");
        const limit = parseInt(searchParams.get("limit") ?? "10");

        try {
            const sidUrl = `https://trimulyo.sleman-desa.id/internal_api/berita?per_page=${limit}&page=${page}`;
            const response = await fetch(sidUrl, { 
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(15000)
            });
            
            if (response.ok) {
                const sidData = await response.json();
                if (sidData && sidData.data && sidData.data.length > 0) {
                    const berita = sidData.data.map((post: any) => ({
                        id: post.id,
                        judul: post.judul,
                        slug: post.slug || post.id.toString(),
                        ringkasan: post.ringkasan || (post.isi ? post.isi.substring(0, 160).replace(/<[^>]*>?/gm, '') + '...' : ""),
                        konten: post.isi || "",
                        gambar: post.gambar ? `https://trimulyo.sleman-desa.id/desa/upload/artikel/sedang_${post.gambar}` : "/images/berita/infrastruktur.jpg",
                        kategori: post.kategori || "Berita",
                        status: "PUBLISHED",
                        publishedAt: post.tgl_upload || new Date().toISOString(),
                        createdAt: post.tgl_upload || new Date().toISOString(),
                        updatedAt: post.tgl_upload || new Date().toISOString(),
                        penulis: "Admin Desa",
                        views: parseInt(post.hit || "0"),
                    }));

                    return NextResponse.json(createSuccessResponse(berita, "Berita OpenSID (Cached)", {
                        total: sidData.total || berita.length,
                        halaman: page,
                        perHalaman: limit,
                        totalHalaman: Math.ceil((sidData.total || berita.length) / limit),
                    }));
                }
            }
        } catch (e) {
            console.error("Fetch Error:", e);
        }

        const latestMock = [
            {
                id: 1795,
                judul: "TP PKK Trimulyo Gelar Sekolah Jumat: Pelatihan Olahan Berbahan Tepung Talas",
                slug: "tp-pkk-trimulyo-gelar-sekolah-jumat",
                ringkasan: "Tim Penggerak PKK Kalurahan Trimulyo menggelar kegiatan Sekolah Jumat dengan fokus pelatihan pembuatan olahan berbahan tepung talas pada Jumat (24/4/2026).",
                konten: "Pelatihan pembuatan olahan berbahan tepung talas.",
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
        return NextResponse.json(createSuccessResponse(latestMock.slice(0, limit), "Berita Cadangan"));
    } catch (error) {
        return NextResponse.json(createErrorResponse("ERROR", "Gagal memuat berita"), { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body = await request.json();
        const validationErrors: Record<string, string> = {};
        if (!body.judul) validationErrors.judul = "Judul wajib diisi";
        if (!body.konten) validationErrors.konten = "Konten wajib diisi";

        if (Object.keys(validationErrors).length > 0) {
            return NextResponse.json(createValidationErrorResponse(validationErrors), { status: 400 });
        }

        const newBerita = {
            id: 999,
            judul: body.judul,
            slug: "test-slug",
            ringkasan: body.ringkasan ?? "",
            konten: body.konten,
            gambar: body.gambar ?? null,
            kategori: body.kategori ?? "umum",
            status: body.status ?? "DRAFT",
            publishedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            penulis: body.penulis ?? "Admin",
            views: 0,
        };

        return NextResponse.json(createSuccessResponse(newBerita, "Berita berhasil dibuat"), { status: 201 });
    } catch {
        return NextResponse.json(createErrorResponse("ERROR", "Gagal"), { status: 500 });
    }
}
