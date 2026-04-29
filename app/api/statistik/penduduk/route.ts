import { NextResponse } from "next/server";

const OPENSID_API_URL = "https://trimulyo.sleman-desa.id/internal_api/statistik/penduduk";
const REVALIDATE = 60 * 30; // 30 minutes

export async function GET() {
    try {
        // We use wilayah/administratif because it contains population counts per dusun/hamlet
        const response = await fetch("https://trimulyo.sleman-desa.id/internal_api/wilayah/administratif", {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`OpenSID API error: ${response.status}`);
        }

        const opensidData = await response.json();
        const rawData = opensidData.data || [];

        // Transform data into PopulationStat format
        const transformedData = rawData.map((item: any) => {
            const attr = item.attributes || {};
            return {
                dusun: attr.dusun || "-",
                kepalaDusun: attr.kepala_nama || "-",
                jumlahRw: attr.rws_count || 0,
                jumlahRt: attr.rts_count || 0,
                jumlahKk: attr.keluarga_aktif_count || 0,
                jiwa: attr.penduduk_pria_wanita_count || 0,
                lakiLaki: attr.penduduk_pria_count || 0,
                perempuan: attr.penduduk_wanita_count || 0,
            };
        });

        // Calculate totals
        const total = transformedData.reduce(
            (acc: any, curr: any) => ({
                jumlahKk: acc.jumlahKk + curr.jumlahKk,
                jiwa: acc.jiwa + curr.jiwa,
                lakiLaki: acc.lakiLaki + curr.lakiLaki,
                perempuan: acc.perempuan + curr.perempuan,
            }),
            { jumlahKk: 0, jiwa: 0, lakiLaki: 0, perempuan: 0 }
        );

        return NextResponse.json({
            success: true,
            data: transformedData,
            total,
        });
    } catch (error) {
        console.error("Failed to fetch population stats from OpenSID:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Gagal memuat data statistik penduduk",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
