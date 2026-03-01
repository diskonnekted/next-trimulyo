import { NextResponse } from "next/server";
import { getCommunities, getCommunityDetail } from "@/lib/api-komunitas";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        if (id) {
            const detail = await getCommunityDetail(parseInt(id));
            if (!detail) {
                return NextResponse.json({ success: false, message: "Community not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: detail });
        } else {
            const communities = await getCommunities();
            return NextResponse.json({ success: true, data: communities });
        }
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
