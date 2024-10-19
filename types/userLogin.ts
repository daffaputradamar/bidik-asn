import { z } from "zod";

export const UserLoginSchema = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
        isRememberedPassword: z.boolean()
    })

export type UserLoginType = z.infer<typeof UserLoginSchema>;