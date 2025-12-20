"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DecorativeSeparatorProps {
    className?: string;
}

export function DecorativeSeparator({ className }: DecorativeSeparatorProps) {
    return (
        <div className={cn("flex items-center justify-center py-8", className)}>
            <div className="relative w-4/5 h-px bg-border">
                {/* Left tip */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border rounded-full" />
                {/* Center bulge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-border rounded-full shadow-sm" />
                {/* Right tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border rounded-full" />
            </div>
        </div>
    );
}
