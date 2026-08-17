export interface INote {
    _id: string;
    user: string;
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