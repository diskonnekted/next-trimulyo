import { NextResponse } from "next/server";

// export const dynamic = 'force-dynamic';

export async function GET() {
    // Temporarily disabled to fix build errors
    return NextResponse.json({
        devices: [],
        summary: {
            totalDevices: 0,
            totalSensors: 0,
            activeSensors: 0,
            warningSensors: 0,
            criticalSensors: 0,
        },
        message: "IoT service temporarily unavailable"
    });

    /* 
    try {
        // In a build/prerender context, we might want to return mock/empty data
        // or handle timeouts gracefully. fetchAllIoTData already has some fallback logic
        // but let's ensure it doesn't block the build.
        const { devices, summary } = await fetchAllIoTData();

        return NextResponse.json({
            devices: devices,
            summary: summary,
        });
    } catch (error) {
        console.error("Error fetching IoT data:", error);
        // Return 500 but with a JSON body so the client can handle it
        return NextResponse.json(
            { error: "Failed to fetch IoT data", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
    */
}