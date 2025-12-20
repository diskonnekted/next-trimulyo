import { NextRequest, NextResponse } from "next/server";

interface HistoricalDataResponse {
    channel: {
        id: number;
        name: string;
        description: string;
    };
    sensors: Array<{
        id: string;
        name: string;
        unit: string;
    }>;
    data: Array<{
        timestamp: string;
        entry_id: number;
        date: Date;
        [key: string]: number | string | Date;
    }>;
    totalRecords: number;
}

// Cache for historical data per channel
const historicalCache: Map<string, { data: HistoricalDataResponse; timestamp: number }> = new Map();
const CACHE_DURATION = 300000; // 5 minutes cache for historical data

export async function GET(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const { channelId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const results = searchParams.get("results") || "8000"; // Default to 8000

    try {
        // Check cache first
        const cached = historicalCache.get(`${channelId}-${results}`);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log(`Returning cached historical data for channel ${channelId}`);
            return NextResponse.json(cached.data);
        }

        const API_BASE_URL = `https://api.thingspeak.com/channels/${channelId}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for large data

        const feedsResponse = await fetch(`${API_BASE_URL}/feeds.json?results=${results}`, {
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                Accept: "application/json",
                "Accept-Language": "id-ID,id;q=0.9,en;q=0.8",
            },
            cache: "no-store",
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!feedsResponse.ok) {
            throw new Error(`Failed to fetch ThingSpeak historical data: ${feedsResponse.status}`);
        }

        const feedsData = await feedsResponse.json();
        const channel = feedsData.channel;

        // Format data for charts
        const historicalData = feedsData.feeds.map((feed: Record<string, unknown>) => {
            const entry: Record<string, unknown> = {
                timestamp: feed.created_at,
                entry_id: feed.entry_id,
                date: new Date(feed.created_at as string),
            };

            // Add all field data
            for (let i = 1; i <= 8; i++) {
                const fieldName = channel[`field${i}`] as string;
                if (fieldName) {
                    entry[fieldName] = parseFloat((feed[`field${i}`] as string) || "0");
                }
            }

            return entry;
        });

        // Get field names for sensors
        const sensors = [];
        for (let i = 1; i <= 8; i++) {
            const fieldName = channel[`field${i}`];
            if (fieldName) {
                sensors.push({
                    id: `field${i}`,
                    name: fieldName,
                    unit: fieldName.match(/\(([^)]+)\)/)?.[1] || "",
                });
            }
        }

        const response = {
            channel: {
                id: channel.id,
                name: channel.name,
                description: channel.description,
            },
            sensors,
            data: historicalData.reverse(), // Newest first
            totalRecords: historicalData.length,
        };

        // Cache the result
        historicalCache.set(`${channelId}-${results}`, {
            data: response,
            timestamp: Date.now(),
        });

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Error fetching historical data for channel ${channelId}:`, error);
        return NextResponse.json(
            {
                error: "Failed to fetch historical data",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
