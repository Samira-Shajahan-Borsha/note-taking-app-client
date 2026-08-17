"use client";

import { type ReactTable, type RowData } from "@tanstack/react-table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { type DataTableFeatures } from "@/lib/data-table-features";

interface DataTablePaginationProps<TData extends RowData> {
    table: ReactTable<DataTableFeatures, TData>;
}

type PaginationItemType = { type: "page"; page: number } | { type: "ellipsis"; key: string };

const BOUNDARY_COUNT = 1;
const SIBLING_COUNT = 1;

function getPaginationItems(
    pageIndex: number,
    pageCount: number,
): PaginationItemType[] {
    const current = pageIndex + 1;
    const pages = new Set<number>();

    for (let page = 1; page <= Math.min(BOUNDARY_COUNT, pageCount); page++) {
        pages.add(page);
        pages.add(pageCount - page + 1);
    }
    for (let page = current - SIBLING_COUNT; page <= current + SIBLING_COUNT; page++) {
        if (page >= 1 && page <= pageCount) {
            pages.add(page);
        }
    }

    const sorted = [...pages].sort((a, b) => a - b);
    const items: PaginationItemType[] = [];
    let previous = 0;

    for (const page of sorted) {
        if (page - previous > 1) {
            items.push({ type: "ellipsis", key: `ellipsis-${previous}-${page}` });
        }
        items.push({ type: "page", page });
        previous = page;
    }

    return items;
}

export function DataTablePagination<TData extends RowData>({
    table,
}: DataTablePaginationProps<TData>) {
    const pageIndex = table.state.pagination.pageIndex;
    const pageCount = table.getPageCount();

    if (pageCount <= 1) {
        return null;
    }

    const items = getPaginationItems(pageIndex, pageCount);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={!table.getCanPreviousPage()}
                        className={
                            !table.getCanPreviousPage()
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                        onClick={() => table.previousPage()}
                    />
                </PaginationItem>
                {items.map((item) =>
                    item.type === "ellipsis" ? (
                        <PaginationItem key={item.key}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item.page}>
                            <PaginationLink
                                isActive={item.page === pageIndex + 1}
                                onClick={() => table.setPageIndex(item.page - 1)}
                            >
                                {item.page}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={!table.getCanNextPage()}
                        className={
                            !table.getCanNextPage()
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                        onClick={() => table.nextPage()}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}