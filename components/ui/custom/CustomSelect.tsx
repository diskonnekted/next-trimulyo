import * as React from "react";
import { AlertCircle, Check } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    description?: string;
}

interface CustomSelectProps {
    label: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onValueChange: (value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    id?: string;
    name?: string;
    allowEmpty?: boolean;
    emptyLabel?: string;
    searchable?: boolean;
}

export const CustomSelect = React.forwardRef<HTMLButtonElement, CustomSelectProps>(
    (
        {
            label,
            placeholder = "Pilih opsi",
            options,
            value,
            onValueChange,
            error,
            required = false,
            disabled = false,
            className,
            id,
            name,
            allowEmpty = true,
            emptyLabel = "-- Pilih --",
            searchable = false,
            ...props
        },
        ref
    ) => {
        // Generate unique ID if not provided
        const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

        // Filter options based on search if searchable
        const [searchTerm, setSearchTerm] = React.useState("");
        const filteredOptions = React.useMemo(() => {
            if (!searchTerm || !searchable) return options;
            return options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
        }, [options, searchTerm, searchable]);

        // Clear search when dropdown closes
        const handleOpenChange = (open: boolean) => {
            if (!open && searchTerm) {
                setSearchTerm("");
            }
        };

        return (
            <div className={cn("space-y-2", className)}>
                {/* Label with required indicator */}
                <Label
                    htmlFor={selectId}
                    className={cn(
                        "flex items-center gap-2 text-sm font-medium",
                        error && "text-destructive",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {label}
                    {required && (
                        <span className="text-destructive" aria-label="Required">
                            *
                        </span>
                    )}
                </Label>

                {/* Custom styled select */}
                <Select
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    onOpenChange={handleOpenChange}
                    {...props}
                >
                    <SelectTrigger
                        ref={ref}
                        id={selectId}
                        name={name}
                        className={cn(
                            // Enhanced styling following design specifications
                            "w-full text-left",
                            "h-10 px-3 py-2",
                            "border-input bg-background",
                            "focus:ring-ring/50 focus:ring-[3px]",
                            error && "border-destructive focus-visible:ring-destructive/20",
                            "transition-all duration-200"
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${selectId}-error` : undefined}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent className="max-h-60 overflow-y-auto" position="popper" align="start" sideOffset={4}>
                        {/* Empty option if allowed */}
                        {allowEmpty && (
                            <SelectItem value="" className="text-left">
                                <div className="flex items-center justify-between w-full">
                                    <span>{emptyLabel}</span>
                                    {value === "" && <Check className="h-4 w-4 text-primary ml-auto" />}
                                </div>
                            </SelectItem>
                        )}

                        {/* Search functionality (optional) */}
                        {searchable && (
                            <div className="px-2 py-1.5 sticky top-0 bg-background border-b">
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-2 py-1 text-sm border rounded"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        {/* Options with custom styling */}
                        {filteredOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                className={cn(
                                    "text-left cursor-pointer",
                                    "flex items-center justify-between",
                                    "hover:bg-accent",
                                    "focus:bg-accent focus:text-accent-foreground",
                                    option.disabled && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm">{option.label}</span>
                                    {option.description && (
                                        <span className="text-xs text-muted-foreground">{option.description}</span>
                                    )}
                                </div>
                                {value === option.value && <Check className="h-4 w-4 text-primary ml-auto shrink-0" />}
                            </SelectItem>
                        ))}

                        {/* No results message */}
                        {searchable && filteredOptions.length === 0 && (
                            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                Tidak ada hasil ditemukan
                            </div>
                        )}
                    </SelectContent>
                </Select>

                {/* Error message */}
                {error && (
                    <div
                        id={`${selectId}-error`}
                        className="flex items-center gap-1 text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1"
                        role="alert"
                        aria-live="polite"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        );
    }
);

CustomSelect.displayName = "CustomSelect";

// Helper function to create standard option arrays
export const createSelectOptions = (options: string[] | { value: string; label: string }[]): SelectOption[] => {
    return options.map((option) => {
        if (typeof option === "string") {
            return { value: option, label: option };
        }
        return option;
    });
};

// Preset configurations for common select types
export const SelectPresets = {
    // Service type selection
    ServiceType: (props: Omit<CustomSelectProps, "label" | "options">) => (
        <CustomSelect
            label="Jenis Layanan"
            options={[
                { value: "KK", label: "Kartu Keluarga" },
                { value: "KTP", label: "KTP" },
                { value: "KELAHIRAN", label: "Akta Kelahiran" },
                { value: "KEMATIAN", label: "Akta Kematian" },
                { value: "SURAT_DOMISILI", label: "Surat Domisili" },
                { value: "SURAT_USAHA", label: "Surat Usaha" },
                { value: "SURAT_PENGANTAR", label: "Surat Pengantar" },
            ]}
            required
            {...props}
        />
    ),

    // Priority selection
    Priority: (props: Omit<CustomSelectProps, "label" | "options">) => (
        <CustomSelect
            label="Prioritas"
            options={[
                { value: "LOW", label: "Rendah" },
                { value: "NORMAL", label: "Normal" },
                { value: "HIGH", label: "Tinggi" },
                { value: "URGENT", label: "Penting" },
            ]}
            {...props}
        />
    ),

    // Status selection
    Status: (props: Omit<CustomSelectProps, "label" | "options">) => (
        <CustomSelect
            label="Status"
            options={[
                { value: "MENUNGGU", label: "Menunggu" },
                { value: "DIPROSES", label: "Diproses" },
                { value: "SELESAI", label: "Selesai" },
                { value: "DITOLAK", label: "Ditolak" },
            ]}
            {...props}
        />
    ),

    // Category selection
    Category: (props: Omit<CustomSelectProps, "label" | "options">) => (
        <CustomSelect
            label="Kategori"
            options={[
                { value: "administrasi", label: "Administrasi" },
                { value: "infrastructure", label: "Infrastruktur" },
                { value: "health", label: "Kesehatan" },
                { value: "education", label: "Pendidikan" },
                { value: "security", label: "Keamanan" },
                { value: "social", label: "Sosial" },
                { value: "other", label: "Lainnya" },
            ]}
            {...props}
        />
    ),
};
