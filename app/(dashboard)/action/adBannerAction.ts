'use server'

import { db } from "@/db";
import { adBanners } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const saveFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Generate UUID for the file name
    const fileExtension = path.extname(file.name);
    const newFileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(process.cwd(), "public", "uploads", newFileName);

    // Save file to the public/uploads directory
    await fs.writeFile(filePath, buffer);

    return newFileName; // Return the new file name
};

const deleteFile = async (filePath: string) => {
    await fs.unlink(filePath);
};

export const CreateAdBanner = async (form: FormData) => {

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const link = form.get("link") as string;
    const file = form.get("file") as File;

    if (!title || !description || !link || !file) {
        return { success: false, message: "Missing required fields" };
    }

    try {
        // Save the file and get the new file name
        const newFileName = await saveFile(file);

        // Insert the ad banner details into the database
        await db.insert(adBanners).values({
            title,
            description,
            link,
            fileName: newFileName,
            filePath: `/uploads/${newFileName}`, // Store the file path
        });

        revalidatePath("/");

        return { success: true };
    } catch {
        return {
            success: false
        }
    }
}

export const DeleteAdBanner = async (id: number) => {
    try {
        const ad = await db.select().from(adBanners).where(eq(adBanners.id, id)).limit(1);

        if (ad.length === 0) {
            return { success: false, message: "Ad not found" };
        }

        const filePath = path.join(process.cwd(), "public", "uploads", ad[0].fileName);

        try {
            await deleteFile(filePath)
        } catch {
            return { success: false, message: "Failed to delete the ad file." };
        }

        await db.delete(adBanners).where(eq(adBanners.id, id));

        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Failed to delete ad:", error);
        return { success: false, message: "Failed to delete ad." };
    }
};


export const UpdateAdBanner = async ({ id, form }: { id: number, form: FormData }) => {
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const link = form.get("link") as string;
    const file = form.get("file") as File;

    const ad = await db.select().from(adBanners).where(eq(adBanners.id, id)).limit(1);

    if (ad.length === 0) {
        return { success: false, message: "Ad not found" };
    }

    let fileName = ad[0].fileName

    if (file && file instanceof File) {
        const filePath = path.join(process.cwd(), "public", "uploads", ad[0].fileName);
        await deleteFile(filePath)
        
        fileName = await saveFile(file);
    }

    // Update Ad logic using Drizzle ORM
    await db.update(adBanners).set({
        title,
        description,
        link,
        fileName: fileName,
        filePath: `/uploads/${fileName}`, // Update the file path
    }).where(eq(adBanners.id, id));

    revalidatePath("/");

    return { success: true };
};
