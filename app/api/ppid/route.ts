import { NextRequest, NextResponse } from "next/server";
import { fetchOpenSIDPPID, extractQueryParams } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
    extractQueryParams(request); // Extract but don't use page for now

    const response = await fetchOpenSIDPPID();

    if (!response.success) {
        return NextResponse.json(
            {
                error: "Failed to fetch PPID data",
                message: response.message,
                data: [],
            },
            { status: 500 }
        );
    }

    return NextResponse.json(response.data);
}
