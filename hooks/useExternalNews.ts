import { useState, useEffect, useCallback } from "react";

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string | null;
    author: {
        name: string;
        avatar: string | null;
    };
    category: string;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    publishedAt: string;
    updatedAt: string;
    link: string;
    readTime: number;
    isBreaking: boolean;
    isFeatured: boolean;
    isPinned: boolean;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
    isBookmarked: boolean;
}

interface NewsResponse {
    success: boolean;
    data: NewsItem[];
    total: number;
    error?: string;
}

// Helper to decode HTML entities
function decodeHtmlEntities(text: string): string {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent || "";
}

// Helper to clean HTML content
function cleanContent(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
}

export function useExternalNews(limit: number = 10) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch directly from WordPress API to avoid server-side blocking
            const response = await fetch(`https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts?per_page=${limit}&_embed`);
            
            if (!response.ok) {
                // If direct fetch fails (e.g. CORS), try the proxy route as fallback
                console.warn(`Direct WP fetch failed (${response.status}), trying proxy...`);
                const proxyResponse = await fetch("/api/external-news");
                if (!proxyResponse.ok) throw new Error(`Proxy error: ${proxyResponse.status}`);
                
                const data: NewsResponse = await proxyResponse.json();
                if (data.success) {
                    setNews(data.data.slice(0, limit));
                } else {
                    setNews([]);
                }
                return;
            }
            
            const posts = await response.json();

            // Transform WordPress data
            const transformedNews: NewsItem[] = posts.map((post: any) => {
                const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                const imageUrl = featuredMedia?.source_url || null;
                const author = post._embedded?.['author']?.[0];
                const authorName = author?.name || "Admin Kalurahan";
                
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
                    author: {
                        name: authorName,
                        avatar: "/images/default-avatar.png",
                    },
                    category: "Berita Desa",
                    categories: [{ id: 1, name: "Berita Desa", slug: "berita-desa" }],
                    tags: [],
                    publishedAt: post.date,
                    updatedAt: post.modified,
                    link: `/berita/${post.slug}`,
                    readTime: Math.max(1, readTime),
                    isBreaking: false,
                    isFeatured: false,
                    isPinned: false,
                    viewCount: 0,
                    likeCount: 0,
                    commentCount: 0,
                    shareCount: 0,
                    isBookmarked: false,
                };
            });

            setNews(transformedNews);
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Failed to connect to news server");
            setNews([]);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    return { news, loading, error, refetch: fetchNews };
}
