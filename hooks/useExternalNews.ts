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

function decodeHtmlEntities(text: string): string {
    try {
        const doc = new DOMParser().parseFromString(text, "text/html");
        return doc.documentElement.textContent || "";
    } catch {
        return text;
    }
}

function cleanContent(html: string): string {
    return html.replace(/<[^>]*>?/gm, "");
}

export function useExternalNews(limit: number = 10) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Use our unified internal API that handles all fallbacks
            try {
                const url = `/api/external-news?limit=${limit}`;
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    // API uses 'sukses' (Indonesian), not 'success'
                    const isSuccess = json.sukses === true || json.success === true;
                    const dataArray = Array.isArray(json.data) ? json.data : null;
                    if (isSuccess && dataArray && dataArray.length > 0) {
                        const transformed: NewsItem[] = dataArray.map((item: any) => ({
                            id: String(item.id),
                            title: item.judul || item.title || "Tanpa Judul",
                            slug: item.slug || `post-${item.id}`,
                            excerpt: item.ringkasan || item.excerpt || "",
                            content: item.konten || item.content || "",
                            featuredImage: item.gambar || item.featuredImage || null,
                            author: {
                                name: item.penulis || item.author?.name || "Admin Kalurahan",
                                avatar: null
                            },
                            category: item.kategori || item.category || "Berita",
                            categories: [{ id: 0, name: item.kategori || item.category || "Berita", slug: "berita" }],
                            tags: [],
                            publishedAt: item.publishedAt || new Date().toISOString(),
                            updatedAt: item.updatedAt || item.publishedAt || new Date().toISOString(),
                            link: `/berita/${item.slug}`,
                            readTime: Math.max(1, Math.ceil(((item.konten || item.content || "")).split(/\s+/).length / 200)),
                            isBreaking: false,
                            isFeatured: false,
                            isPinned: false,
                            viewCount: item.views || item.viewCount || 0,
                            likeCount: 0,
                            commentCount: 0,
                            shareCount: 0,
                            isBookmarked: false,
                        }));
                        console.log("[useExternalNews] Successfully loaded:", transformed.length, "articles");
                        setNews(transformed);
                        return;
                    }
                    console.warn("[useExternalNews] API response issue:", { sukses: json.sukses, dataLength: dataArray?.length });
                }
            } catch (e) {
                console.error("[useExternalNews] Internal API failed:", e);
                setNews([]);
            }
        } catch (err) {
            console.error("[useExternalNews] Fatal error:", err);
            setError(null);
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

function transformWordPressPosts(posts: any[]): NewsItem[] {
    return posts
        .filter((post) => post && post.title && post.slug)
        .map((post) => {
            try {
                const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
                const author = post._embedded?.author?.[0];
                const terms = post._embedded?.["wp:term"];

                let featuredImage: string | null = null;
                if (featuredMedia?.source_url) {
                    featuredImage = featuredMedia.source_url;
                    const sizes = featuredMedia.media_details?.sizes;
                    if (sizes?.full?.source_url) featuredImage = sizes.full.source_url;
                    else if (sizes?.large?.source_url) featuredImage = sizes.large.source_url;
                    else if (sizes?.medium_large?.source_url) featuredImage = sizes.medium_large.source_url;
                    else if (sizes?.medium?.source_url) featuredImage = sizes.medium.source_url;

                    if (featuredImage && featuredImage.startsWith("http://")) {
                        featuredImage = featuredImage.replace("http://", "https://");
                    }
                }

                let categories: Array<{ id: number; name: string; slug: string }> = [];
                if (terms && Array.isArray(terms[0])) {
                    categories = terms[0]
                        .filter((c: any) => c && c.slug !== "uncategorized")
                        .map((c: any) => ({
                            id: c.id ?? 0,
                            name: c.name ?? "Berita",
                            slug: c.slug ?? "berita",
                        }));
                }
                if (categories.length === 0) {
                    categories = [{ id: 0, name: "Berita", slug: "berita" }];
                }

                const tags = (terms?.[1] ?? [])
                    .filter((t: any) => t && t.name)
                    .map((t: any) => ({
                        id: t.id ?? 0,
                        name: t.name ?? "",
                        slug: t.slug ?? "",
                    }));

                const content = post.content?.rendered || "";
                const excerpt = post.excerpt?.rendered || "";
                const wordCount = cleanContent(content).split(/\s+/).filter(Boolean).length;

                return {
                    id: String(post.id ?? Math.random()),
                    title: decodeHtmlEntities(post.title?.rendered || "Tanpa Judul"),
                    slug: post.slug || `post-${post.id}`,
                    excerpt: decodeHtmlEntities(excerpt).substring(0, 150) + "...",
                    content: content,
                    featuredImage,
                    author: {
                        name: author?.name ?? "Admin Kalurahan",
                        avatar: author?.avatar_urls?.["48"] ?? null,
                    },
                    category: categories[0]?.name ?? "Berita",
                    categories,
                    tags,
                    publishedAt: post.date || new Date().toISOString(),
                    updatedAt: post.modified || post.date || new Date().toISOString(),
                    link: `/berita/${post.slug}`,
                    readTime: Math.max(1, Math.ceil(wordCount / 200)),
                    isBreaking: false,
                    isFeatured: false,
                    isPinned: false,
                    viewCount: 0,
                    likeCount: 0,
                    commentCount: 0,
                    shareCount: 0,
                    isBookmarked: false,
                };
            } catch (e) {
                console.warn("[transformWordPressPosts] Error:", post.id, e);
                return null;
            }
        })
        .filter(Boolean) as NewsItem[];
}

function transformOpenSidPosts(posts: any[]): NewsItem[] {
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

    return posts.map((post: any) => {
        const attrs = post.attributes || {};
        const content = attrs.isi || "";
        const wordCount = cleanContent(content).split(/\s+/).length;

        return {
            id: post.id?.toString() || String(Math.random()),
            title: attrs.judul || "Tanpa Judul",
            slug: attrs.slug || attrs.url_slug || `post-${post.id}`,
            excerpt: cleanContent(content).substring(0, 150) + "...",
            content: content,
            featuredImage: normalizeImageUrl(attrs.gambar),
            author: {
                name: attrs.author?.nama || "Admin",
                avatar: null,
            },
            category: attrs.category?.kategori || "Berita",
            categories: [{ id: 1, name: attrs.category?.kategori || "Berita", slug: "berita" }],
            tags: [],
            publishedAt: attrs.tgl_upload || new Date().toISOString(),
            updatedAt: attrs.tgl_upload || new Date().toISOString(),
            link: `/berita/${attrs.slug || attrs.url_slug}`,
            readTime: Math.max(1, Math.ceil(wordCount / 200)),
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
