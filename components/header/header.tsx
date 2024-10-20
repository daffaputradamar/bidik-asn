'use client'
import { Bell, CircleNotch } from "@phosphor-icons/react";
import SidebarToggler from "../sidebar/sidebar-toggler";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="flex bg-white items-center justify-between border-b px-4 lg:px-6 py-2 md:py-4">
            <SidebarToggler />
            <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <Bell size={24} />
                    <span className="sr-only">Notifications</span>
                </Button>

                {
                    status == "loading" ?
                        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer select-none">
                            <CircleNotch className="animate-spin" size={32} weight="bold" />
                        </div>
                        : status == "authenticated" ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer select-none">
                                        <span className="text-sm text-white">{session.user?.name?.charAt(0)?.toUpperCase()}</span> {/* Display the first letter of the user's name */}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Billing
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Keyboard shortcuts
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>Email</DropdownMenuItem>
                                                <DropdownMenuItem>Message</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>More...</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        New Team
                                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                                    {/* <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem onClick={() => signOut({
                                        redirectTo: "/login",
                                    })}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <div className="space-x-2">
                                <Link href={"/login"} className={cn(buttonVariants({ variant: "outline" }))}>
                                    Login
                                </Link>
                                <Link href={"/register"} className={cn(buttonVariants({ variant: "default" }))}>
                                    Daftar
                                </Link>
                            </div>
                }



            </div>
        </header>
    )
}