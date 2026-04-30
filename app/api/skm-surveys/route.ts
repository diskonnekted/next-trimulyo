import { NextResponse } from "next/server";

// In-memory store for surveys (will reset on server restart)
// In production, replace with database (e.g., Prisma/Supabase)
const surveyStore: SurveyResponse[] = [
    // Seed data agar halaman tidak kosong
    { id: "seed-1", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), layanan: 4, informasi: 5, petugas: 4, waktu: 3, fasilitas: 4, saran: "Pelayanan sudah baik", jenisLayanan: "KTP/KK" },
    { id: "seed-2", timestamp: new Date(Date.now() - 86400000).toISOString(), layanan: 5, informasi: 4, petugas: 5, waktu: 4, fasilitas: 3, saran: "Semoga makin maju", jenisLayanan: "Surat Keterangan" },
    { id: "seed-3", timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), layanan: 3, informasi: 4, petugas: 4, waktu: 3, fasilitas: 3, saran: "", jenisLayanan: "Layanan Umum" },
];

interface SurveyResponse {
    id: string;
    timestamp: string;
    layanan: number;       // 1-5: kualitas layanan
    informasi: number;     // 1-5: kemudahan informasi
    petugas: number;       // 1-5: sikap petugas
    waktu: number;         // 1-5: ketepatan waktu
    fasilitas: number;     // 1-5: fasilitas
    saran: string;
    jenisLayanan: string;
}

function calcAvg(arr: number[]) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export async function GET() {
    const total = surveyStore.length;
    if (total === 0) {
        return NextResponse.json({ success: true, total: 0, responses: [], summary: null });
    }

    const avg = {
        layanan: calcAvg(surveyStore.map(s => s.layanan)),
        informasi: calcAvg(surveyStore.map(s => s.informasi)),
        petugas: calcAvg(surveyStore.map(s => s.petugas)),
        waktu: calcAvg(surveyStore.map(s => s.waktu)),
        fasilitas: calcAvg(surveyStore.map(s => s.fasilitas)),
    };

    const overallIKM = calcAvg(Object.values(avg));

    // Convert IKM 1-5 scale to 100 scale and grade
    const ikm100 = (overallIKM / 5) * 100;
    let mutu = "C";
    let kinerja = "Kurang Baik";
    if (ikm100 >= 88.31) { mutu = "A"; kinerja = "Sangat Baik"; }
    else if (ikm100 >= 76.61) { mutu = "B"; kinerja = "Baik"; }
    else if (ikm100 >= 65.0) { mutu = "C"; kinerja = "Kurang Baik"; }
    else { mutu = "D"; kinerja = "Tidak Baik"; }

    // Distribution per rating
    const dist: Record<string, number[]> = { "1": [], "2": [], "3": [], "4": [], "5": [] };
    surveyStore.forEach(s => {
        const overall = Math.round((s.layanan + s.informasi + s.petugas + s.waktu + s.fasilitas) / 5);
        dist[String(overall)]?.push(1);
    });

    const distribution = Object.entries(dist).map(([rating, arr]) => ({
        rating: parseInt(rating),
        count: arr.length,
        pct: Math.round((arr.length / total) * 100),
    }));

    // Recent saran (last 5 non-empty)
    const recentSaran = surveyStore
        .filter(s => s.saran.trim())
        .slice(-5)
        .reverse()
        .map(s => ({ saran: s.saran, timestamp: s.timestamp, jenisLayanan: s.jenisLayanan }));

    return NextResponse.json({
        success: true,
        total,
        summary: { avg, overallIKM, ikm100: Math.round(ikm100 * 100) / 100, mutu, kinerja },
        distribution,
        recentSaran,
        responses: surveyStore.slice(-10).reverse(),
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { layanan, informasi, petugas, waktu, fasilitas, saran, jenisLayanan } = body;

        // Validate
        const fields = [layanan, informasi, petugas, waktu, fasilitas];
        if (fields.some(f => typeof f !== "number" || f < 1 || f > 5)) {
            return NextResponse.json({ success: false, error: "Semua penilaian harus diisi (1-5)" }, { status: 400 });
        }

        const newResponse: SurveyResponse = {
            id: `resp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            timestamp: new Date().toISOString(),
            layanan, informasi, petugas, waktu, fasilitas,
            saran: String(saran || "").slice(0, 500),
            jenisLayanan: String(jenisLayanan || "Layanan Umum").slice(0, 100),
        };

        surveyStore.push(newResponse);

        return NextResponse.json({ success: true, id: newResponse.id, message: "Terima kasih atas survei Anda!" });
    } catch {
        return NextResponse.json({ success: false, error: "Format data tidak valid" }, { status: 400 });
    }
}
