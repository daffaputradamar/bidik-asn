import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 mb-8 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
