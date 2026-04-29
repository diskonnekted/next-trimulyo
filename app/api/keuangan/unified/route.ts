import { NextResponse } from "next/server";
import { fetchOpenSIDPembangunan, fetchOpenSIDPPID, fetchOpenSIDWilayah } from "@/lib/api-helpers";

export async function GET() {
    try {
        // 1. Fetch Pembangunan data for real budget stats
        const pembangunanRes = await fetchOpenSIDPembangunan();
        
        // 2. Fetch PPID for official documents (APBKAL 2026)
        const ppidRes = await fetchOpenSIDPPID();
        
        // 3. Fetch Wilayah for population stats
        const wilayahRes = await fetchOpenSIDWilayah();

        let statsByYear: Record<string, any> = {};
        let documents: any[] = [];
        let totalPopulation = 0;

        // Process Pembangunan Data
        if (pembangunanRes.success && pembangunanRes.data) {
            const rawData = (pembangunanRes.data as any).data || [];
            statsByYear = rawData.reduce((acc: any, curr: any) => {
                const year = curr.attributes.tahun_anggaran || "Unknown";
                if (!acc[year]) acc[year] = { total_anggaran: 0, total_realisasi: 0, count: 0 };
                acc[year].total_anggaran += (curr.attributes.anggaran || 0);
                acc[year].total_realisasi += (curr.attributes.sumber_biaya_jumlah || 0);
                acc[year].count += 1;
                return acc;
            }, {});
        }

        // Process PPID Data (Official PDF Documents)
        if (ppidRes.success && ppidRes.data) {
            const rawDocs = (ppidRes.data as any).data || [];
            documents = rawDocs
                .filter((d: any) => d && d.attributes)
                .map((d: any) => ({
                    judul: d.attributes.nama || d.attributes.judul,
                    url: d.attributes.satuan || d.attributes.link,
                    tahun: d.attributes.tahun,
                    tgl_upload: d.attributes.tgl_upload
                }));
        }

        // Process Population Data
        if (wilayahRes.success && wilayahRes.data) {
            const rawWilayah = (wilayahRes.data as any).data || [];
            totalPopulation = rawWilayah.reduce((acc: number, p: any) => {
                return acc + (p.attributes.penduduk_pria_wanita_count || 0);
            }, 0);
        }

        return NextResponse.json({
            success: true,
            data: {
                stats: statsByYear,
                documents: documents,
                population: totalPopulation,
                updated_at: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Finance API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch financial data" }, { status: 500 });
    }
}
