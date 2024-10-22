import { adBanners } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";

const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE);

export const CreateAdBannerSchema = z.object({
    title: z.string().min(1, "Title is required"), // Ensure the title is a non-empty string
    description: z.string().optional(),
    link: z.string().url("Invalid URL format"), // Validate the link as a valid URL
    file: typeof window === 'undefined' ? z.any() : 
            z.instanceof(File, { message: "File is required" })
            .refine((file) => {
                return file && file.size <= MAX_FILE_SIZE
            }, {
                message: "File size exceeds the maximum allowed size"
            })
});

export const UpdateAdBannerSchema = z.object({
    title: z.string().min(1, "Title is required"), // Ensure the title is a non-empty string
    description: z.string().optional(),
    link: z.string().url("Invalid URL format"), // Validate the link as a valid URL
    file: typeof window === 'undefined' ? z.any() : 
        z.instanceof(File).optional().refine((file) => !file || file.size <= MAX_FILE_SIZE, {
            message: "File size exceeds the maximum allowed size"
        })
});

export type AdBannerType = z.infer<typeof CreateAdBannerSchema>;

export type AdBannerDBType = InferSelectModel<typeof adBanners>;
