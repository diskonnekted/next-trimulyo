import { NextResponse } from "next/server";
import { env } from "process";

// Cache version - controlled by LAST_MODIFIED environment variable
const CACHE_VERSION = {
    lastModified: parseInt(env.LAST_MODIFIED || "1731110400", 10),
    timestamp: new Date().toISOString(),
    build: env.BUILD_ID || "dev",
};

export async function GET() {
    return NextResponse.json({
        cacheVersion: CACHE_VERSION.lastModified.toString(),
        lastModified: CACHE_VERSION.lastModified,
        timestamp: CACHE_VERSION.timestamp,
        build: CACHE_VERSION.build,
        active: true,
    });
}
