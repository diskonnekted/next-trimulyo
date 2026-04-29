"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
    Book, 
    BookCheck,
    Search, 
    Info, 
    Phone, 
    Mail, 
    MapPin, 
    User, 
    Library as LibraryIcon,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBooks, fetchLibraryInfo, Book as BookType, LibraryInfo } from "@/lib/library";

export function LibraryDisplay() {
    const [books, setBooks] = useState<BookType[]>([]);
    const [info, setInfo] = useState<LibraryInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [booksLoading, setBooksLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            const [booksData, infoData] = await Promise.all([
                fetchBooks("", 1, 12),
                fetchLibraryInfo()
            ]);
            
            if (booksData) {
                setBooks(booksData.data);
                // Assume 12 is limit, if we get 12 we might have more. 
                // Actual API might not return total count in a way we can use easily without knowing limit
            }
            if (infoData) {
                setInfo(infoData);
            }
            setLoading(false);
        };
        
        loadInitialData();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setBooksLoading(true);
        setPage(1);
        const data = await fetchBooks(searchQuery, 1, 12);
        if (data) {
            setBooks(data.data);
        }
        setBooksLoading(false);
    };

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-64 bg-gray-100 rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-80 bg-gray-100 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Library Info Hero */}
            {info && (
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-primary/80 text-white p-8 md:p-12 shadow-xl">
                    <div className="absolute -right-20 -bottom-20 opacity-10">
                        <LibraryIcon size={300} />
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-white/30">
                            Perpustakaan Desa
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{info.library_name}</h1>
                        <p className="text-lg text-white/90 mb-8 leading-relaxed">
                            {info.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                                <span>{info.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-secondary shrink-0" />
                                <span>Kepala: {info.head_of_library}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-secondary shrink-0" />
                                <span>{info.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-secondary shrink-0" />
                                <span>{info.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Book Catalog Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <BookCheck className="h-6 w-6 text-primary" />
                            Katalog Buku Lokal
                        </h2>
                        <p className="text-muted-foreground text-sm">Jelajahi koleksi buku yang tersedia di perpustakaan kami</p>
                    </div>
                    
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <Input 
                            placeholder="Cari judul buku atau penulis..." 
                            className="pl-10 pr-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Button type="submit" size="sm" className="absolute right-1 top-1 h-8">Cari</Button>
                    </form>
                </div>

                {booksLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="aspect-[3/4] rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {books.map((book) => (
                            <Card key={book.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                    <Image 
                                        src={`https://trimulyo.orbitdev.id${book.cover_url}`}
                                        alt={book.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <Badge className="bg-secondary mb-2">{book.category}</Badge>
                                            <p className="text-xs text-white line-clamp-3 font-medium">{book.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-3">
                                    <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{book.author}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] text-muted-foreground">{book.year}</span>
                                        <ArrowRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
                        <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">Buku tidak ditemukan</h3>
                        <p className="text-muted-foreground">Coba gunakan kata kunci lain</p>
                        <Button variant="link" onClick={() => {setSearchQuery(""); fetchBooks("", 1, 12).then(d => d && setBooks(d.data))}}>
                            Lihat semua buku
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
