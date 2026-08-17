/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createNoteValidationZodSchema } from "@/zod/note.validation";
import { updateNoteValidationZodSchema } from "@/zod/note.validation";
import type { INoteResponse } from "@/types/note.interface";

interface NotePayload {
    title: string;
    content: string;
}

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

export const createNoteAction = async (
    payload: NotePayload,
): Promise<{ error?: string } | undefined> => {
    try {
        const validation = zodValidator(payload, createNoteValidationZodSchema);
        if (!validation.success) {
            return {
                error: validation.error.issues[0]?.message || "Invalid data",
            };
        }

        const response = await serverFetch.post("/note/create-note", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        if (!result.success) {
            return { error: result.message || "Failed to create note" };
        }

        return undefined;
    } catch (error: any) {
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create note. Please try again.",
        };
    }
};

export const updateNoteAction = async (
    noteId: string,
    payload: NotePayload,
): Promise<{ error?: string } | undefined> => {
    try {
        const validation = zodValidator(payload, updateNoteValidationZodSchema);
        if (!validation.success) {
            return {
                error: validation.error.issues[0]?.message || "Invalid data",
            };
        }

        const response = await serverFetch.patch(`/note/${noteId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        if (!result.success) {
            return { error: result.message || "Failed to update note" };
        }

        return undefined;
    } catch (error: any) {
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update note. Please try again.",
        };
    }
};

export const deleteNoteAction = async (
    noteId: string,
): Promise<{ error?: string } | undefined> => {
    try {
        const response = await serverFetch.delete(`/note/${noteId}`);
        const result = await response.json();

        if (!result.success) {
            return { error: result.message || "Failed to delete note" };
        }

        return undefined;
    } catch (error: any) {
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete note. Please try again.",
        };
    }
};