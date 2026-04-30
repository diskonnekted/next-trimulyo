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

        // 4. Detailed APBK 2026 Data (from user provided state)
        const apbk2026 = {
            pelaksanaan: {
                pendapatan: { anggaran: 8468530362, realisasi: 0, persen: 0 },
                belanja: { anggaran: 9342749817, realisasi: 0, persen: 0 },
                pembiayaan: { anggaran: 874219455, realisasi: 0, persen: 0 }
            },
            pendapatan_detail: [
                { judul: "Hasil Aset Kalurahan", anggaran: 93000000, realisasi: 0, persen: 0 },
                { judul: "Dana Kalurahan", anggaran: 1415311100, realisasi: 0, persen: 0 },
                { judul: "Bagi Hasil Pajak Dan Retribusi", anggaran: 1105070656, realisasi: 0, persen: 0 }
            ],
            pembelanjaan_detail: [
                { judul: "Bidang Penyelenggaraan Pemerintahan Kalurahan", anggaran: 2786989153, realisasi: 0, persen: 0 },
                { judul: "Bidang Pelaksanaan Pembangunan Kalurahan", anggaran: 2990369384, realisasi: 0, persen: 0 },
                { judul: "Bidang Pembinaan Kemasyarakatan Kalurahan", anggaran: 0, realisasi: 0, persen: 0 }
            ]
        };

        return NextResponse.json({
            success: true,
            data: {
                stats: statsByYear,
                documents: documents,
                population: totalPopulation,
                apbk2026: apbk2026,
                updated_at: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Finance API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch financial data" }, { status: 500 });
    }
}
