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

            // 1. Try fetching via WordPress REST API (Primary Source - trimulyosid.slemankab.go.id)
            try {
                const wpResponse = await fetch("/api/wp-posts");
                if (wpResponse.ok) {
                    const wpJson = await wpResponse.json();
                    const wpPosts = wpJson?.data ?? [];
                    if (Array.isArray(wpPosts) && wpPosts.length > 0) {
                        const transformedWpNews = transformWordPressPosts(wpPosts);
                        setNews(transformedWpNews.slice(0, limit));
                        return;
                    }
                }
            } catch (e) {
                console.error("WordPress API fetch failed", e);
            }

            // 2. Fallback: Try fetching via OpenSID Proxy
            try {
                const openSidResponse = await fetch("/api/opensid-proxy");
                if (openSidResponse.ok) {
                    const openSidData = await openSidResponse.json();
                    if (openSidData && Array.isArray(openSidData.data) && openSidData.data.length > 0) {
                        const transformedOpenSidNews = transformOpenSidPosts(openSidData.data);
                        const sortedNews = transformedOpenSidNews.sort((a, b) => {
                            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                        });
                        setNews(sortedNews.slice(0, limit));
                        return;
                    }
                }
            } catch (e) {
                console.error("OpenSID Proxy fetch failed", e);
            }

            // 3. Fallback: Try fetching via our News Proxy (Server-side)
            try {
                const proxyResponse = await fetch("/api/external-news");
                if (proxyResponse.ok) {
                    const data: NewsResponse = await proxyResponse.json();
                    if (data.success && data.data && data.data.length > 0) {
                        const sortedNews = data.data.sort((a, b) => {
                            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                        });
                        setNews(sortedNews.slice(0, limit));
                        return;
                    }
                }
            } catch (e) {
                console.warn("News Proxy fetch failed", e);
            }

            // If all failed
            setNews([]);
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

// Helper to transform WordPress posts from our /api/wp-posts endpoint
// (data is already transformed, not raw WordPress format)
function transformWordPressPosts(posts: any[]): NewsItem[] {
    return posts.map((post: any) => {
        const content = post.content || "";
        const wordCount = cleanContent(content).split(/\s+/).length;
        const readTime = post.readingTime ?? Math.max(1, Math.ceil(wordCount / 200));

        // Handle categories - can be array of objects or strings
        let categories: Array<{ id: number; name: string; slug: string }> = [];
        if (post.categories && Array.isArray(post.categories)) {
            categories = post.categories.map((c: any) => ({
                id: c.id ?? 0,
                name: c.name ?? "Berita",
                slug: c.slug ?? "berita",
            }));
        }

        return {
            id: post.id?.toString() ?? Math.random().toString(),
            title: post.title ?? "Tanpa Judul",
            slug: post.slug ?? `post-${post.id}`,
            excerpt: post.excerpt ? post.excerpt.substring(0, 150) + "..." : "",
            content: content,
            featuredImage: post.featuredImage ?? null,
            author: {
                name: post.author?.name ?? "Admin Kalurahan",
                avatar: post.author?.avatar ?? "/images/default-avatar.png",
            },
            category: categories[0]?.name ?? "Berita",
            categories: categories.length > 0 ? categories : [{ id: 0, name: "Berita", slug: "berita" }],
            tags: (post.tags ?? []).map((t: any) => ({ id: t.id ?? 0, name: t.name ?? "", slug: t.slug ?? "" })),
            publishedAt: post.date ?? new Date().toISOString(),
            updatedAt: post.modified ?? post.date ?? new Date().toISOString(),
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
    const normalizeImageUrl = (raw: string | null): string | null => {
        if (!raw) return null;
        let urlStr = raw.trim();
        
        // Base URL for OpenSID
        const base = "https://trimulyo.sleman-desa.id";
        
        try {
            // Handle relative paths starting with /
            if (urlStr.startsWith("/")) {
                return `${base}${urlStr}`;
            }
            
            // Handle filenames only (OpenSID default location)
            if (!urlStr.includes("/")) {
                return `${base}/desa/upload/artikel/sedang_${urlStr}`;
            }
            
            // Handle absolute URLs - force HTTPS and ensure correct domain
            if (urlStr.startsWith("http://") || urlStr.startsWith("https://")) {
                const u = new URL(urlStr);
                // If it's pointing to the old http domain or IP, force it to the https domain
                // But mostly we just want to ensure it's https
                return u.toString().replace(/^http:\/\//i, "https://");
            }
            
            return urlStr;
        } catch (e) {
            // Fallback for weird formats
            return `${base}/desa/upload/artikel/sedang_${urlStr}`;
        }
    };

    return posts.map((post: any) => {
        const attrs = post.attributes || {};
        const content = attrs.isi || "";
        const wordCount = cleanContent(content).split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);
        
        return {
            id: post.id?.toString() || Math.random().toString(),
            title: attrs.judul || "Tanpa Judul",
            slug: attrs.slug || attrs.url_slug || `post-${post.id}`,
            excerpt: cleanContent(content).substring(0, 150) + "...",
            content: content,
            featuredImage: normalizeImageUrl(attrs.gambar),
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
