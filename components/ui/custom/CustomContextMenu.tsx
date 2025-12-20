"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface ContextMenuItemProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    variant?: "default" | "destructive";
    separator?: boolean;
}

interface CustomContextMenuProps {
    items: ContextMenuItemProps[];
    children: React.ReactNode;
}

export const CustomContextMenu: React.FC<CustomContextMenuProps> = ({ items, children }) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.separator && <ContextMenuSeparator />}
                        <ContextMenuItem
                            onClick={item.onClick}
                            className={item.variant === "destructive" ? "text-destructive" : ""}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </ContextMenuItem>
                    </React.Fragment>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    );
};
