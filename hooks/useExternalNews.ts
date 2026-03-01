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

            // 1. Try fetching via OpenSID Proxy (Primary Source)
            // User requested to use OpenSID as the main source for consistency between localhost and production
            try {
                // console.log("Attempting to fetch from OpenSID Proxy...");
                const openSidResponse = await fetch("/api/opensid-proxy");
                if (openSidResponse.ok) {
                    const openSidData = await openSidResponse.json();
                    // OpenSID data structure: { data: Array<OpenSIDArticle>, ... }
                    if (openSidData && Array.isArray(openSidData.data) && openSidData.data.length > 0) {
                        const transformedOpenSidNews = transformOpenSidPosts(openSidData.data);
                        setNews(transformedOpenSidNews.slice(0, limit));
                        return;
                    }
                }
            } catch (e) {
                console.error("OpenSID Proxy fetch failed", e);
            }

            // 2. Fallback: Try fetching directly from WordPress API (Client-side)
            try {
                console.warn("OpenSID fetch failed/empty, falling back to WordPress...");
                const response = await fetch(`https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts?per_page=${limit}&_embed`);
                
                if (response.ok) {
                    const posts = await response.json();
                    const transformedNews = transformWordPressPosts(posts);
                    if (transformedNews.length > 0) {
                        setNews(transformedNews);
                        return;
                    }
                }
            } catch (e) {
                console.warn("Direct WP fetch failed, trying proxies...", e);
            }

            // 3. Fallback: Try fetching via our WP Proxy (Server-side)
            try {
                const proxyResponse = await fetch("/api/external-news");
                if (proxyResponse.ok) {
                    const data: NewsResponse = await proxyResponse.json();
                    if (data.success && data.data && data.data.length > 0) {
                        setNews(data.data.slice(0, limit));
                        return;
                    }
                }
            } catch (e) {
                console.warn("WP Proxy fetch failed", e);
            }

            // If all failed
            setNews([]);
            // Don't set error string to avoid scary UI, just show empty state or previous data
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

// Helper to transform WordPress posts
function transformWordPressPosts(posts: any[]): NewsItem[] {
    return posts.map((post: any) => {
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
}

// Helper to transform OpenSID posts
function transformOpenSidPosts(posts: any[]): NewsItem[] {
    return posts.map((post: any) => {
        const attrs = post.attributes || {};
        const content = attrs.isi || "";
        const wordCount = cleanContent(content).split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);
        
        // Handle image URLs properly
        let featuredImage = attrs.gambar;
        if (featuredImage && featuredImage.startsWith("/")) {
            // Prepend base URL for relative paths
            featuredImage = `https://trimulyo.sleman-desa.id${featuredImage}`;
        } else if (featuredImage && featuredImage.startsWith("http://")) {
            // Upgrade to HTTPS
            featuredImage = featuredImage.replace("http://", "https://");
        }
        
        return {
            id: post.id?.toString() || Math.random().toString(),
            title: attrs.judul || "Tanpa Judul",
            slug: attrs.slug || attrs.url_slug || `post-${post.id}`,
            excerpt: cleanContent(content).substring(0, 150) + "...",
            content: content,
            featuredImage: featuredImage || null,
            author: {
                name: attrs.author?.nama || "Admin",
                avatar: "/images/default-avatar.png",
            },
            category: attrs.category?.kategori || "Berita",
            categories: [{ id: 1, name: attrs.category?.kategori || "Berita", slug: "berita" }],
            tags: [],
            publishedAt: attrs.tgl_upload || new Date().toISOString(),
            updatedAt: attrs.tgl_upload || new Date().toISOString(),
            link: `/berita/${attrs.slug || attrs.url_slug}`,
            readTime: Math.max(1, readTime),
            isBreaking: false,
            isFeatured: false,
            isPinned: false,
            viewCount: attrs.hit || 0,
            likeCount: 0,
            commentCount: 0,
            shareCount: 0,
            isBookmarked: false,
        };
    });
}
