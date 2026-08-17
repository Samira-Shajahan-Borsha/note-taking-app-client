"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { updateNoteAction } from "@/services/note/note.action";
import {
    updateNoteValidationZodSchema,
    type UpdateNoteFormValues,
} from "@/zod/note.validation";
import type { INote } from "@/types/note.interface";

interface EditNoteDialogProps {
    note: INote;
}

const EditNoteDialog = ({ note }: EditNoteDialogProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateNoteFormValues>({
        resolver: zodResolver(updateNoteValidationZodSchema),
        defaultValues: {
            title: note.title,
            content: note.content,
        },
    });

    const onSubmit = async (data: UpdateNoteFormValues) => {
        setError("");
        const res = await updateNoteAction(note._id, data);
        if (res?.error) {
            setError(res.error);
            return;
        }
        reset(data);
        setOpen(false);
        router.refresh();
    };

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (!next) {
            reset({ title: note.title, content: note.content });
            setError("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={<Button variant="ghost" size="icon" type="button" />}
            >
                <Pencil />
                <span className="sr-only">Edit</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                    <DialogDescription>
                        Update the details of your note.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="rounded bg-red-100 p-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Note title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-xs text-red-500">
                                {errors.title.message as string}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your note..."
                            rows={5}
                            {...register("content")}
                        />
                        {errors.content && (
                            <p className="text-xs text-red-500">
                                {errors.content.message as string}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditNoteDialog;