"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./AllUsersColumns";
import type { IAllUser, IUserMeta } from "@/types/user.interface";

interface AllUsersDataTableProps {
    users: IAllUser[];
    meta: IUserMeta;
    page: number;
    limit: number;
}

const AllUsersDataTable = ({ users, meta, page, limit }: AllUsersDataTableProps) => {
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
            data={users}
            totalRows={meta.total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            emptyText="No users found."
        />
    );
};

export default AllUsersDataTable;