declare const module: { type: "json" };

declare const idmData: Record<number, {
    SUMMARIES: {
        SKOR_SAAT_INI: number;
        STATUS: string;
        TARGET_STATUS: string;
        SKOR_MINIMAL: string;
        PENAMBAHAN: number;
        TAHUN: number;
    };
    ROW: Array<Record<string, unknown>>;
    IDENTITAS: Array<Record<string, unknown>>;
}>;

export default idmData;
