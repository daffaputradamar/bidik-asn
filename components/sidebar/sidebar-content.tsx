'use client'

import Logo from "../icon/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { adminSidebarItems, SidebarGroupType, userSidebarItems } from "./sidebarData";

const SidebarItem = ({
    link,
    label,
    icon,
    clickCallback,
    submenu = false
}: {
    link?: string;
    label: string;
    icon?: React.ReactNode; // Add the icon prop
    clickCallback?: () => void;
    submenu?: boolean;
}) => {
    const pathname = usePathname();
    const isActive = pathname === link;

    return (
        <div className="flex group">
            <div
                className={cn(
                    'w-2 rounded-r-md mr-4 transition-transform duration-300 ease-in-out transform',
                    isActive && !submenu ? 'bg-primary translate-x-0' : 'bg-transparent translate-x-[-100%]',
                    (!submenu) ? 'group-hover:bg-primary group-hover:translate-x-0' : ''
                )}
            ></div>
            <Link
                href={link || "#"}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start py-6 text-base",
                    isActive && "bg-primary-light text-primary-light-foreground",
                    "transition-colors duration-300 ease-in-out text-wrap"
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

const SidebarLoading = () => (
    <div className="space-y-2 px-6">
        {
            adminSidebarItems.map((item) => (
                <Skeleton key={item.title} className="h-12" />
            ))
        }
    </div>
)

export default function SidebarContent({ title = true }: { title?: boolean }) {

    const { data: session, status } = useSession();
    const [sidebarItems, setSidebarItems] = useState<SidebarGroupType[]>([]);
    const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({})
    const [openSubMenus, setOpenSubMenus] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (status === "authenticated") {
            let _sidebarItems: SidebarGroupType[] = [];

            if (session?.user?.role === "admin") {
                _sidebarItems = adminSidebarItems;
            } else {
                _sidebarItems = userSidebarItems;
            }

            setOpenGroups(_sidebarItems.reduce((acc: Record<number, boolean>, group, index) => {
                acc[index] = group.defaultOpen || false; // set initial state based on defaultOpen
                return acc;
            }, {}));

            setSidebarItems(_sidebarItems);
        }
    }, [status, session]);

    const toggleGroup = (index: number) => {
        setOpenGroups((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const toggleSubMenu = (index: number) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="space-y-4 py-4">
            {
                title && <div className="flex justify-center mb-12 pt-2">
                    <Logo className="h-20 w-auto" />
                </div>
            }

            {
                status == "loading" ? <SidebarLoading />
                    :
                    <div className="space-y-4">
                        {sidebarItems.map((group, index) => (
                            <Collapsible
                                key={index}
                                open={openGroups[index]}
                                onOpenChange={() => toggleGroup(index)}
                                className={cn(index !== sidebarItems.length - 1 ? "border-b border-b-gray-200 pb-2" : "", 'select-none')}
                            >
                                <CollapsibleTrigger asChild>
                                    <div className={cn('font-bold mb-2 ml-10 text-[#343e9e] cursor-pointer', openGroups[index] ? 'text-sm' : '')}>
                                        {group.title}
                                    </div>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <div className="space-y-1 pr-6">
                                        {group.items.map((subItem, subItemIndex) => (
                                            <div key={subItemIndex}>
                                                {
                                                    (!subItem.items || subItem.items.length === 0) &&
                                                    <SidebarItem
                                                        link={subItem.link}
                                                        label={subItem.label}
                                                        icon={subItem.icon}
                                                    />
                                                }

                                                {
                                                    subItem.items && subItem.items.length > 0 &&
                                                    <Collapsible
                                                        key={index + subItemIndex}
                                                        open={openSubMenus[index + subItemIndex]}
                                                        onOpenChange={() => toggleSubMenu(index + subItemIndex)}
                                                    >
                                                        <CollapsibleTrigger asChild>
                                                            <SidebarItem
                                                                label={subItem.label}
                                                                icon={subItem.icon}
                                                                clickCallback={() => toggleSubMenu(index + subItemIndex)}
                                                            />
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent>
                                                            <div className="ml-12">
                                                                {subItem.items.map((childItem) => (
                                                                    <SidebarItem
                                                                        submenu
                                                                        key={childItem.label}
                                                                        label={childItem.label}
                                                                        link={childItem.link}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
            }


        </div>
    )
}