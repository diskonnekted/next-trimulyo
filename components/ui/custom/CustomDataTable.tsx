"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CustomContextMenu } from "./CustomContextMenu";

interface TableColumn<T> {
    key: keyof T;
    label: string;
    render?: (value: unknown, item: T) => React.ReactNode;
}

interface ContextMenuItemProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    variant?: "default" | "destructive";
    separator?: boolean;
}

interface DataTablePagination {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

interface DataTableProps<T extends { id: string | number }> {
    data: T[];
    columns: TableColumn<T>[];
    pagination?: DataTablePagination;
    actions?: (item: T) => ContextMenuItemProps[];
    className?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export function CustomDataTable<T extends { id: string | number }>({
    data,
    columns,
    pagination,
    actions,
    className,
}: DataTableProps<T>) {
    return (
        <div className={`space-y-4 ${className ?? ""}`}>
            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={String(column.key)}>{column.label}</TableHead>
                            ))}
                            {actions && <TableHead className="w-[70px]">Aksi</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                                {columns.map((column) => (
                                    <TableCell key={String(column.key)}>
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : String(item[column.key] ?? "-")}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        <CustomContextMenu items={actions(item)}>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </CustomContextMenu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan {(pagination.page - 1) * pagination.pageSize + 1} -{" "}
                            {Math.min(pagination.page * pagination.pageSize, pagination.total)} dari {pagination.total}{" "}
                            data
                        </p>
                        <Select
                            value={String(pagination.pageSize)}
                            onValueChange={(value) => pagination.onPageSizeChange(Number(value))}
                        >
                            <SelectTrigger className="w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 30, 50, 100].map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => pagination.onPageChange(1)}
                            disabled={pagination.page === 1}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => pagination.onPageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Page numbers */}
                        {getPageNumbers(pagination.page, Math.ceil(pagination.total / pagination.pageSize)).map(
                            (pageNum, index) => (
                                <React.Fragment key={index}>
                                    {pageNum === "..." ? (
                                        <span className="px-2">...</span>
                                    ) : (
                                        <Button
                                            variant={pageNum === pagination.page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => pagination.onPageChange(pageNum as number)}
                                        >
                                            {pageNum}
                                        </Button>
                                    )}
                                </React.Fragment>
                            )
                        )}

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => pagination.onPageChange(pagination.page + 1)}
                            disabled={pagination.page === Math.ceil(pagination.total / pagination.pageSize)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => pagination.onPageChange(Math.ceil(pagination.total / pagination.pageSize))}
                            disabled={pagination.page === Math.ceil(pagination.total / pagination.pageSize)}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomDataTable;
