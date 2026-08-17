/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "./getUserInfo";
import { IProfile } from "@/types/user.interface";

export const getMyProfileInfo = async (): Promise<IProfile | null> => {
    try {
        const authUserInfo = await getUserInfo();

        const response = await serverFetch.get(`/auth/me`, {
            cache: "no-store",
        });
        const result = await response.json();

        const user = result.data;
        if (!user) return null;

        if (authUserInfo?.userId !== user._id) {
            return null;
        }

        return { user };
    } catch (error: any) {
        console.log(error);
        return null;
    }
};
