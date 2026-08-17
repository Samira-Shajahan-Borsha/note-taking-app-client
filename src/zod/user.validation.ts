import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
        /[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/~`]/,
        "Password must contain at least one special character.",
    );

export const createUserValidationZodSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .max(50, "Name cannot exceed 50 characters.")
        .trim(),
    email: z
        .string()
        .regex(emailRegex, "Please provide a valid email address.")
        .trim()
        .toLowerCase(),
    password: passwordSchema,
    role: z.enum(["USER", "ADMIN"]),
});

export type CreateUserFormValues = z.infer<typeof createUserValidationZodSchema>;

export const updateUserValidationZodSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters long.")
            .max(50, "Name cannot exceed 50 characters.")
            .trim()
            .optional(),
        email: z
            .string()
            .regex(emailRegex, "Please provide a valid email address.")
            .trim()
            .toLowerCase()
            .optional(),
        password: z.union([z.literal(""), passwordSchema]).optional(),
        role: z.enum(["USER", "ADMIN"]).optional(),
    })
    .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        { message: "At least one field must be provided for update." },
    );

export type UpdateUserFormValues = z.infer<typeof updateUserValidationZodSchema>;