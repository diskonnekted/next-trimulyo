import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const idKalurahan = searchParams.get("id_kalurahan") || "DL2XryeXPQXwIFf58iRfWSCZfzq2";

        const response = await fetch(`https://sigantara.vercel.app/api/view?id_kalurahan=${idKalurahan}`, {
            next: {
                revalidate: 3600, // 1 hour
                tags: ["sigantara-data"],
            },
        });

        if (!response.ok) {
            throw new Error(`Sigantara API error: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (error) {
        console.error("Error fetching Sigantara data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data from Sigantara" },
            { status: 500 }
        );
    }
}
