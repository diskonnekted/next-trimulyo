import { NextResponse } from "next/server";
import { fetchOpenSIDArsip } from "@/lib/api-helpers";

// Proxy API route to fetch from OpenSID (avoids CORS issues)
export async function GET() {
    const response = await fetchOpenSIDArsip();

    if (!response.success) {
        console.error(`OpenSID Proxy: API error`, response.error);
        return NextResponse.json(
            { error: "Failed to fetch from OpenSID", details: response.message },
            { status: response.status || 500 }
        );
    }

    const data = response.data as { data?: unknown[] };
    console.log(`OpenSID Proxy: Successfully fetched ${data?.data?.length || 0} articles`);
    return NextResponse.json(response.data);
}
