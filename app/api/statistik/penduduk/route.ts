import { NextResponse } from "next/server";

const OPENSID_API_URL = "https://trimulyo.sleman-desa.id/internal_api/statistik/penduduk";
const REVALIDATE = 60 * 30; // 30 minutes

export async function GET() {
    try {
        const response = await fetch(OPENSID_API_URL, {
            next: { revalidate: REVALIDATE },
        });

        if (!response.ok) {
            throw new Error(`OpenSID API error: ${response.status}`);
        }

        const opensidData = await response.json();
        if (opensidData && opensidData.data && opensidData.data.length > 0) {
            return NextResponse.json({
                success: true,
                data: opensidData.data,
            });
        }
    } catch (error) {
        console.error("Failed to fetch from OpenSID, using mock data:", error);
    }

    // Fallback: mock data for development
    const POPULATION_DATA = [
        { type: "statistik", id: "total", attributes: { nama: "TOTAL", jumlah: 8430, laki: 4260, perempuan: 4169, persen: "100" } },
        { type: "statistik", id: "1", attributes: { nama: "TIDAK/BELUM SEKOLAH", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "2", attributes: { nama: "BELUM TAMAT SD/SEDERAJAT", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "3", attributes: { nama: "TAMAT SD/SEDERAJAT", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "4", attributes: { nama: "SLTP/SEDERAJAT", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "5", attributes: { nama: "SLTA/SEDERAJAT", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "6", attributes: { nama: "DIPLOMA I/II", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "7", attributes: { nama: "AKADEMI/DIPLOMA III/S. MUDA", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "8", attributes: { nama: "DIPLOMA IV/STRATA I", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "9", attributes: { nama: "STRATA II", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
        { type: "statistik", id: "10", attributes: { nama: "STRATA III", jumlah: 0, laki: 0, perempuan: 0, persen: "0" } },
    ];

    return NextResponse.json({
        success: true,
        data: POPULATION_DATA,
    });
}
