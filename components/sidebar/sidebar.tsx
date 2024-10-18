'use client'

import { useSidebar } from "@/context/sidebar-context"
import { Button } from "../ui/button"
import { Sheet, SheetContent } from "../ui/sheet"
import useMediaQuery from "@/hooks/use-media-query"

const SidebarContent = () => (
    <div className="space-y-4 py-4">
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Bidik ASN
            </h2>
            <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    Beranda
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    Kalender
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Bimbel Saya
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="M21 15V6" />
                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M12 12H3" />
                        <path d="M16 6H3" />
                        <path d="M12 18H3" />
                    </svg>
                    List Harga Paket
                </Button>
            </div>
        </div>
    </div>
)

const DesktopSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => (
    <aside
        className={`${isSidebarOpen ? "w-64" : "w-0"
            } overflow-y-auto border-r bg-white transition-all duration-300 ease-in-out hidden md:block`}
    >
        <SidebarContent />
    </aside>
)

const MobileSidebar = ({ isOpen, closeSidebar }: { isOpen: boolean, closeSidebar: () => void }) => {
    return (
        <Sheet open={isOpen} onOpenChange={closeSidebar}>
            <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
            </SheetContent>
        </Sheet>
    )
}



export default function Sidebar() {
    const { isOpen, closeSidebar } = useSidebar();
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <>
            <DesktopSidebar isSidebarOpen={isOpen} />
            {isMobile && <MobileSidebar isOpen={isOpen} closeSidebar={closeSidebar} /> }
        </>
    )
}