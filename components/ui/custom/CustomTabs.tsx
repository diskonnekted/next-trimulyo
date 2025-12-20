import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TabItem {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    badge?: string | number;
}

interface CustomTabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    orientation?: "horizontal" | "vertical";
    size?: "sm" | "default" | "lg";
    mobileBehavior?: "dropdown" | "scroll" | "stack";
}

export const CustomTabs = React.forwardRef<HTMLDivElement, CustomTabsProps>(
    (
        {
            tabs,
            defaultValue,
            value,
            onValueChange,
            className,
            orientation = "horizontal",
            size = "default",
            mobileBehavior = "dropdown",
            ...props
        },
        ref
    ) => {
        const [isMobile, setIsMobile] = React.useState(false);
        const [activeTab, setActiveTab] = React.useState(defaultValue ?? tabs[0]?.value ?? "");

        // Detect mobile screen size
        React.useEffect(() => {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };

            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }, []);

        // Sync controlled and uncontrolled state
        const currentValue = value ?? activeTab;
        const handleTabChange = (newValue: string) => {
            setActiveTab(newValue);
            onValueChange?.(newValue);
        };

        // Desktop version - Standard tabs
        if (!isMobile) {
            return (
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    <Tabs
                        value={currentValue}
                        onValueChange={handleTabChange}
                        orientation={orientation}
                        className="w-full"
                    >
                        {/* Enhanced TabsList for desktop */}
                        <TabsList
                            className={cn(
                                // Centered layout with full-width container
                                "w-full max-w-4xl mx-auto grid",
                                // Grid layout based on number of tabs
                                tabs.length <= 4 && `grid-cols-${tabs.length}`,
                                tabs.length > 4 && "grid-cols-4 lg:grid-cols-6",
                                // Size variations
                                size === "sm" && "h-8",
                                size === "lg" && "h-12",
                                // Default styling
                                "bg-muted/50 p-1 rounded-lg border"
                            )}
                        >
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    disabled={tab.disabled}
                                    className={cn(
                                        // Enhanced styling
                                        "relative group",
                                        "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                                        "data-[state=active]:text-primary",
                                        "text-muted-foreground hover:text-foreground",
                                        "transition-all duration-200",
                                        "font-medium",
                                        // Size variations
                                        size === "sm" && "text-xs py-1 px-2",
                                        size === "lg" && "text-base py-3 px-4",
                                        "rounded-md"
                                    )}
                                >
                                    {/* Tab icon */}
                                    {tab.icon && <span className="mr-2 shrink-0">{tab.icon}</span>}

                                    {/* Tab label */}
                                    <span className="truncate">{tab.label}</span>

                                    {/* Tab badge */}
                                    {tab.badge && (
                                        <span className="ml-2 min-w-[20px] h-5 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center px-1">
                                            {tab.badge}
                                        </span>
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Tab content */}
                        <div className="mt-4">
                            {tabs.map((tab) => (
                                <TabsContent
                                    key={tab.value}
                                    value={tab.value}
                                    className="outline-none focus-visible:ring-0"
                                >
                                    {tab.content}
                                </TabsContent>
                            ))}
                        </div>
                    </Tabs>
                </div>
            );
        }

        // Mobile version - Dropdown or scrollable
        if (mobileBehavior === "dropdown") {
            return (
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    {/* Mobile dropdown for tabs */}
                    <div className="mb-4">
                        <Select value={currentValue} onValueChange={handleTabChange}>
                            <SelectTrigger className="w-full h-12">
                                <SelectValue placeholder="Pilih tab" />
                            </SelectTrigger>
                            <SelectContent>
                                {tabs.map((tab) => (
                                    <SelectItem
                                        key={tab.value}
                                        value={tab.value}
                                        disabled={tab.disabled}
                                        className="text-left"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                                                <span>{tab.label}</span>
                                            </div>
                                            {tab.badge && (
                                                <span className="ml-2 bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                                                    {tab.badge}
                                                </span>
                                            )}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tab content */}
                    <div>{tabs.find((tab) => tab.value === currentValue)?.content}</div>
                </div>
            );
        }

        // Mobile scrollable tabs
        if (mobileBehavior === "scroll") {
            return (
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    {/* Scrollable tabs */}
                    <div className="mb-4 overflow-x-auto">
                        <div className="flex gap-2 min-w-max pb-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleTabChange(tab.value)}
                                    disabled={tab.disabled}
                                    className={cn(
                                        // Enhanced styling
                                        "relative group px-4 py-2 rounded-md border whitespace-nowrap",
                                        "transition-all duration-200",
                                        "flex items-center gap-2 text-sm font-medium",
                                        // Active state
                                        currentValue === tab.value
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background text-muted-foreground hover:text-foreground border-border hover:border-primary/50",
                                        // Disabled state
                                        tab.disabled && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {/* Tab icon */}
                                    {tab.icon && <span className="shrink-0">{tab.icon}</span>}

                                    {/* Tab label */}
                                    <span>{tab.label}</span>

                                    {/* Tab badge */}
                                    {tab.badge && (
                                        <span className="ml-1 min-w-[16px] h-4 bg-current/20 text-current text-xs rounded-full flex items-center justify-center px-1">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab content */}
                    <div>{tabs.find((tab) => tab.value === currentValue)?.content}</div>
                </div>
            );
        }

        // Mobile stacked tabs (vertical)
        return (
            <div ref={ref} className={cn("w-full", className)} {...props}>
                {/* Stacked tab buttons */}
                <div className="mb-4 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleTabChange(tab.value)}
                            disabled={tab.disabled}
                            className={cn(
                                // Enhanced styling
                                "w-full relative group px-4 py-3 rounded-md border",
                                "transition-all duration-200",
                                "flex items-center justify-between text-sm font-medium",
                                // Active state
                                currentValue === tab.value
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background text-muted-foreground hover:text-foreground border-border hover:border-primary/50",
                                // Disabled state
                                tab.disabled && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {/* Tab icon */}
                                {tab.icon && <span className="shrink-0">{tab.icon}</span>}

                                {/* Tab label */}
                                <span>{tab.label}</span>
                            </div>

                            {/* Tab badge */}
                            {tab.badge && (
                                <span className="min-w-[16px] h-4 bg-current/20 text-current text-xs rounded-full flex items-center justify-center px-1">
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div>{tabs.find((tab) => tab.value === currentValue)?.content}</div>
            </div>
        );
    }
);

CustomTabs.displayName = "CustomTabs";

// Preset configurations for common tab patterns
export const TabsPresets = {
    // 4-tab container (most common per specification)
    FourTabs: (props: Omit<CustomTabsProps, "mobileBehavior">) => <CustomTabs mobileBehavior="dropdown" {...props} />,

    // Navigation tabs
    Navigation: (props: Omit<CustomTabsProps, "mobileBehavior">) => (
        <CustomTabs mobileBehavior="scroll" size="default" {...props} />
    ),

    // Content tabs with rich content
    Content: (props: Omit<CustomTabsProps, "mobileBehavior">) => (
        <CustomTabs mobileBehavior="stack" size="lg" {...props} />
    ),
};

// Hook to create controlled tabs
export const useCustomTabs = (initialValue?: string) => {
    const [value, setValue] = React.useState(initialValue);

    return {
        value,
        setValue,
        onValueChange: setValue,
    };
};
