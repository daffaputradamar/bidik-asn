'use server'

import { db } from "@/db";
import { adYoutube } from "@/db/schema";
import { InsertAdYoutubeDBType } from "@/types/adYoutube";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const CreateAdYoutube = async ({ description, link, thumbnail }: InsertAdYoutubeDBType) => {

    try {
         await db.insert(adYoutube).values({
             description,
             link,
             thumbnail
         });

         revalidatePath("/");

         return { success: true };
    } catch {
        return {
            success: false
        }
    }
}

export const DeleteAdYoutube = async (id: number) => {
    try {
        const ad = await db.select().from(adYoutube).where(eq(adYoutube.id, id)).limit(1);

        if (ad.length === 0) {
            return { success: false, message: "Ad not found" };
        }

        await db.delete(adYoutube).where(eq(adYoutube.id, id));

        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Failed to delete ad:", error);
        return { success: false, message: "Failed to delete ad." };
    }
};


export const UpdateAdYoutube = async ({ id, form }: { id: number, form: InsertAdYoutubeDBType }) => {
    
    const { description, link, thumbnail } = form

    const ad = await db.select().from(adYoutube).where(eq(adYoutube.id, id)).limit(1);
    if (ad.length === 0) {
        return { success: false, message: "Ad not found" };
    }

    // Update Ad logic using Drizzle ORM
    await db.update(adYoutube).set({
        description,
        link,
        thumbnail,
    }).where(eq(adYoutube.id, id));

    revalidatePath("/");

    return { success: true };
};