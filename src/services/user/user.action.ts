/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createUserValidationZodSchema } from "@/zod/user.validation";
import { updateUserValidationZodSchema } from "@/zod/user.validation";
import type { IAllUsersResponse } from "@/types/user.interface";

interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    role?: "USER" | "ADMIN";
}

interface UpdateUserPayload {
    name?: string;
    email?: string;
    password?: string;
    role?: "USER" | "ADMIN";
}

export const getAllUsers = async (
    page = 1,
    limit = 10,
): Promise<IAllUsersResponse | null> => {
    try {
        const response = await serverFetch.get(
            `/user/all-users?page=${page}&limit=${limit}`,
            { cache: "no-store" },
        );
        const result = await response.json();

        if (!result.success) {
            return null;
        }

        return {
            users: result.data ?? [],
            meta: result.meta,
        };
    } catch (error: any) {
        console.log(error);
        return null;
    }
};

export const createUserAction = async (
    payload: CreateUserPayload,
): Promise<{ error?: string } | undefined> => {
    try {
        const validation = zodValidator(payload, createUserValidationZodSchema);
        if (!validation.success) {
            return {
                error: validation.error.issues[0]?.message || "Invalid data",
            };
        }

        const response = await serverFetch.post("/user/create-user", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        if (!result.success) {
            return { error: result.message || "Failed to create user" };
        }

        return undefined;
    } catch (error: any) {
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create user. Please try again.",
        };
    }
};

export const updateUserAction = async (
    userId: string,
    payload: UpdateUserPayload,
): Promise<{ error?: string } | undefined> => {
    try {
        const validation = zodValidator(payload, updateUserValidationZodSchema);
        if (!validation.success) {
            return {
                error: validation.error.issues[0]?.message || "Invalid data",
            };
        }

        const response = await serverFetch.patch(`/user/${userId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        if (!result.success) {
            return { error: result.message || "Failed to update user" };
        }

        return undefined;
    } catch (error: any) {
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update user. Please try again.",
        };
    }
};

export const deleteUserAction = async (
    userId: string,
): Promise<{ error?: string } | undefined> => {
    try {
        const response = await serverFetch.delete(`/user/${userId}`);
        const result = await response.json();

        if (!result.success) {
            return { error: result.message || "Failed to delete user" };
        }

        return undefined;
    } catch (error: any) {
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete user. Please try again.",
        };
    }
};