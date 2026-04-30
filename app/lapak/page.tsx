"use client";

import { useState, useEffect, Suspense } from "react";
import { Search, Store, ShoppingBag, Filter, ChevronRight, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
    DialogFooter 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard, { ProductCardSkeleton } from "@/components/lapak/ProductCard";

interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    description: string;
    categoryId: number;
    sellerId: number;
    images: string[];
}

interface Category {
    id: number;
    name: string;
}

function LapakContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/lapak");
                const result = await res.json();
                if (result.success) {
                    setProducts(result.data.products);
                    setCategories(result.data.categories);
                }
            } catch (error) {
                console.error("Failed to fetch lapak data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden mb-12 bg-primary/10 border border-primary/20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />
                    <Image 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
                        alt="Lapak Trimulyo"
                        fill
                        className="object-cover opacity-30"
                    />
                </div>
                <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 bg-primary/20 p-4 rounded-2xl backdrop-blur-md"
                    >
                        <Store className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight"
                    >
                        Lapak Trimulyo
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium"
                    >
                        Dukung ekonomi lokal dengan berbelanja produk unggulan dari pelaku UMKM Kalurahan Trimulyo.
                    </motion.p>
                </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filter */}
                <aside className="lg:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Filter className="h-4 w-4 text-primary" />
                            Kategori
                        </h3>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                            <Button
                                variant={selectedCategory === null ? "default" : "outline"}
                                className="justify-start rounded-xl font-medium"
                                onClick={() => setSelectedCategory(null)}
                            >
                                Semua Produk
                            </Button>
                            {categories.map(cat => (
                                <Button
                                    key={cat.id}
                                    variant={selectedCategory === cat.id ? "default" : "outline"}
                                    className="justify-start rounded-xl font-medium"
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    {cat.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Card className="bg-primary/5 border-primary/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingBag className="h-6 w-6 text-primary" />
                            <h4 className="font-bold">Info Pelapak</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Punya produk unggulan? Segera daftarkan produk Anda di Lapak Trimulyo untuk menjangkau lebih banyak pembeli.
                        </p>
                        <Button className="w-full mt-4 rounded-xl font-bold" variant="secondary">
                            Daftar Pelapak
                        </Button>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-8">
                    {/* Search and Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Cari produk impianmu..."
                                className="pl-12 h-12 rounded-2xl bg-muted/50 border-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">
                            Menampilkan <span className="text-foreground font-bold">{filteredProducts.length}</span> produk
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => <ProductCardSkeleton key={i} />)}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        >
                            {filteredProducts.map(product => (
                                <motion.div key={product.id} variants={itemVariants}>
                                    <ProductCard 
                                        product={product} 
                                        categoryName={categories.find(c => c.id === product.categoryId)?.name}
                                        onClick={setSelectedProduct}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="py-24 text-center space-y-4 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                            <div className="bg-muted p-6 rounded-full w-fit mx-auto">
                                <ShoppingBag className="h-12 w-12 text-muted-foreground opacity-30" />
                            </div>
                            <h3 className="text-2xl font-bold">Produk Tidak Ditemukan</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Maaf, kami tidak menemukan produk yang sesuai dengan pencarian Anda. Coba kata kunci lain atau pilih kategori yang berbeda.
                            </p>
                            <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}>
                                Reset Pencarian
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Product Detail Dialog */}
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl border-none">
                    {selectedProduct && (
                        <div className="grid md:grid-cols-2 h-full">
                            <div className="relative aspect-square md:aspect-auto h-full min-h-[400px]">
                                <Image
                                    src={selectedProduct.images?.[0] || "/images/placeholder-product.jpg"}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 flex flex-col">
                                <DialogHeader className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                                            {categories.find(c => c.id === selectedProduct.categoryId)?.name}
                                        </Badge>
                                    </div>
                                    <DialogTitle className="text-3xl font-extrabold tracking-tight">
                                        {selectedProduct.name}
                                    </DialogTitle>
                                    <div className="text-3xl font-bold text-primary mt-2">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(selectedProduct.price)}
                                        <span className="text-sm font-normal text-muted-foreground"> / {selectedProduct.unit}</span>
                                    </div>
                                </DialogHeader>

                                <ScrollArea className="flex-1 pr-4 mb-8">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Deskripsi</h4>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {selectedProduct.description || "Tidak ada deskripsi untuk produk ini."}
                                            </p>
                                        </div>
                                        <div className="pt-4 border-t">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Store className="h-4 w-4 text-primary" />
                                                <span className="font-medium">Dijual oleh UMKM Trimulyo</span>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>

                                <DialogFooter className="mt-auto">
                                    <Button 
                                        className="w-full h-14 text-lg font-bold gap-3 rounded-2xl shadow-lg shadow-primary/20"
                                        onClick={() => {
                                            const message = `Halo, saya tertarik dengan produk ${selectedProduct.name} yang ada di Lapak Trimulyo.`;
                                            window.open(`https://wa.me/6282134008185?text=${encodeURIComponent(message)}`, "_blank");
                                        }}
                                    >
                                        <MessageCircle className="h-6 w-6" />
                                        Hubungi Penjual (WhatsApp)
                                    </Button>
                                </DialogFooter>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function LapakPage() {
    return (
        <main className="min-h-screen bg-background/50 pt-20">
            <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Memuat Lapak...</div>}>
                <LapakContent />
            </Suspense>
        </main>
    );
}
