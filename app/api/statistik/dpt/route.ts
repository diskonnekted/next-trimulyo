import { NextResponse } from "next/server";
import { fetchOpenSIDStatistik } from "@/lib/api-helpers";

export async function GET() {
    const response = await fetchOpenSIDStatistik("/internal_api/dpt", {
        cacheTags: ["opensid-data-dpt"],
        fallbackData: [],
    });

    return NextResponse.json(response.success ? response.data : response);
}
