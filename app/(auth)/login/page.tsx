import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormLogin from "./component/FormLogin";

export default function Login() {
    
    return (
        <div className="w-full min-h-screen bg-[#5FBDFF] relative overflow-hidden">
            {/* Card container with z-20 to ensure it stays above the SVGs */}
            <div className="flex justify-center items-center min-h-screen relative z-20">
                <Card className="py-10 px-4 w-full mx-4 md:w-1/4">
                    <CardHeader className="mb-2 space-y-2">
                        <CardTitle className="text-center text-2xl font-bold">Masuk ke akunmu</CardTitle>
                        <CardDescription className="font-semibold text-center">Please enter your email and password to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <FormLogin/>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Left SVG */}
            <svg className="absolute bottom-0 left-0 z-0 w-[50%] md:w-[30%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 585" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M272.5 895C519.647 895 720 694.647 720 447.5C720 315.376 401.153 424.916 310.095 343C230.823 271.687 387.523 0 272.5 0C25.3526 0 -175 200.353 -175 447.5C-175 694.647 25.3526 895 272.5 895Z" fill="#5DB4F2" />
            </svg>

            {/* Top Left SVG */}
            <svg className="absolute top-0 left-0 z-0 w-[60%] md:w-[40%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 821 611" fill="none">
                <path opacity="0.6" fillRule="evenodd" clipRule="evenodd" d="M219.512 -233.946C-12.7303 -149.417 -132.476 107.378 -47.9461 339.62C-2.75693 463.777 259.396 251.791 372.979 297.623C471.861 337.522 417.534 646.419 525.62 607.079C757.863 522.55 877.608 265.755 793.079 33.5125C708.549 -198.73 451.755 -318.475 219.512 -233.946Z" fill="#5DB4F2" />
            </svg>

            {/* Top Right SVG */}
            <svg className="absolute top-0 right-0 z-0 w-[50%] md:w-[30%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 584 396" fill="none">
                <path opacity="0.541829" fillRule="evenodd" clipRule="evenodd" d="M8.47097 -208.915C-41.4946 74.4538 147.716 344.675 431.085 394.64C582.573 421.352 521.44 33.6298 633.771 -54.2125C731.562 -130.685 1011.39 103.907 1034.64 -27.9738C1084.61 -311.343 895.395 -581.564 612.027 -631.529C328.658 -681.495 58.4366 -492.284 8.47097 -208.915Z" fill="#5DB4F2" />
            </svg>

            {/* Bottom Right SVG */}
            <svg className="absolute bottom-0 right-0 z-0 w-[50%] md:w-[30%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 706" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M1141.38 667.96C1196.52 355.221 987.699 56.992 674.96 1.84762C507.77 -27.6324 575.24 400.276 451.267 497.223C343.34 581.622 34.5121 322.715 8.8477 468.264C-46.2967 781.004 162.525 1079.23 475.264 1134.38C788.004 1189.52 1086.23 980.699 1141.38 667.96Z" fill="#5DB4F2" />
            </svg>
        </div>
    );
}
