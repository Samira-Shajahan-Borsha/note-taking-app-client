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
import type { IAllUser } from "@/types/user.interface";

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

interface ViewUserDialogProps {
    user: IAllUser;
}

const ViewUserDialog = ({ user }: ViewUserDialogProps) => {
    const interests = user.interests?.length
        ? user.interests.join(", ")
        : "—";

    return (
        <Dialog>
            <DialogTrigger
                render={<Button variant="ghost" size="icon" type="button" />}
            >
                <Eye />
                <span className="sr-only">View user</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{user.name ?? "User"}</DialogTitle>
                    <DialogDescription>
                        Created {formatDate(user.createdAt)} · Updated{" "}
                        {formatDate(user.updatedAt)}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                    <div>
                        <span className="font-medium">Email:</span>{" "}
                        <span className="text-muted-foreground">
                            {user.email ?? "—"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium">Role:</span>{" "}
                        <span className="text-muted-foreground">
                            {user.role ?? "—"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium">Interests:</span>{" "}
                        <span className="text-muted-foreground">{interests}</span>
                    </div>
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

export default ViewUserDialog;