"use server"

import { signIn } from "@/auth";
import { UserLoginSchema, UserLoginType } from "@/types/userLogin";
import { CredentialsSignin } from "next-auth";

export const LoginUser = async (form: UserLoginType) => {
    const parsedBody = UserLoginSchema.safeParse(form);

    if (!parsedBody.success) {
        return {
            success: false,
            message: "Bad Request"
        }
    }

    try {
        await signIn("credentials", {
            email: parsedBody.data.email,
            password: parsedBody.data.password,
        })
    } catch(e: unknown) {
        if(e instanceof CredentialsSignin) {
            return {
                success: false,
                message: e.code
            }
        }
    }

    return {
        success: true
    };

}