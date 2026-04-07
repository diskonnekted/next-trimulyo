import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { ApiResponse } from "@/lib/api-response";
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response";
import { fetchWpPosts, fetchWpCategories, fetchWpPostBySlug } from "@/lib/wordpress";

// GET /api/wp-posts - Fetch posts from WordPress
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const { searchParams } = new URL(request.url);
        const action = searchParams.get("action");

        // Get single post by slug
        if (action === "detail") {
            const slug = searchParams.get("slug");
            if (!slug) {
                return NextResponse.json(
                    createErrorResponse("BAD_REQUEST", "Parameter slug diperlukan"),
                    { status: 400 }
                );
            }

            const post = await fetchWpPostBySlug(slug);
            if (!post) {
                return NextResponse.json(
                    createErrorResponse("NOT_FOUND", "Postingan tidak ditemukan"),
                    { status: 404 }
                );
            }

            return NextResponse.json(createSuccessResponse(post, "Postingan berhasil dimuat"));
        }

        // Get categories
        if (action === "categories") {
            const categories = await fetchWpCategories();
            return NextResponse.json(createSuccessResponse(categories, "Kategori berhasil dimuat"));
        }

        // Get list of posts (default)
        const page = parseInt(searchParams.get("page") ?? "1");
        const perPage = parseInt(searchParams.get("per_page") ?? "20");
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        let result = await fetchWpPosts(page, Math.min(perPage, 100));

        // Filter by category if specified
        if (category) {
            // Re-fetch with category filter using WordPress API
            const url = new URL("https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts");
            url.searchParams.set("per_page", String(Math.min(perPage, 100)));
            url.searchParams.set("page", String(page));
            url.searchParams.set("categories", category);
            url.searchParams.set("_embed", "1");

            const response = await fetch(url.toString());
            if (response.ok) {
                const posts = await response.json();
                const total = parseInt(response.headers.get("X-WP-Total") ?? "0");
                const totalPages = parseInt(response.headers.get("X-WP-TotalPages") ?? "0");
                result = { posts: posts, total, totalPages };
            }
        }

        // Search posts
        if (search) {
            const url = new URL("https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts");
            url.searchParams.set("per_page", String(Math.min(perPage, 100)));
            url.searchParams.set("page", String(page));
            url.searchParams.set("search", search);
            url.searchParams.set("_embed", "1");

            const response = await fetch(url.toString());
            if (response.ok) {
                const posts = await response.json();
                const total = parseInt(response.headers.get("X-WP-Total") ?? "0");
                const totalPages = parseInt(response.headers.get("X-WP-TotalPages") ?? "0");
                result = { posts, total, totalPages };
            }
        }

        const meta = {
            total: result.total,
            halaman: page,
            perHalaman: Math.min(perPage, 100),
            totalHalaman: result.totalPages,
        };

        return NextResponse.json(createSuccessResponse(result.posts, "Daftar postingan berhasil dimuat", meta));
    } catch {
        return NextResponse.json(
            createErrorResponse("INTERNAL_SERVER_ERROR", "Terjadi kesalahan saat memuat postingan"),
            { status: 500 }
        );
    }
}
