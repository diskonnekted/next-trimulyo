"use client";

// =============================================================================
// BERITA PAGE - OpenSID Integration
// =============================================================================
// This page uses OpenSID API for news content management
// =============================================================================

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, Calendar, FileText, RefreshCw, RotateCcw, ExternalLink } from "lucide-react";
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

// SearchParams component untuk handle URL parameters
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
    
    // Use the robust external news hook that handles fallbacks (WP -> WP Proxy -> OpenSID Proxy)
    const { news: externalNews, loading: newsLoading, error: newsError } = useExternalNews(50); // Fetch up to 50 items

    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [archives, setArchives] = useState<Array<{ key: string; displayText: string; count: number }>>([]);
    
    // Filter state
    const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug ?? "all");
    const [selectedArchive, setSelectedArchive] = useState<string>(archiveKey ?? "all");
    const [selectedSort, setSelectedSort] = useState<string>("terbaru");
    const [searchTerm, setSearchTerm] = useState(searchQuery ?? "");
    const [searchInput, setSearchInput] = useState(searchQuery ?? "");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    // Sync state with URL parameters when they change
    useEffect(() => {
        setSelectedCategory(categorySlug ?? "all");
        setSelectedArchive(archiveKey ?? "all");
        setSearchTerm(searchQuery ?? "");
        setSearchInput(searchQuery ?? "");
        setCurrentPage(1); // Reset to first page when URL changes
    }, [categorySlug, archiveKey, searchQuery]);

    // Update posts per page based on screen size
    useEffect(() => {
        const updatePostsPerPage = () => {
            const isLargeScreen = window.innerWidth >= 1024;
            setPostsPerPage(isLargeScreen ? 9 : 5);
        };
        updatePostsPerPage();
        window.addEventListener("resize", updatePostsPerPage);
        return () => window.removeEventListener("resize", updatePostsPerPage);
    }, []);

    // Transform external news to internal Post format and apply filters
    useEffect(() => {
        if (newsLoading) return;

        // Transform data
        let allPosts: Post[] = externalNews.map(item => ({
            id: parseInt(item.id) || 0,
            title: item.title,
            slug: item.slug,
            date: item.publishedAt,
            excerpt: item.excerpt,
            content: item.content,
            image: item.featuredImage || "/images/placeholder-news.jpg",
            categories: item.categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })),
            author: { name: item.author.name, avatar: item.author.avatar || "/images/default-avatar.png" },
            viewCount: item.viewCount,
            readingTime: item.readTime,
            tags: item.tags.map(t => ({ id: t.id, name: t.name, slug: t.slug }))
        }));

        // Apply Search
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            allPosts = allPosts.filter(post => 
                post.title.toLowerCase().includes(lowerTerm) || 
                post.excerpt.toLowerCase().includes(lowerTerm)
            );
        }

        // Apply Category Filter
        if (selectedCategory && selectedCategory !== "all") {
            allPosts = allPosts.filter(post => 
                post.categories.some(c => c.slug === selectedCategory)
            );
        }

        // Apply Archive Filter
        if (selectedArchive && selectedArchive !== "all") {
            const [year, month] = selectedArchive.split("-");
            allPosts = allPosts.filter(post => {
                const date = new Date(post.date);
                return date.getFullYear() === parseInt(year) && (date.getMonth() + 1) === parseInt(month);
            });
        }

        // Apply Sorting
        switch (selectedSort) {
            case "terlama":
                allPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case "terpopuler":
                allPosts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
                break;
            case "terbaru":
            default:
                allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        // Extract Categories from data
        const uniqueCategories = new Map<string, Category>();
        externalNews.forEach(item => {
            item.categories.forEach(c => {
                if (!uniqueCategories.has(c.slug)) {
                    uniqueCategories.set(c.slug, { id: c.id, name: c.name, slug: c.slug, count: 0 });
                }
                const cat = uniqueCategories.get(c.slug);
                if (cat) cat.count = (cat.count || 0) + 1;
            });
        });
        setCategories(Array.from(uniqueCategories.values()));

        // Extract Archives from data
        const archiveMap = new Map<string, { key: string; displayText: string; count: number }>();
        externalNews.forEach(item => {
            const date = new Date(item.publishedAt);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const displayText = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
            
            if (!archiveMap.has(key)) {
                archiveMap.set(key, { key, displayText, count: 0 });
            }
            const archive = archiveMap.get(key);
            if (archive) archive.count++;
        });
        setArchives(Array.from(archiveMap.values()).sort((a, b) => b.key.localeCompare(a.key)));

        // Pagination
        setTotalPosts(allPosts.length);
        setTotalPages(Math.ceil(allPosts.length / postsPerPage) || 1);
        
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        setPosts(allPosts.slice(startIndex, endIndex));

    }, [externalNews, newsLoading, searchTerm, selectedCategory, selectedArchive, selectedSort, currentPage, postsPerPage]);

    const loading = newsLoading;
    const error = newsError;

    // Helper function to get current filter info
    function getCurrentFilterInfo(): string[] {
        const filters: string[] = [];
        
        const sortNames = {
            terbaru: "Terbaru",
            terpopuler: "Terpopuler",
            terlama: "Terlama",
        };
        filters.push(`Urutkan: ${sortNames[selectedSort as keyof typeof sortNames] || "Terbaru"}`);

        if (selectedCategory && selectedCategory !== "all") {
            const category = categories.find((c) => c.slug === selectedCategory);
            if (category) filters.push(`${category.name}`);
        }

        if (selectedArchive && selectedArchive !== "all") {
            const [year, month] = selectedArchive.split("-");
            const monthNames = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember",
            ];
            const monthName = monthNames[parseInt(month) - 1] || "";
            filters.push(`${monthName} ${year}`);
        }

        if (searchTerm) {
            filters.push(`"${searchTerm}"`);
        }

        return filters;
    }

    const currentFilterInfo = getCurrentFilterInfo();

    // Handlers
    const handleSearch = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearchInput("");
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedArchive("all");
        setSelectedSort("terbaru");
        setCurrentPage(1);
    };

    // Helper function for pagination numbers
    function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
        // Simple pagination logic if totalPages is small
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Always show first, last, current, and surrounding pages
        const pages: (number | "...")[] = [1];
        
        if (currentPage > 3) {
            pages.push("...");
        }
        
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (currentPage < totalPages - 2) {
            pages.push("...");
        }
        
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        
        return pages;
    }

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#10264f]">Berita Utama</h1>
                <p className="text-[#7487af]">Informasi terkini seputar Kalurahan Trimulyo</p>
            </div>

            {/* Search and Filter Bar */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t("navigation.cari")}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            <Select
                                value={selectedCategory}
                                onValueChange={(value) => handleFilterChange("category", value)}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.slug}>
                                            {category.name} ({category.count})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedArchive}
                                onValueChange={(value) => handleFilterChange("archive", value)}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Bulan/Tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Bulan</SelectItem>
                                    {archives.map((archive) => (
                                        <SelectItem key={archive.key} value={archive.key}>
                                            {archive.displayText} ({archive.count})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button onClick={handleSearch} disabled={loading}>
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {currentFilterInfo.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-muted-foreground">Filter aktif:</span>
                            {currentFilterInfo.map((filter, index) => (
                                <Badge key={index} variant="secondary">
                                    {filter}
                                </Badge>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSelectedArchive("all");
                                    setSelectedSort("terbaru");
                                    setSearchTerm("");
                                    setSearchInput("");
                                    setCurrentPage(1);
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
                {/* Main Content */}
                <div className="flex-1 w-full">
                    {/* Results Info */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                {searchTerm ? (
                                    <>
                                        <Search className="h-5 w-5" />
                                        Hasil Pencarian
                                    </>
                                ) : (
                                    <>
                                        <FileText className="h-5 w-5" />
                                        {t("berita.terbaru")}
                                    </>
                                )}
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Sort Options */}
                            <Select value={selectedSort} onValueChange={(value) => handleFilterChange("sort", value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="terbaru">Terbaru</SelectItem>
                                    <SelectItem value="terpopuler">Terpopuler</SelectItem>
                                    <SelectItem value="terlama">Terlama</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <Card className="mb-6 border-red-200 bg-red-50">
                            <CardContent className="p-4">
                                <p className="text-red-600">{error}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => window.location.reload()}
                                >
                                    Refresh Halaman
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <NewsCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && posts.length === 0 && !error && (
                        <Card className="border-dashed">
                            <CardContent className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
                                    <Calendar className="h-10 w-10 text-muted-foreground" />
                                </div>

                                <h3 className="text-xl font-semibold mb-3">
                                    {searchTerm
                                        ? t("berita.tidakAdaHasil", {}, "Tidak Ada Hasil Pencarian")
                                        : t("berita.belumAdaBerita", {}, "Belum Ada Berita")}
                                </h3>

                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    {searchTerm
                                        ? t(
                                              "berita.pesanTidakAdaHasil",
                                              { keyword: searchTerm },
                                              `Tidak ditemukan berita dengan kata kunci "${searchTerm}". Coba kata kunci lain atau periksa ejaan Anda.`
                                          )
                                        : t(
                                              "berita.pesanBelumAdaBerita",
                                              {},
                                              "Belum ada berita yang dipublikasikan dalam kategori ini. Silakan cek kembali nanti atau jelajahi kategori lain."
                                          )}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSearchInput("");
                                            setSelectedCategory("all");
                                            setSelectedArchive("all");
                                            setSelectedSort("terbaru");
                                            setCurrentPage(1);
                                        }}
                                        className="w-full sm:w-auto"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        {t("forms.reset")}
                                    </Button>

                                    <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        {t("forms.refresh")}
                                    </Button>
                                </div>

                                {searchTerm && (
                                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Saran Pencarian:</strong> Coba kata kunci yang lebih umum seperti
                                            pembangunan, kesehatan, atau pemerintahan
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* News Grid */}
                    {!loading && posts.length > 0 && (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {/* WordPress News Placeholder Link (Manual Integration) */}
                                {/* Hidden as per request */}
                                {/* {!searchTerm && currentPage === 1 && selectedCategory === "all" && (
                                    <Card 
                                        className="hover:shadow-lg transition-all cursor-pointer border-blue-200 bg-blue-50 group flex flex-col h-full"
                                        onClick={() => router.push('/berita/external/tarawih-keliling-di-al-falaq-kalangan-pemkal-trimulyo-pererat-ukhuwah-dengan-warga')}
                                    >
                                        <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-200">
                                            <div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-500">
                                                <ExternalLink className="w-12 h-12 opacity-50" />
                                            </div>
                                            <div className="absolute top-2 right-2">
                                                <Badge className="bg-blue-600 hover:bg-blue-700">Eksternal</Badge>
                                            </div>
                                        </div>
                                        <CardContent className="p-4 flex-1 flex flex-col">
                                            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                <span>Terbaru</span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                Tarawih Keliling di Al Falaq Kalangan, Pemkal Trimulyo Pererat Ukhuwah dengan Warga
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                                                Kegiatan tarawih keliling sebagai sarana mempererat silaturahmi antara pemerintah kalurahan dengan warga masyarakat...
                                            </p>
                                            <div className="mt-auto flex items-center text-sm text-blue-600 font-medium">
                                                Baca Selengkapnya <ExternalLink className="w-3 h-3 ml-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )} */}

                                {posts.map((post) => (
                                    <NewsCard
                                        key={post.id}
                                        post={post}
                                        showExcerpt={true}
                                        showAuthor={false}
                                        showDate={true}
                                        showViews={true}
                                        showCategories={true}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center gap-1">
                                            {/* First Page (<<) */}
                                            <button
                                                onClick={() => setCurrentPage(1)}
                                                disabled={currentPage === 1}
                                                className="h-8 w-8 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {"\u003c\u003c"}
                                            </button>

                                            {/* Previous (<) */}
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="h-8 w-8 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {"\u003c"}
                                            </button>

                                            {/* Page Numbers */}
                                            {getPageNumbers(currentPage, totalPages).map((pageNum, index) => (
                                                <span key={index}>
                                                    {pageNum === "..." ? (
                                                        <span className="px-3 py-2 sm:px-2 text-sm">...</span>
                                                    ) : (
                                                        <button
                                                            onClick={() => setCurrentPage(pageNum as number)}
                                                            disabled={pageNum === currentPage}
                                                            className={cn(
                                                                "h-8 w-8 border rounded-md",
                                                                pageNum === currentPage
                                                                    ? "bg-primary text-primary-foreground"
                                                                    : "hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                                            )}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    )}
                                                </span>
                                            ))}

                                            {/* Next (>) */}
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="h-8 w-8 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {"\u003e"}
                                            </button>

                                            {/* Last Page (>>) */}
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                disabled={currentPage === totalPages}
                                                className="h-8 w-8 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {"\u003e\u003e"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 shrink-0 mt-8 lg:mt-0">
                    <NewsSidebar currentCategory={currentCategoryId} />
                </div>
            </div>
        </div>
    );
}

export default function BeritaPage() {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 py-4">
                    <div className="text-center mb-8">
                        <Skeleton className="h-10 w-48 mx-auto mb-2" />
                        <Skeleton className="h-5 w-96 mx-auto" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <NewsCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            }
        >
            <NewsSearchContent />
        </Suspense>
    );
}
