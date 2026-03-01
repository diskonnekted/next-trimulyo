import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Use default ID if searchParams access causes prerender bailout
        // We handle this by checking if we're in a build context if needed,
        // but for now let's make the ID optional/default more robustly
        let idKalurahan = "DL2XryeXPQXwIFf58iRfWSCZfzq2";
        
        try {
            const { searchParams } = new URL(request.url);
            const paramId = searchParams.get("id_kalurahan");
            if (paramId) idKalurahan = paramId;
        } catch (e) {
            // If URL parsing fails (e.g. during some build phases), use default
            console.warn("Could not parse request URL in Sigantara API, using default ID");
        }

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
