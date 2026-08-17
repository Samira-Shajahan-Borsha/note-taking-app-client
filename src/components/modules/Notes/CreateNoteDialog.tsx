"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

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

import { createNoteAction } from "@/services/note/note.action";
import {
    createNoteValidationZodSchema,
    type CreateNoteFormValues,
} from "@/zod/note.validation";

const CreateNoteDialog = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateNoteFormValues>({
        resolver: zodResolver(createNoteValidationZodSchema),
    });

    const onSubmit = async (data: CreateNoteFormValues) => {
        setError("");
        const res = await createNoteAction(data);
        if (res?.error) {
            setError(res.error);
            return;
        }
        reset();
        setOpen(false);
        router.refresh();
    };

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (!next) {
            reset();
            setError("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button />}>
                <Plus />
                Create Note
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogDescription>
                        Write down a new note to keep track of your thoughts.
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
                            {isSubmitting ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNoteDialog;