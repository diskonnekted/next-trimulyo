import { NextResponse } from "next/server";
import { opensidApi } from "@/lib/api-service";

export async function GET() {
    try {
        // Fetch products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
            opensidApi.get("/internal_api/lapak/produk"),
            opensidApi.get("/internal_api/lapak/kategori")
        ]);

        if (!productsRes.success || !productsRes.data) {
            throw new Error("Failed to fetch products from OpenSID");
        }

        const rawProducts = (productsRes.data as any).data || [];
        const rawCategories = categoriesRes.success ? (categoriesRes.data as any).data || [] : [];

        // Transform data
        const products = rawProducts.map((item: any) => {
            const attr = item.attributes || {};
            return {
                id: item.id,
                name: attr.nama,
                price: attr.harga,
                unit: attr.satuan,
                description: attr.deskripsi,
                categoryId: attr.id_produk_kategori,
                sellerId: attr.id_pelapak,
                images: Array.isArray(attr.foto) ? attr.foto : [],
                updatedAt: attr.updated_at,
            };
        });

        const categories = rawCategories.map((item: any) => ({
            id: item.id,
            name: item.attributes?.kategori,
        }));

        return NextResponse.json({
            success: true,
            data: {
                products,
                categories
            }
        });
    } catch (error) {
        console.error("[lapak API] Error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
