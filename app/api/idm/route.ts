import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fetchIDMData, createApiRouteHandler } from "@/lib/api-helpers";

const prisma = new PrismaClient();
const DESA_ID = "3404132005";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get("year") || "2024");

    try {
        // 1. Try from database first
        const dbRecord = await prisma.iDMRecord.findUnique({
            where: { tahun_desaId: { tahun: year, desaId: DESA_ID } },
        });

        if (dbRecord) {
            return NextResponse.json({
                source: "local",
                SUMMARIES: dbRecord.summaries,
                ROW: dbRecord.indicators,
                IDENTITAS: [dbRecord.identity],
                skorIks: dbRecord.skorIks,
                skorIke: dbRecord.skorIke,
                skorIkl: dbRecord.skorIkl,
            });
        }

        // 2. Fallback: fetch from external API
        console.log(`IDM ${year} not in database, fetching from external API...`);
        const response = await fetchIDMData(String(year));

        if (response.success && response.data) {
            const data = response.data;
            
            // Extract scores
            let skorIks: number | null = null;
            let skorIke: number | null = null;
            let skorIkl: number | null = null;
            
            for (const row of data.ROW || []) {
                if (row.INDIKATOR?.startsWith("IKS ")) skorIks = row.SKOR;
                if (row.INDIKATOR?.startsWith("IKE ")) skorIke = row.SKOR;
                if (row.INDIKATOR?.startsWith("IKL ")) skorIkl = row.SKOR;
            }

            // Save to database for future requests
            try {
                await prisma.iDMRecord.create({
                    data: {
                        tahun: year,
                        desaId: DESA_ID,
                        summaries: data.SUMMARIES || {},
                        indicators: data.ROW || [],
                        identity: data.IDENTITAS?.[0] || {},
                        skorIks,
                        skorIke,
                        skorIkl,
                    },
                });
                console.log(`IDM ${year} saved to database`);
            } catch (e) {
                console.error(`Failed to save IDM ${year} to database:`, e);
            }

            return NextResponse.json({
                source: "external",
                SUMMARIES: data.SUMMARIES,
                ROW: data.ROW,
                IDENTITAS: data.IDENTITAS,
                skorIks,
                skorIke,
                skorIkl,
            });
        }

        return NextResponse.json({
            source: "none",
            error: "Data tidak tersedia",
        });
    } catch (error) {
        console.error("Error fetching IDM data:", error);
        return NextResponse.json({ error: "Failed to fetch IDM data" }, { status: 500 });
    }
}

// Use the standardized API route handler with CORS support
export const { OPTIONS } = createApiRouteHandler(async () => {
    return NextResponse.json({ success: true });
});
