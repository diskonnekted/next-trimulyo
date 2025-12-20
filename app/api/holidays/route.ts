import { NextRequest, NextResponse } from "next/server";
import { fetchHolidays, createApiRouteHandler } from "@/lib/api-helpers";

export interface Holiday {
    nama_perayaan: string;
    tanggal: string;
    jenis: string;
    keterangan: string;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    const response = await fetchHolidays(limit);

    return NextResponse.json({
        success: response.success,
        data: response.data || [],
        message: response.message,
    });
}

// Use the standardized API route handler with CORS support
export const { OPTIONS } = createApiRouteHandler(async () => {
    // This is handled by GET above
    return NextResponse.json({ success: true });
});
