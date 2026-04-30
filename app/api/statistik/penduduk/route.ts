import { NextResponse } from "next/server";

const OPENSID_API_URL = "https://trimulyo.sleman-kalurahan.id/internal_api/statistik/penduduk";
const REVALIDATE = 60 * 30; // 30 minutes

export async function GET() {
        const fallbackData = [
            { dusun: "BLUNYAH", kepalaDusun: "Suhardi", jumlahRw: 4, jumlahRt: 12, jumlahKk: 345, jiwa: 1024, lakiLaki: 510, perempuan: 514 },
            { dusun: "PUCUNG", kepalaDusun: "Sumadi", jumlahRw: 3, jumlahRt: 9, jumlahKk: 280, jiwa: 850, lakiLaki: 420, perempuan: 430 },
            { dusun: "DENOKAN", kepalaDusun: "Raharjo", jumlahRw: 2, jumlahRt: 6, jumlahKk: 190, jiwa: 580, lakiLaki: 285, perempuan: 295 },
            { dusun: "TRIMULYO", kepalaDusun: "Suparman", jumlahRw: 5, jumlahRt: 15, jumlahKk: 410, jiwa: 1240, lakiLaki: 615, perempuan: 625 },
            { dusun: "KLEGUNG", kepalaDusun: "Widodo", jumlahRw: 3, jumlahRt: 10, jumlahKk: 312, jiwa: 945, lakiLaki: 468, perempuan: 477 },
            { dusun: "KARANGANOM", kepalaDusun: "Sunarto", jumlahRw: 4, jumlahRt: 11, jumlahKk: 320, jiwa: 980, lakiLaki: 485, perempuan: 495 },
            { dusun: "DEMPEL", kepalaDusun: "Mulyono", jumlahRw: 2, jumlahRt: 7, jumlahKk: 215, jiwa: 640, lakiLaki: 310, perempuan: 330 },
            { dusun: "BULUSAN", kepalaDusun: "Handoko", jumlahRw: 3, jumlahRt: 8, jumlahKk: 260, jiwa: 785, lakiLaki: 388, perempuan: 397 },
            { dusun: "BENDUNGAN", kepalaDusun: "Teguh", jumlahRw: 4, jumlahRt: 13, jumlahKk: 380, jiwa: 1120, lakiLaki: 555, perempuan: 565 },
            { dusun: "REJODANI", kepalaDusun: "Agus", jumlahRw: 2, jumlahRt: 5, jumlahKk: 150, jiwa: 450, lakiLaki: 220, perempuan: 230 }
        ];

        const calculateTotals = (data: any[]) => data.reduce(
            (acc: any, curr: any) => ({
                jumlahKk: acc.jumlahKk + curr.jumlahKk,
                jiwa: acc.jiwa + curr.jiwa,
                lakiLaki: acc.lakiLaki + curr.lakiLaki,
                perempuan: acc.perempuan + curr.perempuan,
            }),
            { jumlahKk: 0, jiwa: 0, lakiLaki: 0, perempuan: 0 }
        );

        try {
            const response = await fetch("https://trimulyo.sleman-kalurahan.id/internal_api/wilayah/administratif", {
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(5000) // 5s timeout
            });

            if (!response.ok) throw new Error("API Down");

            const opensidData = await response.json();
            const rawData = opensidData.data || [];

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

            return NextResponse.json({
                success: true,
                data: transformedData,
                total: calculateTotals(transformedData),
                source: "OpenSID"
            });
        } catch (error) {
            console.warn("Falling back to dummy population data due to:", error);
            return NextResponse.json({
                success: true,
                data: fallbackData,
                total: calculateTotals(fallbackData),
                source: "Fallback"
            });
        }
}
