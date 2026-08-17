/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import type { INoteResponse } from "@/types/note.interface";

const fetchNotes = async (
    endpoint: string,
    page: number,
    limit: number,
): Promise<INoteResponse | null> => {
    try {
        const response = await serverFetch.get(
            `${endpoint}?page=${page}&limit=${limit}`,
            { cache: "no-store" },
        );
        const result = await response.json();

        if (!result.success) {
            return null;
        }

        return {
            notes: result.data ?? [],
            meta: result.meta,
        };
    } catch (error: any) {
        console.log(error);
        return null;
    }
};

export const getMyNotes = async (
    page = 1,
    limit = 10,
): Promise<INoteResponse | null> => fetchNotes("/note/my-notes", page, limit);

export const getAllNotes = async (
    page = 1,
    limit = 10,
): Promise<INoteResponse | null> => fetchNotes("/note/all-notes", page, limit);