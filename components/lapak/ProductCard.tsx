import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Tag, Store } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ProductCardProps {
    product: Product;
    categoryName?: string;
    onClick?: (product: Product) => void;
}

export default function ProductCard({ product, categoryName, onClick }: ProductCardProps) {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(product.price);

    const mainImage = product.images?.[0] || "/images/placeholder-product.jpg";

    return (
        <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button 
                        size="sm" 
                        variant="secondary" 
                        className="w-full gap-2 font-medium"
                        onClick={() => onClick?.(product)}
                    >
                        <Eye className="h-4 w-4" />
                        Detail Produk
                    </Button>
                </div>
                {categoryName && (
                    <Badge className="absolute top-3 left-3 bg-white/90 text-primary hover:bg-white shadow-sm backdrop-blur-md border-none">
                        {categoryName}
                    </Badge>
                )}
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    {formattedPrice}
                    <span className="text-xs font-normal text-muted-foreground">/ {product.unit}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    onClick={() => {
                        const message = `Halo, saya tertarik dengan produk ${product.name} yang ada di Lapak Trimulyo.`;
                        window.open(`https://wa.me/6282134008185?text=${encodeURIComponent(message)}`, "_blank");
                    }}
                >
                    <ShoppingCart className="h-4 w-4" />
                    Beli Sekarang
                </Button>
            </CardFooter>
        </Card>
    );
}

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden border-none shadow-md bg-card/50">
            <div className="aspect-square bg-muted animate-pulse" />
            <CardContent className="p-4 space-y-2">
                <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-8 bg-muted animate-pulse rounded w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="h-10 bg-muted animate-pulse rounded w-full" />
            </CardFooter>
        </Card>
    );
}
