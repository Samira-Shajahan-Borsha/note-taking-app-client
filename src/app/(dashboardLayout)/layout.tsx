import type { CSSProperties } from "react";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import { getMyProfileInfo } from "@/services/auth/getMyProfileInfo";

export const dynamic = "force-dynamic";

const CommonDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const profile = await getMyProfileInfo();

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as CSSProperties
            }
        >
            <DashboardSidebar profile={profile} />
            <SidebarInset>
                <DashboardNavbar profile={profile} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 px-4 lg:px-8">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default CommonDashboardLayout;
