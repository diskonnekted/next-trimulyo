import { NextResponse } from "next/server";
import { fetchOpenSIDStatistik } from "@/lib/api-helpers";

export async function GET() {
    const response = await fetchOpenSIDStatistik("/internal_api/stunting", {
        cacheTags: ["opensid-data-stunting"],
        fallbackData: [],
    });

    return NextResponse.json(response.success ? response.data : response);
}
