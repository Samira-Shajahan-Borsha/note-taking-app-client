"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ViewNoteDialog from "@/components/modules/Notes/ViewNoteDialog";
import DeleteNoteDialog from "@/components/modules/Notes/DeleteNoteDialog";
import EditNoteDialog from "@/components/modules/Notes/EditNoteDialog";
import type { INote } from "@/types/note.interface";
import type { DataTableFeatures } from "@/lib/data-table-features";

const columnHelper = createColumnHelper<DataTableFeatures, INote>();

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

export const columns = columnHelper.columns([
    columnHelper.accessor("title", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("title")}</div>
        ),
    }),
    columnHelper.accessor("content", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Content" />
        ),
        cell: ({ row }) => (
            <div className="max-w-105 truncate text-muted-foreground">
                {row.getValue("content")}
            </div>
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
                <ViewNoteDialog note={row.original} />
                <EditNoteDialog note={row.original} />
                <DeleteNoteDialog
                    noteId={row.original._id}
                    noteTitle={row.original.title}
                />
            </div>
        ),
    }),
]);