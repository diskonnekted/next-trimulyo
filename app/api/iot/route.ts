import { NextResponse } from "next/server";
import { fetchAllIoTData } from "@/lib/thingspeak";

export async function GET() {
    try {
        const { devices, summary } = await fetchAllIoTData();

        return NextResponse.json({
            devices: devices,
            summary: summary,
        });
    } catch (error) {
        console.error("Error fetching IoT data:", error);
        return NextResponse.json(
            { error: "Failed to fetch IoT data", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
