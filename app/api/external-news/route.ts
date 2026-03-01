import { NextResponse } from "next/server";
import { fetchLocalAPI } from "@/lib/api-helpers";

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
        // Fetch from WordPress API
        const response = await fetch("https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts?per_page=10&_embed", {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const posts = await response.json();

        // Transform WordPress data to match our application structure
        const transformedPosts = posts.map((post: any) => {
            // Get featured image URL
            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
            const imageUrl = featuredMedia?.source_url || null;

            // Get author name
            const author = post._embedded?.['author']?.[0];
            const authorName = author?.name || "Admin Kalurahan";

            // Calculate reading time
            const content = post.content.rendered;
            const wordCount = cleanContent(content).split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200);

            return {
                id: post.id.toString(),
                title: decodeHtmlEntities(post.title.rendered),
                slug: post.slug,
                excerpt: decodeHtmlEntities(cleanContent(post.excerpt.rendered)).substring(0, 150) + "...",
                content: post.content.rendered,
                featuredImage: imageUrl,
                readingTime: Math.max(1, readTime),
                author: {
                    name: authorName,
                    avatar: "/images/default-avatar.png",
                },
                category: "Berita Desa",
                categories: [
                    {
                        id: 1,
                        name: "Berita Desa",
                        slug: "berita-desa",
                    }
                ],
                tags: [],
                publishedAt: post.date,
                updatedAt: post.modified,
                link: `/berita/${post.slug}`,
                viewCount: 0,
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
        console.error("Error fetching WordPress news:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch news",
                data: [],
            },
            { status: 500 }
        );
    }
}
