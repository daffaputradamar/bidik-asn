import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormLogin from "./component/FormLogin";
import Link from "next/link";
import Logo from "@/components/icon/logo";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {

    const session = await auth()
    if(session?.user) {
        redirect("/");
    }

    return (
        <div className="w-full min-h-screen bg-[#5FBDFF] relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg_auth_2.png')" }}>
            {/* Card container with z-20 to ensure it stays above the SVGs */}
            <div className="flex justify-center items-center min-h-screen relative z-20">
                <Card className="py-10 px-4 w-full mx-4 md:w-1/4">
                    <CardHeader className="mb-2 space-y-2">
                        <div className="flex justify-center mb-3">
                            <Logo className="w-24 h-24" />
                        </div>
                        <CardTitle className="text-center text-2xl font-bold">Masuk ke akunmu</CardTitle>
                        <CardDescription className="font-semibold text-center">Please enter your email and password to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormLogin />
                        <div className="text-center text-sm mt-4">
                            Belum Punya Akun? <Link href={"/register"} className="underline font-bold text-primary">Buat Akun</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
