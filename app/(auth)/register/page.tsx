import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormRegister from "./component/FormRegister";
import Link from "next/link";
import Logo from "@/components/icon/logo";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Register() {
    
    const session = await auth()
    if(session?.user) {
        redirect("/");
    }

    return (
        <div className="w-full min-h-screen bg-[#5FBDFF] relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/bg_auth_2.png')" }}>
            {/* Card container with z-20 to ensure it stays above the SVGs */}
            <div className="flex justify-center items-center min-h-screen relative z-20">
                <Card className="py-10 px-4 w-full mx-4 md:w-1/2 my-4">
                    <CardHeader className="mb-2 space-y-2">
                        <div className="flex justify-center mb-3">
                            <Logo className="w-24 h-24" />
                        </div>
                        <CardTitle className="text-center text-2xl font-bold">Daftar akun baru</CardTitle>
                        <CardDescription className="font-semibold text-center">Buat akun baru untuk mengakses fitur - fitur Bidik ASN</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormRegister />
                        <div className="text-center text-sm mt-4">
                            Sudah Punya Akun? <Link href={"/login"} className="underline font-bold text-primary">Login</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
