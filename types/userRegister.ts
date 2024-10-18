import { z } from "zod";

export const UserRegisterSchema = z
    .object({
        name: z.string().min(1),
        email: z.string().email(),
        phoneNumber: z.string().regex(/^\d+$/, { message: "Invalid phone number" }),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
        confirmPassword: z.string().min(8, { message: "Password don't match" }),
        province: z.object({
            code: z.string().min(1, "Please select a province"),
            name: z.string().min(1),
        }),
        city: z.object({
            code: z.string().min(1, "Please select a city"),
            name: z.string().min(1),
        }),
        district: z.object({
            code: z.string().min(1, "Please select a district"),
            name: z.string().min(1),
        }),
        village: z.object({
            code: z.string().min(1, "Please select a village"),
            name: z.string().min(1),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    });


export type UserRegisterType = z.infer<typeof UserRegisterSchema>;