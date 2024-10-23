'use client'

import { useSidebar } from "@/context/sidebar-context"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import useMediaQuery from "@/hooks/use-media-query"
import Logo from "../icon/logo"
import SidebarContent from "./sidebar-content"


const DesktopSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => (
    <aside
        className={`${isSidebarOpen ? "w-64" : "w-0"
            } h-screen sticky top-0 overflow-y-auto overflow-x-hidden border-r bg-white transition-all duration-300 ease-in-out hidden md:block scrollbar`}
    >
        <SidebarContent />
    </aside>
)

const MobileSidebar = ({ isOpen, closeSidebar }: { isOpen: boolean, closeSidebar: () => void }) => {
    return (
        <Sheet open={isOpen} onOpenChange={closeSidebar}>
            <SheetContent side="left" className="w-72 py-4 px-0 overflow-y-auto">
                <SheetHeader className="px-4 mb-8 mt-4">
                    <SheetTitle>
                        <div className="flex justify-center">
                            <Logo className="h-20 w-auto" />
                        </div>
                    </SheetTitle>
                    <SheetDescription className="hidden">
                        Bidik ASN website
                    </SheetDescription>
                </SheetHeader>
                <SidebarContent title={false} />
            </SheetContent>
        </Sheet>
    )
}



export default function Sidebar() {
    const { isOpen, closeSidebar } = useSidebar();
    const isMobile = useMediaQuery("(max-width: 769px)");

    return (
        <>
            <DesktopSidebar isSidebarOpen={isOpen} />
            {isMobile && <MobileSidebar isOpen={isOpen} closeSidebar={closeSidebar} />}
        </>
    )
}