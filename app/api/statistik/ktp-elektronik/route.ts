import { NextResponse } from "next/server";
import { fetchOpenSIDStatistikById } from "@/lib/api-helpers";

export async function GET() {
    const response = await fetchOpenSIDStatistikById("18", "ktp-elektronik", {
        fallbackData: [],
    });

    return NextResponse.json(response.success ? response.data : response);
}
