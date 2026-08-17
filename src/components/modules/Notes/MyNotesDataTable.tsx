"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./MyNotesColumns";
import type { INote, INoteMeta } from "@/types/note.interface";

interface MyNotesDataTableProps {
    notes: INote[];
    meta: INoteMeta;
    page: number;
    limit: number;
}

const MyNotesDataTable = ({ notes, meta, page, limit }: MyNotesDataTableProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const pagination = useMemo<PaginationState>(
        () => ({ pageIndex: Math.max(page - 1, 0), pageSize: limit }),
        [page, limit],
    );

    const handlePaginationChange = useCallback(
        (next: PaginationState) => {
            const params = new URLSearchParams(pathname.split("?")[1] ?? "");
            params.set("page", String(next.pageIndex + 1));
            params.delete("limit");
            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router],
    );

    return (
        <DataTable
            columns={columns}
            data={notes}
            totalRows={meta.total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            emptyText="No notes found."
        />
    );
};

export default MyNotesDataTable;