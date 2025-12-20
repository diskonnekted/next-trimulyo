import { NextResponse } from "next/server";
import { fetchOpenSIDPemerintah } from "@/lib/api-helpers";

export async function GET() {
    const response = await fetchOpenSIDPemerintah();

    if (!response.success) {
        return NextResponse.json(
            {
                error: "Failed to fetch pemerintah data",
                message: response.message,
                data: [],
            },
            { status: 500 }
        );
    }

    return NextResponse.json(response.data);
}
