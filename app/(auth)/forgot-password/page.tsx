import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormForgotPassword from "./component/FormForgotPassword";
import Link from "next/link";

export default function Login() {

    return (
        <div className="w-full min-h-screen bg-[#5FBDFF] relative overflow-hidden" style={{ backgroundImage: "url('/assets/images/bg_auth_2.png')" }}>
            <div className="flex justify-center items-center min-h-screen relative z-20">
                <Card className="py-10 px-4 w-full mx-4 md:w-1/4">
                    <CardHeader className="mb-2 space-y-2">
                        <CardTitle className="text-center text-2xl font-bold">Lupa Password</CardTitle>
                        <CardDescription className="font-semibold text-center">Masukkan alamat email untuk melakukan reset password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormForgotPassword />
                        <div className="text-center text-sm mt-4">
                            Kembali ke <Link href={"/login"} className="underline font-bold text-primary">Login</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
