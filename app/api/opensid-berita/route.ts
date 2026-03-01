import { NextResponse } from "next/server";
import { fetchOpenSIDArsip } from "@/lib/api-helpers";

export async function GET() {
    try {
        // Fetch from OpenSID API (via helper which uses correct base URL)
        const response = await fetchOpenSIDArsip();

        if (!response.success) {
            console.error(`OpenSID API returned error:`, response.error);
            return NextResponse.json({
                data: [],
                meta: { pagination: { total: 0 } },
                message: "News temporarily unavailable"
            }, { status: response.status || 500 });
        }

        const data = response.data;
        
        // Pass through the data directly as it's already in OpenSID format
        // (fetchOpenSIDArsip returns the raw response from OpenSID)
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("Error fetching OpenSID news:", error);
        return NextResponse.json(
            { error: "Failed to fetch news" },
            { status: 500 }
        );
    }
}
