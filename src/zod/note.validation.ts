import { z } from "zod";

export const createNoteValidationZodSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),
    content: z.string().min(1, "Content is required"),
});

export type CreateNoteFormValues = z.infer<typeof createNoteValidationZodSchema>;

export const updateNoteValidationZodSchema = createNoteValidationZodSchema;

export type UpdateNoteFormValues = z.infer<typeof updateNoteValidationZodSchema>;
