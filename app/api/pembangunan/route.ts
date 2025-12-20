import { NextRequest, NextResponse } from "next/server";
import { fetchOpenSIDPembangunan, extractQueryParams } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
    extractQueryParams(request); // Extract but don't use page for now

    const response = await fetchOpenSIDPembangunan();

    if (!response.success) {
        return NextResponse.json(
            {
                error: "Failed to fetch pembangunan data",
                message: response.message,
                data: [],
            },
            { status: 500 }
        );
    }

    // Add pagination if supported by the API
    return NextResponse.json(response.data);
}
