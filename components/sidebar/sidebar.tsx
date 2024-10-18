'use client'

import { useSidebar } from "@/context/sidebar-context"
import { buttonVariants } from "../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import useMediaQuery from "@/hooks/use-media-query"
import Logo from "../icon/logo"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Gauge, Gift, GridFour, ListChecks } from "@phosphor-icons/react"

const SidebarItem = ({
    link,
    label,
    icon,
    clickCallback,
}: {
    link?: string;
    label: string;
    icon?: React.ReactNode; // Add the icon prop
    clickCallback?: () => void;
}) => {
    const pathname = usePathname();
    const isActive = pathname === link;

    return (
        <div className="flex group">
            <div
                className={cn(
                    'w-2 rounded-r-md mr-4 transition-transform duration-300 ease-in-out transform',
                    isActive ? 'bg-primary translate-x-0' : 'bg-transparent translate-x-[-100%]',
                    'group-hover:bg-primary group-hover:translate-x-0'
                )}
            ></div>
            <Link
                href={link || "#"}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start py-6 text-base",
                    isActive && "bg-primary-light text-primary-light-foreground",
                    "transition-colors duration-300 ease-in-out"
                )}
                onClick={() => {
                    if (clickCallback) clickCallback();
                }}
            >
                {icon && <span className="mr-5">{icon}</span>}
                {label}
            </Link>
        </div>
    );
}

const SidebarContent = ({ title = true }: { title?: boolean }) => (
    <div className="space-y-4 py-4">
        {
            title && <div className="flex justify-center mb-12 pt-2">
                <Logo className="h-20 w-auto" />
            </div>
        }
        <div className="px-0 pr-6">
            <div className="space-y-1">
                <SidebarItem link={"/"} label={"Beranda"} icon={<Gauge size={24} />} />
                <SidebarItem label={"Kalender"} icon={<GridFour size={24} />} />
                <SidebarItem label={"Bimbel Saya"} icon={<Gift size={24} />} />
                <SidebarItem label={"List Harga Paket"} icon={<ListChecks size={24} />} />
            </div>
        </div>
    </div>
)

const DesktopSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => (
    <aside
        className={`${isSidebarOpen ? "w-64" : "w-0"
            } overflow-y-auto overflow-x-hidden border-r bg-white transition-all duration-300 ease-in-out hidden md:block`}
    >
        <SidebarContent />
    </aside>
)

const MobileSidebar = ({ isOpen, closeSidebar }: { isOpen: boolean, closeSidebar: () => void }) => {
    return (
        <Sheet open={isOpen} onOpenChange={closeSidebar}>
            <SheetContent side="left" className="w-72 py-4 px-0">
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
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <>
            <DesktopSidebar isSidebarOpen={isOpen} />
            {isMobile && <MobileSidebar isOpen={isOpen} closeSidebar={closeSidebar} />}
        </>
    )
}