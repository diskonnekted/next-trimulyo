import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { ApiResponse } from "@/lib/api-response";
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response";

const mockBerita = [
    {
        id: 1,
        judul: "Pembangunan Kalurahan Trimulyo",
        slug: "pembangunan-trimulyo",
        ringkasan: "Pembangunan berkelanjutan di Kalurahan Trimulyo.",
        konten: "Isi berita pembangunan.",
        gambar: "/images/berita/infrastruktur.jpg",
        kategori: "Pembangunan",
        status: "PUBLISHED",
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        penulis: "Admin",
        views: 100,
    }
];

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("halaman") ?? "1";
        const limit = searchParams.get("limit") ?? "10";

        try {
            const sidUrl = `https://trimulyo.sleman-desa.id/internal_api/berita?per_page=${limit}&page=${page}`;
            const response = await fetch(sidUrl, { 
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(10000)
            });
            
            if (response.ok) {
                const sidData = await response.json();
                if (sidData && sidData.data) {
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

                    return NextResponse.json(createSuccessResponse(berita, "Success", {
                        total: sidData.total || berita.length,
                        halaman: parseInt(page),
                        perHalaman: parseInt(limit),
                        totalHalaman: 1,
                    }));
                }
            }
        } catch (e) {}

        return NextResponse.json(createSuccessResponse(mockBerita, "Fallback"));
    } catch (error) {
        return NextResponse.json(createErrorResponse("ERROR", "Fail"), { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    return NextResponse.json(createSuccessResponse({}, "Success"), { status: 201 });
}
