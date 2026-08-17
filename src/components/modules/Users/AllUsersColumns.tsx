"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ViewUserDialog from "@/components/modules/Users/ViewUserDialog";
import EditUserDialog from "@/components/modules/Users/EditUserDialog";
import DeleteUserDialog from "@/components/modules/Users/DeleteUserDialog";
import type { IAllUser } from "@/types/user.interface";
import type { DataTableFeatures } from "@/lib/data-table-features";

const columnHelper = createColumnHelper<DataTableFeatures, IAllUser>();

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

export const columns = columnHelper.columns([
    columnHelper.accessor("name", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const name = row.getValue("name") as string | undefined;
            return <div className="font-medium">{name ?? "—"}</div>;
        },
    }),
    columnHelper.accessor("email", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {row.getValue("email")}
            </div>
        ),
    }),
    columnHelper.accessor("role", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => (
            <div className="text-muted-foreground">{row.getValue("role")}</div>
        ),
    }),
    columnHelper.accessor("createdAt", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => formatDate(row.getValue("createdAt")),
    }),
    columnHelper.accessor("updatedAt", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated" />
        ),
        cell: ({ row }) => formatDate(row.getValue("updatedAt")),
    }),
    columnHelper.display({
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
            <div className="flex items-center justify-end gap-1">
                <ViewUserDialog user={row.original} />
                <EditUserDialog user={row.original} />
                <DeleteUserDialog
                    userId={row.original._id}
                    userName={row.original.name ?? row.original.email ?? "this user"}
                />
            </div>
        ),
    }),
]);