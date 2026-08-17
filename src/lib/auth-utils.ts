export type UserRole = "USER" | "ADMIN";

export type RouteOwner = UserRole | "COMMON";

const routeOwners: Record<string, RouteOwner> = {
    "/dashboard/user": "USER",
    "/dashboard/admin": "ADMIN",
    "/dashboard/posts": "COMMON",
    "/dashboard": "COMMON",
    "/note": "COMMON",
};

const authRoutes = ["/login", "/register"];

export function isAuthRoute(pathname: string): boolean {
    return authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function getRouteOwner(pathname: string): RouteOwner | null {
    for (const [route, owner] of Object.entries(routeOwners)) {
        if (pathname === route || pathname.startsWith(`${route}/`)) {
            return owner;
        }
    }

    return null;
}

export function getDefaultDashboardRoute(role: UserRole): string {
    const dashboardByRole: Record<UserRole, string> = {
        USER: "/dashboard/user/my-notes",
        ADMIN: "/dashboard/admin/my-notes",
    };

    return dashboardByRole[role];
}

export function isValidRedirectForRole(pathname: string, role: UserRole): boolean {
    const owner = getRouteOwner(pathname);

    if (owner === null) {
        return true;
    }

    if (owner === "COMMON") {
        return true;
    }

    return owner === role;
}