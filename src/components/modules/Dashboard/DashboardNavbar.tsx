"use client";

import { usePathname } from "next/navigation";
import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import type { IProfile } from "@/types/user.interface";

interface DashboardNavbarProps {
    profile: IProfile | null;
}

const breadcrumbLabels: Record<string, string> = {
    "/dashboard/user/my-notes": "My Notes",
    "/dashboard/admin/my-notes": "My Notes",
    "/dashboard/admin/notes": "All Notes",
    "/dashboard/admin/users": "Users",
    "/dashboard/admin/interests": "Interests",
    "/dashboard/posts": "Posts",
};

const DashboardNavbar = ({ profile }: DashboardNavbarProps) => {
    const pathname = usePathname();
    const label = breadcrumbLabels[pathname] ?? "Dashboard";

    const displayName = profile?.user?.name || profile?.user?.email || "User";
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />

            <SidebarSeparator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
                <span className="text-muted-foreground">Dashboard</span>
                <span className="text-muted-foreground/50">/</span>
                <span className="font-medium">{label}</span>
            </nav>

            <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                        {initial}
                    </div>
                    <div className="hidden flex-col text-left sm:flex">
                        <span className="text-sm font-medium leading-tight">{displayName}</span>
                        <span className="text-xs leading-tight text-muted-foreground">
                            {profile?.user?.role ?? "Guest"}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
