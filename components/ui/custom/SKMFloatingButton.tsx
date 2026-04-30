"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, X } from "lucide-react";
import { useState } from "react";

export function SKMFloatingButton() {
    const pathname = usePathname();
    const [dismissed, setDismissed] = useState(false);

    // Jangan tampilkan di halaman SKM itu sendiri atau setelah di-dismiss
    if (pathname === "/skm" || dismissed) return null;

    return (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2 md:bottom-8">
            {/* Tooltip label */}
            <div className="bg-popover text-popover-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-border animate-in fade-in slide-in-from-right-2 duration-300 flex items-center gap-1.5">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                Isi Survei Kepuasan
            </div>

            {/* Floating Button Group */}
            <div className="flex items-center gap-1.5">
                {/* Dismiss button */}
                <button
                    onClick={() => setDismissed(true)}
                    className="w-6 h-6 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                    aria-label="Tutup"
                >
                    <X className="h-3 w-3" />
                </button>

                {/* SKM Button */}
                <Link
                    href="/skm"
                    className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold"
                    aria-label="Isi Survei Kepuasan Masyarakat"
                >
                    <Star className="h-4 w-4 fill-primary-foreground/50" />
                    <span className="hidden sm:inline">Isi SKM</span>
                    <span className="sm:hidden">SKM</span>
                </Link>
            </div>
        </div>
    );
}
