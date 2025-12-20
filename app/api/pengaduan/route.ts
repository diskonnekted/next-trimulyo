import { NextResponse } from "next/server";
import { fetchOpenSIDPengaduan } from "@/lib/api-helpers";

export async function GET() {
    const response = await fetchOpenSIDPengaduan();

    if (!response.success) {
        return NextResponse.json(
            {
                error: "Failed to fetch pengaduan data",
                message: response.message,
                data: [],
            },
            { status: 500 }
        );
    }

    return NextResponse.json(response.data);
}
