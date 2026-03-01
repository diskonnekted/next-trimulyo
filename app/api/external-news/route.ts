import { NextResponse } from "next/server";
import { fetchOpenSIDArsip } from "@/lib/api-helpers";

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
    return text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"');
}

// Helper to clean HTML content
function cleanContent(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
}

export async function GET() {
    try {
        // Updated to use OpenSID API as the source, consistent with other endpoints
        const response = await fetchOpenSIDArsip();

        if (!response.success) {
            console.error(`OpenSID API returned error:`, response.error);
            return NextResponse.json({
                success: true, 
                data: [],
                total: 0,
                message: "News temporarily unavailable"
            });
        }

        const openSidData = response.data as { data: any[] };
        const posts = openSidData.data || [];

        // Transform OpenSID data to match the expected format for this endpoint
        // This endpoint expects a slightly different structure than the direct OpenSID proxy
        const transformedPosts = posts.map((post: any) => {
            const attrs = post.attributes;
            
            // Handle image URL with robust normalization
            const normalizeImageUrl = (raw: string | null): string | null => {
                if (!raw) return null;
                let urlStr = raw.trim();
                const base = "https://trimulyo.sleman-desa.id";
                
                try {
                    if (urlStr.startsWith("/")) return `${base}${urlStr}`;
                    if (!urlStr.includes("/")) return `${base}/desa/upload/artikel/sedang_${urlStr}`;
                    if (urlStr.startsWith("http://") || urlStr.startsWith("https://")) {
                        return new URL(urlStr).toString().replace(/^http:\/\//i, "https://");
                    }
                    return urlStr;
                } catch {
                    return `${base}/desa/upload/artikel/sedang_${urlStr}`;
                }
            };
            
            const imageUrl = normalizeImageUrl(attrs.gambar);

            const content = attrs.isi || "";
            const wordCount = cleanContent(content).split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200);

            return {
                id: post.id.toString(),
                title: decodeHtmlEntities(attrs.judul),
                slug: attrs.slug || attrs.url_slug,
                excerpt: decodeHtmlEntities(cleanContent(content)).substring(0, 150) + "...",
                content: content,
                featuredImage: imageUrl,
                readingTime: Math.max(1, readTime),
                author: {
                    name: attrs.author?.nama || "Admin Kalurahan",
                    avatar: "/images/default-avatar.png",
                },
                category: attrs.category?.kategori || "Berita Desa",
                categories: [
                    {
                        id: parseInt(attrs.category?.id || "1"),
                        name: attrs.category?.kategori || "Berita Desa",
                        slug: attrs.category?.slug || "berita-desa",
                    }
                ],
                tags: [],
                publishedAt: attrs.tgl_upload,
                updatedAt: attrs.tgl_upload,
                link: `/berita/${attrs.slug || attrs.url_slug}`,
                viewCount: attrs.hit || 0,
                likeCount: 0,
                commentCount: 0,
                shareCount: 0,
                isBookmarked: false,
            };
        });

        return NextResponse.json({
            success: true,
            data: transformedPosts,
            total: transformedPosts.length,
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch news",
            },
            { status: 500 }
        );
    }
}
