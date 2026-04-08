import { NextResponse } from "next/server";

const OPENSID_PENDUDUK = "https://trimulyo.sleman-desa.id/internal_api/statistik/penduduk";
const REVALIDATE = 60 * 30; // 30 minutes

export async function GET() {
    try {
        const response = await fetch(OPENSID_PENDUDUK, {
            next: { revalidate: REVALIDATE },
        });

        if (!response.ok) {
            throw new Error(`OpenSID API error: ${response.status}`);
        }

        const opensidData = await response.json();
        if (opensidData && opensidData.data && opensidData.data.length > 0) {
            const totalData = opensidData.data.find(
                (item: { attributes?: { nama?: string } }) => item.attributes?.nama === "TOTAL"
            );
            const totalPenduduk = totalData?.attributes?.jumlah || 0;
            const totalLaki = totalData?.attributes?.laki || 0;
            const totalPerempuan = totalData?.attributes?.perempuan || 0;

            return NextResponse.json({
                success: true,
                population: {
                    total: totalPenduduk,
                    laki: totalLaki,
                    perempuan: totalPerempuan,
                },
            });
        }
    } catch (error) {
        console.error("Failed to fetch kalurahan stats:", error);
    }

    // Fallback
    return NextResponse.json({
        success: true,
        population: { total: 8430, laki: 4260, perempuan: 4169 },
    });
}
