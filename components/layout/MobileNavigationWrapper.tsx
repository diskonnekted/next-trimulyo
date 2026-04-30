"use client";

import { Suspense } from "react";
import { MobileNavigation } from "./MobileNavigation";

export function MobileNavigationWrapper() {
    return (
        <Suspense
            fallback={
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-white/10 z-50 h-16">
                    {/* Fallback loading state */}
                    <div className="flex items-center justify-center h-full">
                        <div className="text-white text-xs">Loading...</div>
                    </div>
                </div>
            }
        >
            <MobileNavigation />
        </Suspense>
    );
}
