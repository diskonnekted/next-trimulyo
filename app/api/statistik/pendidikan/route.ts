import { NextResponse } from "next/server";
import { fetchOpenSIDStatistikById } from "@/lib/api-helpers";

export async function GET() {
    const fallbackData = {
        prevalensiPendidikan: 0,
        тендер_wus: 0,
        тендер_balita: 0,
        тендер_ibu_hamil: 0,
        тендер_anak: 0,
        тендер_resiko: 0,
    };

    const response = await fetchOpenSIDStatistikById("8", "pendidikan", {
        fallbackData,
    });

    return NextResponse.json(response.success ? response.data : response);
}
