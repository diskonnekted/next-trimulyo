"use client";

import * as React from "react";
import { Map, Users, Building2, Home } from "lucide-react";

interface HeroStatsData {
    population: { total: number; laki: number; perempuan: number };
}

export function HeroStats() {
    const [data, setData] = React.useState<HeroStatsData | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("/api/kalurahan-stats")
            .then((r) => r.json())
            .then((json) => {
                if (json.success) setData(json);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const formatPopulation = (num: number) => {
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        return String(num);
    };

    const stats = [
        { label: "Luas Wilayah", value: "579 Ha", icon: Map },
        {
            label: "Penduduk",
            value: loading ? "..." : formatPopulation(data?.population.total || 10305),
            icon: Users,
        },
        { label: "Padukuhan", value: "14", icon: Building2 },
        { label: "RT/RW", value: "68/30", icon: Home },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 flex flex-col items-center text-center group"
                >
                    <div className="p-3 bg-secondary/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                        <stat.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                        {stat.value}
                    </div>
                    <div className="text-sm font-bold text-blue-100/80 uppercase tracking-widest">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
