/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parseCookie } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { deleteCookie, setCookie } from "@/services/auth/tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema, registerValidationZodSchema } from "@/zod/auth.validation";

interface LoginPayload {
    email: string;
    password: string;
    redirect?: string | null;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export const loginAction = async (
    payload: LoginPayload,
): Promise<{ error?: string } | undefined> => {
    try {
        const redirectTo = payload.redirect || null;

        const validation = zodValidator(payload, loginValidationZodSchema);

        if (!validation.success) {
            return {
                error: validation.error.issues[0]?.message || "Invalid credentials",
            };
        }

        const validatedPayload = validation.data;

        const res = await serverFetch.post("/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedPayload),
        });

        const result = await res.json();

        if (!result.success) {
            return {
                error: result.message || "Login failed",
            };
        }

        let accessToken: string | null = null;
        let refreshToken: string | null = null;

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parseCookie(cookie);

                if (parsedCookie["accessToken"]) {
                    accessToken = parsedCookie["accessToken"];
                }
                if (parsedCookie["refreshToken"]) {
                    refreshToken = parsedCookie["refreshToken"];
                }
            });
        }

        if (!accessToken || !refreshToken) {
            throw new Error("Tokens not found in cookies");
        }

        await setCookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: 60 * 60,
            path: "/",
            sameSite: "none",
        });

        await setCookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 90,
            path: "/",
            sameSite: "none",
        });

        if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
            throw new Error("JWT_ACCESS_TOKEN_SECRET is not set in .env.local");
        }

        const verifiedToken: JwtPayload | string = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
        );

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid Token");
        }

        const userRole: UserRole = verifiedToken.role;

        if (redirectTo) {
            const requestedPath = redirectTo.toString();

            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Login Failed. You might have entered incorrect email or password.",
        };
    }
};

export const logoutAction = async (): Promise<void> => {
    try {
        await serverFetch.post("/auth/logout");
    } catch (error) {
        console.log(error);
    }

    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
};

export const registerAction = async (
    payload: RegisterPayload,
): Promise<{ error?: string } | undefined> => {
    try {
        const validation = zodValidator(payload, registerValidationZodSchema);

        if (!validation.success) {
            return {
                error: validation.error.issues[0]?.message || "Invalid data",
            };
        }

        const validatedPayload = validation.data;

        const res = await serverFetch.post("/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedPayload),
        });

        const result = await res.json();

        if (!result.success) {
            return {
                error: result.message || "Registration failed",
            };
        }

        return undefined;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return {
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Registration failed. Please try again.",
        };
    }
};
