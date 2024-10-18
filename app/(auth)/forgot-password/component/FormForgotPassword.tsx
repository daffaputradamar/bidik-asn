'use client'

import { useForm } from "react-hook-form";
import { z } from "zod"; // Add new import
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserForgotPasswordSchema = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
        isRememberedPassword: z.boolean()
    })

type UserForgotPasswordType = z.infer<typeof UserForgotPasswordSchema>;

export default function FormForgotPassword() {

    const formLogin = useForm<UserForgotPasswordType>({
        resolver: zodResolver(UserForgotPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
            isRememberedPassword: false
        }
    });

    const handleLogin = async (values: UserForgotPasswordType) => {

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log(values);

            formLogin.setError('root', {
                message: "Invalid Credential"
            })
        } catch {
            formLogin.setError('root', {
                message: 'An error occurred during login'
            })
        }
    }

    return (
        <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(handleLogin)}>
                <div className="space-y-8">

                    <FormField
                        control={formLogin.control}
                        name="email"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Alamat Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@domail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <FormRootError />
                    <div className="text-center px-10">
                        <Button type="submit" variant="default" className="w-full py-5 font-bold">Masuk</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}