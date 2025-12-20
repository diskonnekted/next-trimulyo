import type { MetadataRoute } from "next";
import { env } from "process";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: env.APP_NAME || "Portal Pondokrejo",
        short_name: "Pondokrejo",
        description:
            "Portal resmi Pemerintah Kalurahan Pondokrejo, Kabupaten Sleman, DIY. Informasi lengkap layanan publik, berita terkini, dan transparansi pemerintahan kalurahan.",
        start_url: "/",
        display: "standalone",
        background_color: "#f8f9fc",
        theme_color: "#39a2cf",
        orientation: "portrait-primary",
        scope: "/",
        categories: ["government", "public services", "community"],
        lang: "id-ID",
        dir: "ltr",
        icons: [
            {
                src: "/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/favicon-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/favicon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any",
            },
        ],
        shortcuts: [
            {
                name: "Berita",
                short_name: "Berita",
                description: "Baca berita terkini kalurahan",
                url: "/berita",
                icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }],
            },
            {
                name: "Pengumuman",
                short_name: "Pengumuman",
                description: "Baca pengumuman terkini kalurahan",
                url: "/pengumuman",
                icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }],
            },
            {
                name: "Pengaduan",
                short_name: "Pengaduan",
                description: "Hubungi pemerintah kalurahan",
                url: "/pengaduan",
                icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }],
            },
        ],
        screenshots: [
            {
                src: "/images/home-desktop.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Homepage " + env.APP_NAME || "Portal Kalurahan Pondokrejo",
            },
            {
                src: "/images/home-mobile.png",
                sizes: "390x844",
                type: "image/png",
                form_factor: "narrow",
                label: "Tampilan Mobile " + env.APP_NAME || "Portal Kalurahan Pondokrejo",
            },
        ],
        related_applications: [],
        prefer_related_applications: false,
    };
}
