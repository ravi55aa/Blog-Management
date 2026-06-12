import {z} from "zod";


export const blogSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title should contain minimum 5 characters"),

    content: z
        .string()
        .trim()
        .min(20, "Content should contain minimum 20 characters"),
    });