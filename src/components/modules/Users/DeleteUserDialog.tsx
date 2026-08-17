"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteUserAction } from "@/services/user/user.action";

interface DeleteUserDialogProps {
    userId: string;
    userName: string;
}

const DeleteUserDialog = ({ userId, userName }: DeleteUserDialogProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setError("");
        setIsDeleting(true);
        const res = await deleteUserAction(userId);
        setIsDeleting(false);

        if (res?.error) {
            setError(res.error);
            return;
        }

        setOpen(false);
        router.refresh();
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="ghost" size="icon" type="button" />}
            >
                <Trash2 />
                <span className="sr-only">Delete user</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete user?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{" "}
                        <span className="font-medium">{userName}</span>. This
                        action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && (
                    <div className="rounded bg-red-100 p-2 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteUserDialog;