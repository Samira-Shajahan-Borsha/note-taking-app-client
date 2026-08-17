import type { IUser } from "@/types/user.interface";

export interface INote {
    _id: string;
    user: string | IUser;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface INoteMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface INoteResponse {
    notes: INote[];
    meta: INoteMeta;
}