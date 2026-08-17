"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { updateUserAction } from "@/services/user/user.action";
import {
    updateUserValidationZodSchema,
    type UpdateUserFormValues,
} from "@/zod/user.validation";
import type { IAllUser } from "@/types/user.interface";

interface EditUserDialogProps {
    user: IAllUser;
}

const EditUserDialog = ({ user }: EditUserDialogProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(updateUserValidationZodSchema),
        defaultValues: {
            name: user.name ?? "",
            email: user.email ?? "",
            password: "",
            role: user.role ?? "USER",
        },
    });

    const onSubmit = async (data: UpdateUserFormValues) => {
        setError("");
        const payload = {
            name: data.name,
            email: data.email,
            role: data.role,
            ...(data.password ? { password: data.password } : {}),
        };
        const res = await updateUserAction(user._id, payload);
        if (res?.error) {
            setError(res.error);
            return;
        }
        reset({
            name: data.name,
            email: data.email,
            password: "",
            role: data.role ?? "USER",
        });
        setOpen(false);
        router.refresh();
    };

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (!next) {
            reset({
                name: user.name ?? "",
                email: user.email ?? "",
                password: "",
                role: user.role ?? "USER",
            });
            setError("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={<Button variant="ghost" size="icon" type="button" />}
            >
                <Pencil />
                <span className="sr-only">Edit user</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Update the details of this user.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="rounded bg-red-100 p-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Full name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">
                                {errors.name.message as string}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Leave blank to keep current password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select
                                    value={field.value ?? "USER"}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USER">USER</SelectItem>
                                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
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

export default EditUserDialog;