import { NextResponse } from "next/server";

const BASE_URL = "https://posyandu-trimulyo.sleman-desa.id";

// Static posyandu data for Kalurahan Trimulyo (fallback)
const STATIC_POSYANDU_DATA = [
    { id: 1, nama: "Posyandu Anggrek", dusun: "Kadisobo I", kader: 5, balita: 42, ibu_hamil: 3, status: "Aktif" },
    { id: 2, nama: "Posyandu Melati", dusun: "Kadisobo II", kader: 5, balita: 38, ibu_hamil: 2, status: "Aktif" },
    { id: 3, nama: "Posyandu Mawar", dusun: "Klegen Polowidi", kader: 5, balita: 35, ibu_hamil: 4, status: "Aktif" },
    { id: 4, nama: "Posyandu Dahlia", dusun: "Pendeman", kader: 5, balita: 40, ibu_hamil: 2, status: "Aktif" },
    { id: 5, nama: "Posyandu Kenanga", dusun: "Balong Mantaran", kader: 5, balita: 33, ibu_hamil: 3, status: "Aktif" },
    { id: 6, nama: "Posyandu Flamboyan", dusun: "Jogokerten", kader: 5, balita: 45, ibu_hamil: 5, status: "Aktif" },
    { id: 7, nama: "Posyandu Cempaka", dusun: "Blunyah", kader: 5, balita: 29, ibu_hamil: 2, status: "Aktif" },
    { id: 8, nama: "Posyandu Aster", dusun: "Pambregan", kader: 5, balita: 37, ibu_hamil: 3, status: "Aktif" },
    { id: 9, nama: "Posyandu Bougenville", dusun: "Klelen Tegalsari", kader: 5, balita: 31, ibu_hamil: 1, status: "Aktif" },
    { id: 10, nama: "Posyandu Kamboja", dusun: "Kalirase", kader: 5, balita: 44, ibu_hamil: 4, status: "Aktif" },
    { id: 11, nama: "Posyandu Teratai", dusun: "Kepitu", kader: 5, balita: 28, ibu_hamil: 2, status: "Aktif" },
    { id: 12, nama: "Posyandu Tulip", dusun: "Karang Kepanjen", kader: 5, balita: 36, ibu_hamil: 3, status: "Aktif" },
    { id: 13, nama: "Posyandu Seruni", dusun: "Sidomulyo", kader: 5, balita: 32, ibu_hamil: 2, status: "Aktif" },
];

async function fetchPosyanduData() {
    try {
        // Step 1: Get CSRF token from login page
        const loginPageRes = await fetch(`${BASE_URL}/admin/posyandu`, {
            headers: { "User-Agent": "Mozilla/5.0", "Accept": "text/html" },
            signal: AbortSignal.timeout(8000),
        });

        const loginHtml = await loginPageRes.text();
        const csrfMatch = loginHtml.match(/name="_token"\s+value="([^"]+)"/);
        const csrf = csrfMatch?.[1];
        const cookies = loginPageRes.headers.get("set-cookie") || "";
        const sessionCookie = cookies.split(";")[0];

        if (!csrf) throw new Error("Could not extract CSRF token");

        // Step 2: Login
        const loginRes = await fetch(`${BASE_URL}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": sessionCookie,
                "User-Agent": "Mozilla/5.0",
                "Referer": `${BASE_URL}/admin/posyandu`,
            },
            body: new URLSearchParams({
                _token: csrf,
                username: "admin",
                password: "admin3578",
            }).toString(),
            redirect: "manual",
            signal: AbortSignal.timeout(8000),
        });

        const authCookies = loginRes.headers.get("set-cookie") || sessionCookie;
        const authSession = authCookies.split(";")[0];

        // Step 3: Try to get posyandu data as JSON
        const dataRes = await fetch(`${BASE_URL}/admin/posyandu`, {
            headers: {
                "Cookie": authSession,
                "Accept": "application/json, text/html",
                "User-Agent": "Mozilla/5.0",
            },
            signal: AbortSignal.timeout(8000),
        });

        if (dataRes.ok) {
            const text = await dataRes.text();
            // Try JSON parse
            try {
                const json = JSON.parse(text);
                if (json.data || Array.isArray(json)) {
                    return Array.isArray(json) ? json : json.data;
                }
            } catch {
                // HTML response - not parseable, use fallback
            }
        }
        return null;
    } catch (e) {
        console.warn("[posyandu API] External fetch failed:", e instanceof Error ? e.message : e);
        return null;
    }
}

export async function GET() {
    const externalData = await fetchPosyanduData();
    const data = externalData || STATIC_POSYANDU_DATA;

    const totalBalita = data.reduce((s: number, p: any) => s + (p.balita || 0), 0);
    const totalIbuHamil = data.reduce((s: number, p: any) => s + (p.ibu_hamil || 0), 0);
    const totalKader = data.reduce((s: number, p: any) => s + (p.kader || 0), 0);

    return NextResponse.json({
        success: true,
        source: externalData ? "live" : "static",
        data,
        stats: {
            total_posyandu: data.length,
            total_balita: totalBalita,
            total_ibu_hamil: totalIbuHamil,
            total_kader: totalKader,
            posyandu_aktif: data.filter((p: any) => p.status === "Aktif").length,
        },
    }, {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" }
    });
}
