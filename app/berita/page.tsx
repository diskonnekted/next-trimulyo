"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, Calendar, FileText, RefreshCw, RotateCcw, ExternalLink, ChevronRight, Timer, Eye } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import { useExternalNews } from "@/hooks/useExternalNews";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import NewsCard, { NewsCardSkeleton } from "@/components/berita/NewsCard";
import NewsSidebar from "@/components/berita/NewsSidebar";
import type { Post, Category } from "@/lib/opensid";

function NewsSearchContent() {
    const searchParams = useSearchParams();
    const categorySlug = searchParams.get("category");
    const archiveKey = searchParams.get("archive");
    const searchQuery = searchParams.get("search");

    return <NewsContent categorySlug={categorySlug} archiveKey={archiveKey} searchQuery={searchQuery} />;
}

function NewsContent({
    categorySlug,
    archiveKey,
    searchQuery,
}: {
    categorySlug?: string | null;
    archiveKey?: string | null;
    searchQuery?: string | null;
}) {
    const { t } = useTranslation();
    const router = useRouter();
    const { news: externalNews, loading: newsLoading, error: newsError } = useExternalNews(100);

    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState(searchQuery ?? "");
    const [selectedCategory, setSelectedCategory] = useState(categorySlug ?? "all");
    const [selectedSort, setSelectedSort] = useState("terbaru");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    useEffect(() => {
        console.log("[BeritaPage] Checking news data...", { 
            newsLength: externalNews?.length, 
            newsLoading, 
            newsError 
        });

        if (!externalNews || externalNews.length === 0) {
            setPosts([]);
            return;
        }

        // 1. Transform - use CORRECT NewsItem fields from useExternalNews hook
        const allTransformed: Post[] = externalNews.map(item => ({
            id: typeof item.id === 'number' ? item.id : parseInt(item.id) || 0,
            title: item.title || "Tanpa Judul",
            slug: item.slug || `post-${item.id}`,
            date: item.publishedAt || new Date().toISOString(),
            modified: item.updatedAt || item.publishedAt || new Date().toISOString(),
            excerpt: item.excerpt || "",
            content: item.content || "",
            link: `/berita/${item.slug}`,
            status: "publish",
            // NewsCard requires these exact fields:
            featuredImage: item.featuredImage || "/images/placeholder-news.jpg",
            featuredImageAlt: item.title || "Berita Trimulyo",
            category: item.category || "Berita",
            categories: item.categories?.length > 0 
                ? item.categories 
                : [{ id: 0, name: item.category || "Berita", slug: (item.category || "berita").toLowerCase().replace(/\s+/g, '-') }],
            tags: item.tags || [],
            author: {
                id: 0,
                name: item.author?.name || "Admin",
                avatar: item.author?.avatar || null,
            },
            viewCount: item.viewCount || 0,
            readingTime: item.readTime || 2,
        }));

        console.log("[BeritaPage] Successfully transformed:", allTransformed.length);

        // 2. Filter
        let filtered = [...allTransformed];
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(term) || 
                p.excerpt.toLowerCase().includes(term)
            );
        }
        
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => {
                const catSlug = p.category.toLowerCase().replace(/\s+/g, '-');
                return catSlug === selectedCategory;
            });
        }

        // 3. Sort
        if (selectedSort === "populer") {
            filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        } else {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        console.log("[BeritaPage] Final filtered count:", filtered.length);
        setPosts(filtered);

        // 4. Update Categories (Only if not already set or after transformation)
        const cats = Array.from(new Set(allTransformed.map(p => p.category))).map((name, i) => ({
            id: i,
            name: name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            count: allTransformed.filter(p => p.category === name).length
        }));
        setCategories(cats);

    }, [externalNews, searchTerm, selectedCategory, selectedSort, newsLoading]);

    const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Berita Utama</h1>
                <p className="text-muted-foreground">Informasi terkini seputar Kalurahan Trimulyo</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    {/* Toolbar */}
                    <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-wrap gap-4 items-center justify-between">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Cari berita..." 
                                className="pl-10" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                {categories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Posts Grid */}
                    {newsLoading && posts.length === 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6].map(i => <NewsCardSkeleton key={i} />)}
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedPosts.map(post => <NewsCard key={post.id} post={post} />)}
                        </div>
                    ) : (
                        <Card className="p-12 text-center">
                            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
                            <h3 className="text-xl font-medium">Belum Ada Berita</h3>
                            <p className="text-muted-foreground mt-2">Coba sesuaikan pencarian atau kategori Anda.</p>
                            <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                                Reset Filter
                            </Button>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <NewsSidebar categories={categories} archives={[]} popularPosts={posts.slice(0, 5)} />
                </div>
            </div>
        </div>
    );
}

export default function BeritaPage() {
    return (
        <main className="min-h-screen bg-background">
            <Suspense fallback={<div className="container mx-auto p-12 text-center">Memuat...</div>}>
                <NewsSearchContent />
            </Suspense>
        </main>
    );
}
