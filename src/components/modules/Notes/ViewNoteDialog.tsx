"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { INote } from "@/types/note.interface";

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

interface ViewNoteDialogProps {
    note: INote;
}

const ViewNoteDialog = ({ note }: ViewNoteDialogProps) => {
    const user = typeof note.user !== "string" ? note.user : null;

    return (
        <Dialog>
            <DialogTrigger
                render={<Button variant="ghost" size="icon" type="button" />}
            >
                <Eye />
                <span className="sr-only">View note</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{note.title}</DialogTitle>
                    <DialogDescription>
                        Created {formatDate(note.createdAt)} · Updated{" "}
                        {formatDate(note.updatedAt)}
                    </DialogDescription>
                </DialogHeader>
                {user && (
                    <div className="text-xs text-muted-foreground">
                        {user.name || user.email || user._id}
                    </div>
                )}
                <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-sm">
                    {note.content}
                </div>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>
                        Close
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewNoteDialog;