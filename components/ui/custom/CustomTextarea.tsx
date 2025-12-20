import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, FileText } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CustomTextareaProps {
    label: string;
    placeholder: string;
    icon?: LucideIcon;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    className?: string;
    id?: string;
    name?: string;
    rows?: number;
    maxLength?: number;
    minLength?: number;
    resize?: "none" | "vertical" | "horizontal" | "both";
    showCharacterCount?: boolean;
}

export const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
    (
        {
            label,
            placeholder,
            icon: PropIcon,
            error,
            required = false,
            disabled = false,
            value,
            onChange,
            onBlur,
            onFocus,
            className,
            id,
            name,
            rows = 8, // Minimum 8 rows per specification
            maxLength,
            minLength,
            resize = "vertical", // Vertical resize per specification
            showCharacterCount = false,
            ...props
        },
        ref
    ) => {
        // Default icon if none provided
        const Icon = PropIcon ?? FileText;

        // Generate unique ID if not provided
        const textareaId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

        // Calculate character count
        const characterCount = value?.length ?? 0;
        const isOverLimit = maxLength && characterCount > maxLength;

        return (
            <div className={cn("space-y-2", className)}>
                {/* Label with required indicator */}
                <Label
                    htmlFor={textareaId}
                    className={cn(
                        "flex items-center gap-2 text-sm font-medium",
                        (error ?? isOverLimit) && "text-destructive",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                    {required && (
                        <span className="text-destructive" aria-label="Required">
                            *
                        </span>
                    )}
                </Label>

                {/* Textarea container */}
                <div className="relative">
                    {/* Custom styled textarea */}
                    <Textarea
                        ref={ref}
                        id={textareaId}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        disabled={disabled}
                        name={name}
                        rows={rows}
                        maxLength={maxLength}
                        minLength={minLength}
                        className={cn(
                            // Enhanced styling following design specifications
                            "min-h-[200px]", // Minimum height as specified
                            "resize-y", // Allow vertical resize
                            resize === "none" && "resize-none",
                            resize === "horizontal" && "resize-x",
                            resize === "both" && "resize",
                            error && "border-destructive focus-visible:ring-destructive/20",
                            isOverLimit && "border-destructive focus-visible:ring-destructive/20",
                            "transition-all duration-200"
                        )}
                        style={{
                            resize: resize === "none" ? "none" : resize,
                        }}
                        aria-invalid={!!(error ?? isOverLimit) ? "true" : undefined}
                        aria-describedby={
                            (error ?? isOverLimit ?? showCharacterCount) ? `${textareaId}-error` : undefined
                        }
                        {...props}
                    />
                </div>

                {/* Error message and character count */}
                {(error ?? isOverLimit ?? showCharacterCount) && (
                    <div className="flex items-center justify-between">
                        {/* Error message */}
                        {(error ?? isOverLimit) && (
                            <div
                                id={`${textareaId}-error`}
                                className="flex items-center gap-1 text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1"
                                role="alert"
                                aria-live="polite"
                            >
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>{isOverLimit ? `Maksimal ${maxLength} karakter` : error}</span>
                            </div>
                        )}

                        {/* Character count */}
                        {showCharacterCount && (
                            <div
                                className={cn(
                                    "text-sm transition-colors",
                                    isOverLimit
                                        ? "text-destructive"
                                        : maxLength && characterCount > maxLength * 0.9
                                          ? "text-warning"
                                          : "text-muted-foreground"
                                )}
                            >
                                {characterCount}
                                {maxLength && `/${maxLength}`}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

CustomTextarea.displayName = "CustomTextarea";

// Preset configurations for common textarea types
export const TextareaPresets = {
    // Message textarea with default settings
    Message: (props: Omit<CustomTextareaProps, "label" | "icon">) => (
        <CustomTextarea label="Pesan" icon={FileText} rows={8} {...props} />
    ),

    // Description textarea
    Description: (props: Omit<CustomTextareaProps, "label" | "icon">) => (
        <CustomTextarea label="Deskripsi" icon={FileText} rows={6} {...props} />
    ),

    // Complaint textarea
    Complaint: (props: Omit<CustomTextareaProps, "label" | "icon">) => (
        <CustomTextarea label="Keluhan" icon={FileText} rows={8} required {...props} />
    ),

    // Suggestion textarea
    Suggestion: (props: Omit<CustomTextareaProps, "label" | "icon">) => (
        <CustomTextarea label="Saran" icon={FileText} rows={6} {...props} />
    ),

    // Address textarea with longer default
    Address: (props: Omit<CustomTextareaProps, "label" | "icon">) => (
        <CustomTextarea label="Alamat Lengkap" icon={FileText} rows={4} {...props} />
    ),
};
