import type { ZodType } from "zod";

export function zodValidator<T>(payload: unknown, schema: ZodType<T>) {
    return schema.safeParse(payload);
}