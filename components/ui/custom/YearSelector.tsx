"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface YearSelectorProps {
    years: number[];
    selectedYear: number;
    onYearChange: (year: number) => void;
    className?: string;
}

export function YearSelector({ years, selectedYear, onYearChange, className }: YearSelectorProps) {
    return (
        <div className={cn("flex items-center justify-center gap-2 flex-wrap", className)}>
            {years.map((year) => {
                const isSelected = year === selectedYear;
                return (
                    <button
                        key={year}
                        onClick={() => onYearChange(year)}
                        className={cn(
                            "group relative px-6 py-3 p-2 rounded-sm font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105",
                            "border-2 min-w-10 sm:min-w-20 text-center",
                            isSelected
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105"
                                : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:shadow-md"
                        )}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isSelected && <CheckCircle2 className="h-4 w-4" />}
                            <span>{year}</span>
                        </div>

                        {/* Animated background for selected state */}
                        {isSelected && (
                            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/20 to-primary/10 -z-10" />
                        )}

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </button>
                );
            })}
        </div>
    );
}
