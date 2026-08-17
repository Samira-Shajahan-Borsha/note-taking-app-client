import { z } from "zod";

export const loginValidationZodSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export const registerValidationZodSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/~`]/, "Password must contain at least one special character"),
});