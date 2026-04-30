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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-colors"
                >
                    <stat.icon className="h-5 w-5 text-secondary mb-2" />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-blue-100">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
