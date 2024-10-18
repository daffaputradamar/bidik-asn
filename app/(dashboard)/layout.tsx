import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header />
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
