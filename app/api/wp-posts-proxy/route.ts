import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/api-response";
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response";

const WP_API_URL = "https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const perPage = searchParams.get("per_page") || "20";
        const embed = searchParams.get("_embed") || "1";

        const url = `${WP_API_URL}?per_page=${perPage}&_embed=${embed}`;
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "User-Agent": "Mozilla/5.0 (compatible; Trimulyo-Proxy/1.0)",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                createErrorResponse("BAD_GATEWAY", `WordPress returned ${response.status}`),
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(
            createSuccessResponse(data, "Posts berhasil dimuat dari WordPress")
        );
    } catch (error) {
        console.error("wp-posts-proxy error:", error);
        return NextResponse.json(
            createErrorResponse("INTERNAL_SERVER_ERROR", "Gagal memuat data dari WordPress"),
            { status: 500 }
        );
    }
}
