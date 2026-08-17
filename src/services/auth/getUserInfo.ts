/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/lib/auth-utils";
import { getCookie } from "@/services/auth/tokenHandlers";

export interface IAuthUserInfo {
    userId: string;
    role: UserRole;
    email?: string;
}

export const getUserInfo = async (): Promise<IAuthUserInfo | null> => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            return null;
        }

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET as string,
        ) as JwtPayload;

        return {
            userId: (verifiedToken.userId ??
                verifiedToken._id ??
                verifiedToken.sub ??
                verifiedToken.id) as string,
            role: verifiedToken.role as UserRole,
            email: verifiedToken.email as string | undefined,
        };
    } catch (error: any) {
        console.log(error);
        return null;
    }
};