"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { registerAction } from "@/services/auth/auth.action";
import { registerValidationZodSchema } from "@/zod/auth.validation";

type RegisterFormValues = z.infer<typeof registerValidationZodSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerValidationZodSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setError("");
        const res = await registerAction(data);
        if (res?.error) {
            setError(res.error);
        } else {
            router.push("/login");
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-zinc-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>Enter your details to register</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && <div className="rounded bg-red-100 p-2 text-sm text-red-600">{error}</div>}

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message as string}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>

                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
