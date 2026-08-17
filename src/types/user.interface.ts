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

export interface IAllUser {
    _id: string;
    name?: string;
    email?: string;
    role?: UserRole;
    interests?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IUserMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface IAllUsersResponse {
    users: IAllUser[];
    meta: IUserMeta;
}