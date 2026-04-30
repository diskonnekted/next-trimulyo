import { NextRequest, NextResponse } from "next/server";
import { createApiRouteHandler } from "@/lib/api-helpers";
import idmData from "@/data/idm-data.json";

/**
 * GET /api/idm?year=2024
 *
 * Reads from static JSON file first (no DB needed).
 * Falls back to external API if year not found in JSON.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get("year") || "2024");

    // 1. Read from static JSON file
    const cached = (idmData as Record<string, unknown>)[year];
    if (cached) {
        return NextResponse.json({ source: "local", ...cached });
    }

    // 2. Fallback: fetch from external API
    try {
        console.log(`IDM ${year} not in cache, fetching from Kemenkalurahan API...`);
        const url = `https://idm.kemenkalurahan.go.id/open/api/kalurahan/rumusan/3404132005/${year}`;
        const response = await fetch(url, {
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        if (json.error) {
            return NextResponse.json({ source: "none", error: json.message }, { status: 404 });
        }

        return NextResponse.json({ source: "external", ...json.mapData });
    } catch (error) {
        console.error(`Error fetching IDM ${year}:`, error);
        return NextResponse.json(
            { source: "none", error: "Data tidak tersedia" },
            { status: 500 }
        );
    }
}

// Use the standardized API route handler with CORS support
export const { OPTIONS } = createApiRouteHandler(async () => {
    return NextResponse.json({ success: true });
});
