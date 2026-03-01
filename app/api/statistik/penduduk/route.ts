import { NextResponse } from "next/server";

interface PopulationStat {
    dusun: string;
    kepalaDusun: string;
    jumlahRw: number;
    jumlahRt: number;
    jumlahKk: number;
    jiwa: number;
    lakiLaki: number;
    perempuan: number;
}

const POPULATION_DATA: PopulationStat[] = [
    { dusun: "BALONG MANTARAN", kepalaDusun: "MUHAMMAD NASRUN", jumlahRw: 2, jumlahRt: 5, jumlahKk: 312, jiwa: 900, lakiLaki: 443, perempuan: 457 },
    { dusun: "BLUNYAH", kepalaDusun: "ARFAN HARNANTO", jumlahRw: 2, jumlahRt: 4, jumlahKk: 305, jiwa: 868, lakiLaki: 411, perempuan: 457 },
    { dusun: "JOGOKERTEN", kepalaDusun: "MULYANA JATI", jumlahRw: 2, jumlahRt: 5, jumlahKk: 354, jiwa: 933, lakiLaki: 462, perempuan: 471 },
    { dusun: "KADISOBO I", kepalaDusun: "SUMANTORO", jumlahRw: 2, jumlahRt: 5, jumlahKk: 253, jiwa: 704, lakiLaki: 367, perempuan: 337 },
    { dusun: "KADISOBO II", kepalaDusun: "MAWARDI", jumlahRw: 2, jumlahRt: 4, jumlahKk: 216, jiwa: 537, lakiLaki: 266, perempuan: 271 },
    { dusun: "KALIRASE", kepalaDusun: "INDAH PRIYANI", jumlahRw: 2, jumlahRt: 4, jumlahKk: 297, jiwa: 749, lakiLaki: 370, perempuan: 379 },
    { dusun: "KARANG KEPANJEN", kepalaDusun: "ERNA NUROHMI", jumlahRw: 2, jumlahRt: 5, jumlahKk: 338, jiwa: 998, lakiLaki: 495, perempuan: 503 },
    { dusun: "KEPITU", kepalaDusun: "ADHI PRAMONO", jumlahRw: 2, jumlahRt: 5, jumlahKk: 367, jiwa: 1054, lakiLaki: 535, perempuan: 519 },
    { dusun: "KLEGEN POLOWIDI", kepalaDusun: "ANDAYANI LESTARI", jumlahRw: 2, jumlahRt: 4, jumlahKk: 279, jiwa: 808, lakiLaki: 417, perempuan: 390 },
    { dusun: "KLELEN TEGALSARI", kepalaDusun: "AGUS SUJENDRO", jumlahRw: 3, jumlahRt: 7, jumlahKk: 459, jiwa: 1178, lakiLaki: 571, perempuan: 607 },
    { dusun: "NGEMPLAK KALANGAN", kepalaDusun: "SUPRIYANTO", jumlahRw: 2, jumlahRt: 4, jumlahKk: 157, jiwa: 458, lakiLaki: 218, perempuan: 240 },
    { dusun: "PAMBREGAN", kepalaDusun: "FATONAH", jumlahRw: 2, jumlahRt: 4, jumlahKk: 149, jiwa: 416, lakiLaki: 212, perempuan: 204 },
    { dusun: "PENDEMAN", kepalaDusun: "BOIMAN", jumlahRw: 2, jumlahRt: 5, jumlahKk: 270, jiwa: 739, lakiLaki: 376, perempuan: 363 },
    { dusun: "SIDOMULYO", kepalaDusun: "DIDIT NOOR CAHYANTO", jumlahRw: 3, jumlahRt: 7, jumlahKk: 446, jiwa: 1287, lakiLaki: 629, perempuan: 658 },
];

export async function GET() {
    // Calculate totals
    const total = POPULATION_DATA.reduce((acc, curr) => ({
        jumlahKk: acc.jumlahKk + curr.jumlahKk,
        jiwa: acc.jiwa + curr.jiwa,
        lakiLaki: acc.lakiLaki + curr.lakiLaki,
        perempuan: acc.perempuan + curr.perempuan
    }), { jumlahKk: 0, jiwa: 0, lakiLaki: 0, perempuan: 0 });

    return NextResponse.json({
        success: true,
        data: POPULATION_DATA,
        total
    });
}
