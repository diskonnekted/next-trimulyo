import { env } from "process";

// WordPress REST API Configuration
const WP_CONFIG = {
    baseUrl: env.WORDPRESS_API_URL ?? "https://trimulyosid.slemankab.go.id",
    postsPerPage: 20,
    cacheTimeout: 60 * 60 * 1000, // 1 hour cache
};

// Cache for WordPress data
const wpCache = new Map<string, { data: unknown; timestamp: number }>();

function getCache(key: string) {
    const cached = wpCache.get(key);
    if (cached && Date.now() - cached.timestamp < WP_CONFIG.cacheTimeout) {
        return cached.data;
    }
    return null;
}

function setCache(key: string, data: unknown) {
    wpCache.set(key, { data, timestamp: Date.now() });
}

// WordPress Post types
interface WpMedia {
    source_url: string;
    alt_text: string;
    media_details?: {
        sizes?: {
            medium?: { source_url: string };
            medium_large?: { source_url: string };
            large?: { source_url: string };
            thumbnail?: { source_url: string };
            full?: { source_url: string };
        };
    };
}

interface WpPost {
    id: number;
    date: string;
    modified: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string; protected: boolean };
    excerpt: { rendered: string; protected: boolean };
    author: number;
    featured_media: number;
    categories: number[];
    tags: number[];
    _embedded?: {
        "wp:featuredmedia"?: WpMedia[];
        author?: Array<{
            id: number;
            name: string;
            slug: string;
            avatar_urls?: { "24": string; "48": string; "96": string };
        }>;
        "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
    };
}

interface WpCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
}

interface TransformedPost {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    date: string;
    modified: string;
    link: string;
    status: string;
    author: {
        id: number;
        name: string;
        avatar?: string;
    };
    featuredImage: string;
    featuredImageAlt: string;
    categories: Array<{ id: number; name: string; slug: string }>;
    tags: Array<{ id: number; name: string; slug: string }>;
    readingTime: number;
}

function calculateReadingTime(content: string): number {
    const plainText = content.replace(/<[^>]*>/g, "");
    const words = plainText.trim().split(/\s+/).filter((w) => w.length > 0).length;
    return Math.max(1, Math.ceil(words / 220));
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

function transformPost(post: WpPost): TransformedPost {
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const author = post._embedded?.author?.[0];
    const terms = post._embedded?.["wp:term"];
    const categories = (terms?.[0] ?? []).map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
    }));
    const tags = (terms?.[1] ?? []).map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
    }));

    let featuredImage = "/images/placeholder-news.jpg";
    let featuredImageAlt = "";

    if (featuredMedia) {
        // Prioritize larger image sizes: full > large > medium_large > medium
        featuredImage =
            featuredMedia.media_details?.sizes?.full?.source_url ??
            featuredMedia.media_details?.sizes?.large?.source_url ??
            featuredMedia.media_details?.sizes?.medium_large?.source_url ??
            featuredMedia.media_details?.sizes?.medium?.source_url ??
            featuredMedia.source_url ??
            "/images/placeholder-news.jpg";

        // Convert HTTP to HTTPS if needed
        if (featuredImage.startsWith("http://")) {
            featuredImage = featuredImage.replace("http://", "https://");
        }

        featuredImageAlt = featuredMedia.alt_text ?? "";
    }

    return {
        id: post.id,
        title: stripHtml(post.title.rendered),
        content: post.content.rendered,
        excerpt: stripHtml(post.excerpt.rendered),
        slug: post.slug,
        date: post.date,
        modified: post.modified,
        link: post.link,
        status: post.status,
        author: {
            id: author?.id ?? post.author,
            name: author?.name ?? "Penulis",
            avatar: author?.avatar_urls?.["48"],
        },
        featuredImage,
        featuredImageAlt: featuredImageAlt || stripHtml(post.title.rendered),
        categories,
        tags,
        readingTime: calculateReadingTime(post.content.rendered),
    };
}

// Fetch all posts from WordPress
async function fetchWpPosts(page = 1, perPage = WP_CONFIG.postsPerPage) {
    const cacheKey = `wp-posts-${page}-${perPage}`;
    const cached = getCache(cacheKey);
    if (cached) return cached as { posts: TransformedPost[]; total: number; totalPages: number };

    const url = new URL("/wp-json/wp/v2/posts", WP_CONFIG.baseUrl);
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("_embed", "1"); // Include featured media and author

    try {
        const response = await fetch(url.toString(), {
            next: { revalidate: WP_CONFIG.cacheTimeout / 1000 },
            headers: {
                Accept: "application/json",
                "User-Agent": "Trimulyo-NextJS/1.0",
            },
        });

        if (!response.ok) {
            console.error(`WordPress API error: ${response.status} ${response.statusText}`);
            return { posts: [], total: 0, totalPages: 0 };
        }

        const totalPosts = parseInt(response.headers.get("X-WP-Total") ?? "0");
        const totalPages = parseInt(response.headers.get("X-WP-TotalPages") ?? "0");
        const posts: WpPost[] = await response.json();

        const transformedPosts = posts.map(transformPost);

        const result = {
            posts: transformedPosts,
            total: totalPosts,
            totalPages,
        };

        setCache(cacheKey, result);
        return result;
    } catch (error) {
        console.error("WordPress fetch error:", error);
        return { posts: [], total: 0, totalPages: 0 };
    }
}

// Fetch single post by slug
async function fetchWpPostBySlug(slug: string): Promise<TransformedPost | null> {
    const cacheKey = `wp-post-${slug}`;
    const cached = getCache(cacheKey);
    if (cached) return cached as TransformedPost;

    const url = new URL("/wp-json/wp/v2/posts", WP_CONFIG.baseUrl);
    url.searchParams.set("slug", slug);
    url.searchParams.set("_embed", "1");
    url.searchParams.set("per_page", "1");

    try {
        const response = await fetch(url.toString(), {
            next: { revalidate: WP_CONFIG.cacheTimeout / 1000 },
            headers: {
                Accept: "application/json",
                "User-Agent": "Trimulyo-NextJS/1.0",
            },
        });

        if (!response.ok) return null;

        const posts: WpPost[] = await response.json();
        if (posts.length === 0) return null;

        const transformed = transformPost(posts[0]);
        setCache(cacheKey, transformed);
        return transformed;
    } catch (error) {
        console.error("WordPress fetch error:", error);
        return null;
    }
}

// Fetch categories
async function fetchWpCategories() {
    const cacheKey = "wp-categories";
    const cached = getCache(cacheKey);
    if (cached) return cached as WpCategory[];

    const url = new URL("/wp-json/wp/v2/categories", WP_CONFIG.baseUrl);
    url.searchParams.set("per_page", "100");

    try {
        const response = await fetch(url.toString(), {
            next: { revalidate: WP_CONFIG.cacheTimeout / 1000 },
        });

        if (!response.ok) return [];

        const categories: WpCategory[] = await response.json();
        setCache(cacheKey, categories);
        return categories;
    } catch (error) {
        console.error("WordPress categories fetch error:", error);
        return [];
    }
}

export {
    WP_CONFIG,
    fetchWpPosts,
    fetchWpPostBySlug,
    fetchWpCategories,
    transformPost,
    type TransformedPost,
    type WpPost,
    type WpCategory,
};
