'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { labelVariants } from "@/components/ui/label";
import { UserLoginSchema, UserLoginType } from "@/types/userLogin";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../action/loginUser";
import { CircleNotch } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function FormLogin() {
    const router = useRouter();
    const { data: session } = useSession();

    if(session) {
        router.push("/");
    }

    const formLogin = useForm<UserLoginType>({
        resolver: zodResolver(UserLoginSchema),
        defaultValues: {
            email: "",
            password: "",
            isRememberedPassword: false
        }
    });

    const { mutate: loginUser, isPending: isLoadingLogin } = useMutation({
        mutationFn: LoginUser,
        onSuccess: async (data: { success: boolean, message?: string }) => {
            if(!data.success) {
                formLogin.setError('root', {
                    message: data.message
                });
                return;
            }
            formLogin.reset();
            location.reload();

        },
        onError: (_e) => {
            formLogin.setError('root', {
                message: "An error occured during login"
            });
        },
    });

    const handleLogin = async (values: UserLoginType) => {

        try {
            loginUser(values)
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
                                    <Input 
                                    placeholder="example@domain.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <div className="space-y-4">
                        <FormField
                            control={formLogin.control}
                            name="password"
                            render={({ field }) =>
                                <FormItem>
                                    <div className="flex justify-between">
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <Link 
                                        tabIndex={-1}
                                        href={"/forgot-password"} className={cn(labelVariants())}>Lupa Password?</Link>
                                    </div>
                                    <FormControl>
                                        <Input 
                                        type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />
                        <FormField
                            control={formLogin.control}
                            name="isRememberedPassword"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Ingatkan Password
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormRootError />
                    </div>


                    <div className="text-center px-10">
                        <Button type="submit" variant="default" className="w-full py-5 font-bold" disabled={isLoadingLogin}>
                        {isLoadingLogin ? <CircleNotch className="animate-spin" size={32} weight="bold" /> : "Masuk"}
                    </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}