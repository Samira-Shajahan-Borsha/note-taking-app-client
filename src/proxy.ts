import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "@/lib/auth-utils";

const clearAuthCookies = (response: NextResponse) => {
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
};

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const accessToken = request.cookies.get("accessToken")?.value || null;

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    let userRole: UserRole | null = null;
    let tokenInvalid = false;

    if (accessToken) {
        try {
            const verifiedToken: JwtPayload | string = jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_TOKEN_SECRET as string,
            );

            if (typeof verifiedToken === "string") {
                throw new Error("Invalid token");
            }

            userRole = verifiedToken.role;
        } catch {
            tokenInvalid = true;
        }
    }

    // Rule 0. Token is expired/invalid → clear cookies and treat user as unauthenticated.
    if (tokenInvalid) {
        if (routeOwner === null) {
            const response = NextResponse.next();
            clearAuthCookies(response);
            return response;
        }

        const response = NextResponse.redirect(new URL("/login", request.url));
        clearAuthCookies(response);
        return response;
    }

    // Rule 1. User is logged in and trying to access auth route (login/register) redirect user to his default dashboard route.
    if (accessToken && isAuth) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
    }

    // Rule 2. User is trying to access open public route
    if (routeOwner === null) {
        return NextResponse.next();
    }

    // Unauthenticated user trying to access a protected route
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Rule 3. User is trying to access common protected route
    if (routeOwner === "COMMON") {
        return NextResponse.next();
    }

    // Rule 4. User is trying to access role based protected route
    if (userRole !== routeOwner) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};