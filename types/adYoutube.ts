import { adYoutube } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from 'drizzle-zod'
import { z } from "zod";

export const CreateAdYoutubeSchema = createInsertSchema(adYoutube, {
    link: z.string().min(1, "Link is required"),
    description: z.string().min(1, "Description is required"),
    thumbnail: z.string().min(1, "Thumbnail is required"),
});

export type AdYoutubeDBType = InferSelectModel<typeof adYoutube>;
export type InsertAdYoutubeDBType = InferInsertModel<typeof adYoutube>;
