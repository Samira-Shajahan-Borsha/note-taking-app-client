import type { UserRole } from "@/lib/auth-utils";

export interface IUser {
    _id: string;
    name?: string;
    email?: string;
    role?: UserRole;
    profileImage?: string | null;
}

export interface IProfile {
    user: IUser;
}