"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, FileText, Users, Puzzle, MessageSquare } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import LogoutButton from "@/components/logout-button";
import type { IProfile } from "@/types/user.interface";

interface DashboardSidebarProps {
    profile: IProfile | null;
}

const DashboardSidebar = ({ profile }: DashboardSidebarProps) => {
    const pathname = usePathname();
    const isAdmin = profile?.user?.role === "ADMIN";
    const myNotesHref = isAdmin ? "/dashboard/admin/my-notes" : "/dashboard/user/my-notes";

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={<Link href="/" />}>
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <NotebookPen className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">NoteApp</span>
                                <span className="truncate text-xs text-sidebar-foreground/70">
                                    {isAdmin ? "Admin" : "Workspace"}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    render={<Link href={myNotesHref} />}
                                    isActive={isActive(myNotesHref)}
                                    tooltip="My Notes"
                                >
                                    <NotebookPen />
                                    <span>My Notes</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Admin</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        render={<Link href="/dashboard/admin/notes" />}
                                        isActive={isActive("/dashboard/admin/notes")}
                                        tooltip="All Notes"
                                    >
                                        <FileText />
                                        <span>All Notes</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        render={<Link href="/dashboard/admin/users" />}
                                        isActive={isActive("/dashboard/admin/users")}
                                        tooltip="Users"
                                    >
                                        <Users />
                                        <span>Users</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        render={<Link href="/dashboard/admin/interests" />}
                                        isActive={isActive("/dashboard/admin/interests")}
                                        tooltip="Interests"
                                    >
                                        <Puzzle />
                                        <span>Interests</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                <SidebarGroup>
                    <SidebarGroupLabel>Community</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    render={<Link href="/dashboard/posts" />}
                                    isActive={isActive("/dashboard/posts")}
                                    tooltip="Posts"
                                >
                                    <MessageSquare />
                                    <span>Posts</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <LogoutButton className="w-full justify-start" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
};

export default DashboardSidebar;
