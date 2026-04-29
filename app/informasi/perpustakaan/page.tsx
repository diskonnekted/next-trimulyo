import { LibraryDisplay } from "@/components/ui/custom/LibraryDisplay";
import { BookCheck } from "lucide-react";

export const metadata = {
    title: "Perpustakaan Desa - Portal Resmi Kalurahan Trimulyo",
    description: "Katalog buku dan informasi Perpustakaan Kalurahan Trimulyo.",
};

export default function PerpustakaanPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-8">
                {/* Breadcrumbs / Header Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Informasi</span>
                    <span>/</span>
                    <span className="text-primary font-medium">Perpustakaan</span>
                </div>

                <LibraryDisplay />
            </div>
        </div>
    );
}
