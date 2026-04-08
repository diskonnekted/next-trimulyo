/**
 * Seed IDM data to database from Kemendesa API
 * 
 * Usage:
 *   npx tsx scripts/seed-idm.ts          # Seed default years (2024, 2023, 2022, 2021)
 *   npx tsx scripts/seed-idm.ts 2024      # Seed specific year
 *   npx tsx scripts/seed-idm.ts 2024 2023 # Seed multiple years
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DESA_ID = "3404132005"; // Trimulyo village code

async function fetchIDMData(year: number) {
    console.log(`Fetching IDM data for year ${year}...`);
    const url = `https://idm.kemendesa.go.id/open/api/desa/rumusan/${DESA_ID}/${year}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        console.error(`Failed to fetch IDM ${year}: HTTP ${response.status}`);
        return null;
    }
    
    const json = await response.json();
    if (json.error) {
        console.error(`IDM API returned error for ${year}: ${json.message}`);
        return null;
    }
    
    return json.mapData;
}

function extractScores(rowData: any[]) {
    let skorIks: number | null = null;
    let skorIke: number | null = null;
    let skorIkl: number | null = null;
    
    for (const row of rowData) {
        if (row.INDIKATOR?.startsWith("IKS ")) skorIks = row.SKOR;
        if (row.INDIKATOR?.startsWith("IKE ")) skorIke = row.SKOR;
        if (row.INDIKATOR?.startsWith("IKL ")) skorIkl = row.SKOR;
    }
    
    return { skorIks, skorIke, skorIkl };
}

async function seedIDM(years: number[]) {
    let success = 0;
    let skipped = 0;
    let failed = 0;
    
    for (const year of years) {
        try {
            // Check if already exists
            const existing = await prisma.iDMRecord.findUnique({
                where: { tahun_desaId: { tahun: year, desaId: DESA_ID } },
            });
            
            if (existing) {
                console.log(`IDM ${year} already exists, skipping...`);
                skipped++;
                continue;
            }
            
            const data = await fetchIDMData(year);
            if (!data) {
                failed++;
                continue;
            }
            
            const { skorIks, skorIke, skorIkl } = extractScores(data.ROW || []);
            
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
            
            console.log(`Saved IDM ${year}: Status=${data.SUMMARIES?.STATUS || "N/A"}, Score=${data.SUMMARIES?.SKOR_SAAT_INI || "N/A"}`);
            success++;
        } catch (error) {
            console.error(`Error seeding IDM ${year}:`, error);
            failed++;
        }
    }
    
    console.log("\n=== Seed Complete ===");
    console.log(`Success: ${success}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Failed: ${failed}`);
}

// Main
const args = process.argv.slice(2);
const years = args.length > 0 ? args.map(Number) : [2024, 2023, 2022, 2021];

seedIDM(years)
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("Fatal error:", err);
        process.exit(1);
    });
