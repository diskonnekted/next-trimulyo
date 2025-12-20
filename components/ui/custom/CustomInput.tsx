import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, User, Lock, IdCard, Mail, Phone, MapPin, FileText } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CustomInputProps {
    label: string;
    placeholder: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url";
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
    autoComplete?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
}

// Icon mapping for common input types
const iconMap: Record<string, LucideIcon> = {
    text: User,
    email: Mail,
    password: Lock,
    number: FileText,
    tel: Phone,
    url: FileText,
};

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    (
        {
            label,
            placeholder,
            type = "text",
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
            autoComplete,
            maxLength,
            minLength,
            pattern,
            ...props
        },
        ref
    ) => {
        // Use provided icon or fallback based on type
        const Icon = PropIcon ?? iconMap[type] ?? User;

        // Generate unique ID if not provided
        const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

        return (
            <div className={cn("space-y-2", className)}>
                {/* Label with required indicator */}
                <Label
                    htmlFor={inputId}
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

                {/* Input container with icon */}
                <div className="relative">
                    {/* Icon positioned on the left */}
                    <Icon
                        className={cn(
                            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors",
                            error && "text-destructive",
                            disabled && "opacity-50"
                        )}
                        aria-hidden="true"
                    />

                    {/* Custom styled input */}
                    <Input
                        ref={ref}
                        id={inputId}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        disabled={disabled}
                        name={name}
                        autoComplete={autoComplete}
                        maxLength={maxLength}
                        minLength={minLength}
                        pattern={pattern}
                        className={cn(
                            // Enhanced styling following design specifications
                            "pl-4", // Space for icon
                            error && "border-destructive focus-visible:ring-destructive/20",
                            "transition-all duration-200"
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    />
                </div>

                {/* Error message */}
                {error && (
                    <div
                        id={`${inputId}-error`}
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

CustomInput.displayName = "CustomInput";

// Preset configurations for common input types
export const InputPresets = {
    // Name input with user icon
    Name: (props: Omit<CustomInputProps, "type" | "icon" | "label">) => (
        <CustomInput type="text" icon={User} label="Nama Lengkap" autoComplete="name" {...props} />
    ),

    // Email input with mail icon
    Email: (props: Omit<CustomInputProps, "type" | "icon" | "label">) => (
        <CustomInput type="email" icon={Mail} label="Email" autoComplete="email" {...props} />
    ),

    // Password input with lock icon
    Password: (props: Omit<CustomInputProps, "type" | "icon" | "label">) => (
        <CustomInput type="password" icon={Lock} label="Kata Sandi" autoComplete="current-password" {...props} />
    ),

    // NIK input with ID card icon
    NIK: (props: Omit<CustomInputProps, "type" | "icon" | "label">) => (
        <CustomInput type="text" icon={IdCard} label="NIK" maxLength={16} pattern="[0-9]*" {...props} />
    ),

    // Phone input with phone icon
    Phone: (props: Omit<CustomInputProps, "type" | "icon" | "label">) => (
        <CustomInput type="tel" icon={Phone} label="No. Telepon" autoComplete="tel" {...props} />
    ),

    // Address input with location icon
    Address: (props: Omit<CustomInputProps, "type" | "icon" | "label">) => (
        <CustomInput type="text" icon={MapPin} label="Alamat" autoComplete="street-address" {...props} />
    ),
};
