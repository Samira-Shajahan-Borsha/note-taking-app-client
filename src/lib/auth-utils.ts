export type UserRole = "USER" | "ADMIN";

export type RouteOwner = UserRole | "COMMON";

const routeOwners: Record<string, RouteOwner> = {
    "/dashboard": "COMMON",
    "/notes": "COMMON",
    "/admin": "ADMIN",
};

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
        USER: "/dashboard",
        ADMIN: "/dashboard",
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