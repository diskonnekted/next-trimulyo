"use client";

// =============================================================================
// OPENSID VERSION - BERITA DETAIL PAGE
// =============================================================================
// This page uses OpenSID API (from /lib/opensid.ts)
// =============================================================================

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Share2, MessageSquare, Eye, Tag, Folder } from "lucide-react";
import { toast } from "sonner";
import { useExternalNews } from "@/hooks/useExternalNews";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NewsSidebar from "@/components/berita/NewsSidebar";
import type { Post } from "@/lib/opensid";
import { env } from "process";

// Share functionality
function shareContent(url: string, title: string) {
    if (navigator.share) {
        navigator
            .share({
                title,
                url,
            })
            .catch(() => {
                // Error sharing is expected on some platforms, fallback to clipboard
                copyToClipboard(url);
            });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text: string) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.success("Link berhasil disalin!");
        })
        .catch(() => {
            toast.error("Gagal menyalin link");
        });
}

// Format date functions
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
    };
    return date.toLocaleDateString("id-ID", options);
}

function formatDateShort(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
    };
    return date.toLocaleDateString("id-ID", options);
}

function getReadingTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Detail page component
function NewsDetailContent() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Use the robust external news hook that handles fallbacks
    const { news: externalNews, loading: newsLoading, error: newsError } = useExternalNews(50); // Fetch enough items to find the slug

    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewCount, setViewCount] = useState(0);

    // Load post and related posts
    useEffect(() => {
        if (!slug || newsLoading) return;

        setLoading(true);
        setError(null);

        // Find post by slug in the fetched external news
        const foundItem = externalNews.find(item => item.slug === slug);

        if (foundItem) {
            // Transform to Post interface
            const postData: Post = {
                id: parseInt(foundItem.id) || 0,
                title: foundItem.title,
                slug: foundItem.slug,
                date: foundItem.publishedAt,
                modified: foundItem.updatedAt,
                excerpt: foundItem.excerpt,
                content: foundItem.content,
                link: `/berita/${foundItem.slug}`,
                status: "publish",
                featuredImage: foundItem.featuredImage || "/images/placeholder-news.jpg",
                featuredImageAlt: foundItem.title,
                categories: foundItem.categories.map(c => ({ id: c.id, name: c.name, slug: c.slug, description: "" })),
                author: { id: 0, name: foundItem.author.name, avatar: foundItem.author.avatar || "/images/default-avatar.png" },
                viewCount: foundItem.viewCount || 0,
                readingTime: foundItem.readTime || 1,
                tags: foundItem.tags.map(t => ({ id: t.id, name: t.name, slug: t.slug }))
            };

            setPost(postData);
            setViewCount(postData.viewCount);

            // Find related posts (exclude current post)
            const related = externalNews
                .filter(item => item.slug !== slug)
                .slice(0, 3)
                .map(item => ({
                    id: parseInt(item.id) || 0,
                    title: item.title,
                    slug: item.slug,
                    date: item.publishedAt,
                    modified: item.updatedAt,
                    excerpt: item.excerpt,
                    content: item.content,
                    link: `/berita/${item.slug}`,
                    status: "publish",
                    featuredImage: item.featuredImage || "/images/placeholder-news.jpg",
                    featuredImageAlt: item.title,
                    categories: item.categories.map(c => ({ id: c.id, name: c.name, slug: c.slug, description: "" })),
                    author: { id: 0, name: item.author.name, avatar: item.author.avatar || "/images/default-avatar.png" },
                    viewCount: item.viewCount || 0,
                    readingTime: item.readTime || 1,
                    tags: item.tags.map(t => ({ id: t.id, name: t.name, slug: t.slug }))
                }));
            
            setRelatedPosts(related);
            setLoading(false);
        } else if (!newsLoading && externalNews.length > 0) {
            // Only set error if we've finished loading and still haven't found it
            setError("Berita tidak ditemukan");
            setLoading(false);
        } else if (newsError) {
            setError("Gagal memuat berita. Silakan coba lagi.");
            setLoading(false);
        }
        
    }, [slug, externalNews, newsLoading, newsError]);

    // Handle back
    const handleBack = () => {
        router.back();
    };

    // Update view count (simulated)
    useEffect(() => {
        if (post && !loading) {
            setViewCount((prev) => prev + 1);
        }
    }, [post, loading]);

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-4">
                <div className="mb-6">
                    <Skeleton className="h-10 w-32" />
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
                    {/* Main Content */}
                    <div className="flex-1 w-full">
                        <Card className="pt-0">
                            <div className="h-64 md:h-96 relative">
                                <Skeleton className="absolute inset-0 rounded-t-lg" />
                            </div>
                            <CardHeader className="pb-4">
                                <div className="flex gap-2 mb-3">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                                <Skeleton className="h-8 w-full mb-2" />
                                <Skeleton className="h-8 w-3/4" />
                                <div className="flex gap-4 mt-4">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-5 w-28" />
                                    <Skeleton className="h-5 w-24" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-4/6" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
                        <div className="space-y-4">
                            {/* Popular News Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="space-y-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Categories Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-24" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Skeleton key={i} className="h-8 w-full" />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !post) {
        return (
            <div className="container mx-auto px-4 py-4">
                <Link href="/berita">
                    <Button variant="ghost" className="mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Daftar Berita
                    </Button>
                </Link>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
                    {/* Main Content */}
                    <div className="flex-1 w-full">
                        <Card className="pt-0">
                            <CardContent className="p-4 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                                    <MessageSquare className="h-10 w-10 text-red-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {error ?? "Berita tidak ditemukan"}
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    Berita yang Anda cari tidak tersedia atau telah dihapus.
                                </p>
                                <Link href="/berita">
                                    <Button>Lihat Berita Lainnya</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
                        <NewsSidebar />
                    </div>
                </div>
            </div>
        );
    }

    const currentUrl = `${env.NEXT_PUBLIC_SITE_URL ?? ""}/berita/${post.slug}`;

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Back button */}
            <Link href="/berita">
                <Button variant="ghost" className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali ke Daftar Berita
                </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
                {/* Main Content */}
                <div className="flex-1 w-full">
                    {/* Article Header */}
                    <Card className="mb-8 overflow-hidden pt-0">
                        {/* Featured Image */}
                        <div className="relative h-64 md:h-96">
                            <Image
                                src={post.featuredImage}
                                alt={post.featuredImageAlt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
                                className="object-cover"
                                priority={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Overlay categories */}
                            {post.categories.length > 0 && (
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories.slice(0, 3).map((category) => (
                                            <Badge
                                                key={category.id}
                                                variant="secondary"
                                                className="bg-white/90 backdrop-blur-sm"
                                            >
                                                <Folder className="h-3 w-3 mr-1" />
                                                {category.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <CardHeader className="pb-4">
                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{post.title}</h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{getReadingTime(post.content)} baca</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{viewCount.toLocaleString("id-ID")} views</span>
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/berita?tag=${tag.slug}`}>
                                            <Badge
                                                variant="outline"
                                                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                                            >
                                                <Tag className="h-3 w-3 mr-1" />
                                                {tag.name}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardHeader>

                        <CardContent className="pt-0">
                            {/* Share and Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => shareContent(currentUrl, post.title)}
                                    >
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Bagikan
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Komentar
                                    </Button>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Diperbarui: {formatDateShort(post.modified)}
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="prose prose-gray max-w-none mt-6">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                    className="article-content"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Berita Terkait</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/berita/${relatedPost.slug}`}
                                            className="group block"
                                        >
                                            <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                                                <Image
                                                    src={relatedPost.featuredImage}
                                                    alt={relatedPost.featuredImageAlt}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                                {relatedPost.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                <span>{formatDateShort(relatedPost.date)}</span>
                                                <span>•</span>
                                                <Eye className="h-3 w-3" />
                                                <span>{relatedPost.viewCount}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Back to Top */}
                    <div className="text-center mt-8">
                        <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            Kembali ke Atas
                        </Button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
                    <NewsSidebar
                        currentCategory={post.categories.length > 0 ? post.categories[0].id : undefined}
                        currentTag={post.tags.length > 0 ? post.tags[0].id : undefined}
                    />
                </div>
            </div>
        </div>
    );
}

export default function BeritaDetailPage() {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 py-4">
                    <div className="mb-6">
                        <Skeleton className="h-10 w-32" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
                        {/* Main Content */}
                        <div className="flex-1 w-full">
                            <Card>
                                <div className="h-64 md:h-96 relative">
                                    <Skeleton className="absolute inset-0 rounded-t-lg" />
                                </div>
                                <CardHeader className="pb-4">
                                    <Skeleton className="h-8 w-full mb-2" />
                                    <Skeleton className="h-8 w-3/4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                        <Skeleton className="h-4 w-4/6" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
                            <div className="space-y-4">
                                {/* Popular News Skeleton */}
                                <Card>
                                    <CardHeader>
                                        <Skeleton className="h-6 w-32" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className="space-y-2">
                                                    <Skeleton className="h-4 w-full" />
                                                    <Skeleton className="h-3 w-20" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Categories Skeleton */}
                                <Card>
                                    <CardHeader>
                                        <Skeleton className="h-6 w-24" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Skeleton key={i} className="h-8 w-full" />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <NewsDetailContent />
        </Suspense>
    );
}
