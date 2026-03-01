import { NextResponse } from "next/server";

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
    return text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"');
}

export async function GET() {
    try {
        // Fetch from WordPress API with fallback for 403 or other errors
        const wpApiUrl = "https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts?per_page=10&_embed";
        
        const response = await fetch(wpApiUrl, {
            next: { revalidate: 3600 },
            headers: {
                // Some WP installations block requests without user agent
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!response.ok) {
            console.error(`WordPress API returned status: ${response.status}`);
            // Return empty data instead of throwing to prevent build failure
            return NextResponse.json({
                data: [],
                meta: { pagination: { total: 0 } },
                message: "News temporarily unavailable"
            });
        }

        const posts = await response.json();

        // Transform WordPress data to OpenSID format
        const articles = posts.map((post: any) => {
            // Get featured image URL
            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
            const imageUrl = featuredMedia?.source_url || null;

            // Get author name
            const author = post._embedded?.['author']?.[0];
            const authorName = author?.name || "Admin Kalurahan";

            return {
                id: post.id.toString(),
                attributes: {
                    judul: decodeHtmlEntities(post.title.rendered),
                    slug: post.slug,
                    url_slug: post.slug,
                    isi: post.content.rendered,
                    gambar: imageUrl,
                    tgl_upload: new Date(post.date).toLocaleString('id-ID', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                    }).replace(/\//g, '-').replace(',', ''),
                    hit: 0,
                    enabled: "1",
                    author: {
                        id: "1",
                        nama: authorName,
                        username: "admin"
                    },
                    category: {
                        id: "99", // ID khusus untuk Berita Resmi
                        kategori: "Berita Resmi",
                        slug: "berita-resmi"
                    }
                }
            };
        });

        return NextResponse.json({
            data: articles,
            meta: { pagination: { total: articles.length } }
        });
    } catch (error) {
        console.error("Error fetching WordPress news:", error);
        return NextResponse.json(
            { error: "Failed to fetch news" },
            { status: 500 }
        );
    }
}
