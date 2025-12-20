import { useState, useEffect, useCallback } from "react";

export interface Holiday {
    nama_perayaan: string;
    tanggal: string;
    jenis: string;
    keterangan: string;
}

export interface HolidayResponse {
    success: boolean;
    data: Holiday[];
    error?: string;
}

export function useHolidays(limit: number = 10) {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHolidays = useCallback(
        async (forceRefresh: boolean = false) => {
            try {
                setLoading(true);
                setError(null);

                // Fetch from our API route which uses Next.js Data Cache
                const url = `/api/holidays?limit=${limit}`;

                const response = await fetch(url, {
                    // Add cache busting for force refresh
                    cache: forceRefresh ? "no-store" : "default",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result: HolidayResponse = await response.json();

                if (result.success) {
                    setHolidays(result.data);
                } else {
                    setError(result.error || "Failed to fetch holidays");
                }
            } catch (err) {
                console.error("Error fetching holidays:", err);
                setError(err instanceof Error ? err.message : "Gagal memuat data hari libur");
            } finally {
                setLoading(false);
            }
        },
        [limit]
    );

    useEffect(() => {
        fetchHolidays();
    }, [fetchHolidays]);

    return {
        holidays,
        loading,
        error,
        refetch: () => fetchHolidays(true),
    };
}
