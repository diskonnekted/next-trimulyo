import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CustomButtonProps {
    variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
    icon?: LucideIcon;
    loading?: boolean;
    tooltip?: string;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    asChild?: boolean;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    (
        {
            variant = "outline",
            size = "default",
            icon: Icon,
            loading = false,
            tooltip,
            children,
            className,
            disabled,
            onClick,
            type = "button",
            asChild = false,
            ...props
        },
        ref
    ) => {
        // Button content following design requirements
        const buttonContent = (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    // Enhanced styling following design specifications
                    "relative overflow-hidden transition-all duration-200",
                    // Custom contrast fixes for outline buttons
                    variant === "outline" && [
                        "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                        "hover:shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    ],
                    // Icon styling requirements
                    Icon && !asChild && "gap-2",
                    // Loading state styling
                    loading && "cursor-not-allowed",
                    // Default cursor for buttons (overriding disabled state)
                    !loading && !disabled && "cursor-pointer",
                    className
                )}
                disabled={disabled ?? loading}
                onClick={onClick}
                type={type}
                asChild={asChild}
                {...props}
            >
                {asChild ? (
                    // When asChild is true, render the direct child (Link, etc.)
                    children
                ) : (
                    <>
                        {/* Loading spinner */}
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}

                        {/* Icon - mandatory per design requirements */}
                        {Icon && !loading && <Icon className="h-4 w-4 shrink-0" />}

                        {/* Button text/content */}
                        {children}
                    </>
                )}
            </Button>
        );

        // Wrap with tooltip if provided and button is icon-only or has tooltip
        if (tooltip && (!children || (Icon && !children))) {
            return (
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                        <TooltipContent>
                            <p className="text-sm">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return buttonContent;
    }
);

CustomButton.displayName = "CustomButton";

// Export preset button configurations for common use cases
export const ButtonPresets = {
    // Primary CTA button with icon
    Primary: (props: Omit<CustomButtonProps, "variant">) => <CustomButton variant="default" {...props} />,

    // Secondary outline button (most common per design spec)
    Secondary: (props: Omit<CustomButtonProps, "variant">) => <CustomButton variant="outline" {...props} />,

    // Icon-only button with automatic tooltip
    Icon: (props: Omit<CustomButtonProps, "children">) => <CustomButton size="icon" {...props} />,

    // Loading button state
    Loading: (props: Omit<CustomButtonProps, "loading">) => <CustomButton loading {...props} />,

    // Destructive action button
    Danger: (props: Omit<CustomButtonProps, "variant">) => <CustomButton variant="destructive" {...props} />,
};
