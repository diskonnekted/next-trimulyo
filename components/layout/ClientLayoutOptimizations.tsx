"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BackToTop = dynamic(() => import("@/components/ui/custom/BackToTop").then(mod => mod.BackToTop), { ssr: false });
const PWAInstallPrompt = dynamic(() => import("@/components/ui/custom/PWAInstallPrompt").then(mod => mod.PWAInstallPrompt), { ssr: false });
const SKMFloatingButton = dynamic(() => import("@/components/ui/custom/SKMFloatingButton").then(mod => mod.SKMFloatingButton), { ssr: false });

export function ClientLayoutOptimizations() {
    return (
        <>
            <BackToTop />
            <Suspense fallback={null}>
                <SKMFloatingButton />
            </Suspense>
            <PWAInstallPrompt />
        </>
    );
}
