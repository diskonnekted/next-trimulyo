import { NextResponse } from "next/server";

const WP_SKM_URL = "https://trimulyosid.slemankab.go.id/wp-json/skm/v1/surveys";
const REVALIDATE = 60 * 60 * 2; // 2 hours cache

export async function GET() {
    try {
        const response = await fetch(WP_SKM_URL, {
            next: { revalidate: REVALIDATE },
            headers: {
                Accept: "application/json",
                "User-Agent": "Trimulyo-NextJS/1.0",
            },
        });

        if (!response.ok) {
            console.error(`SKM API error: ${response.status} ${response.statusText}`);
            return NextResponse.json([]);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching SKM data:", error);
        return NextResponse.json([]);
    }
}
