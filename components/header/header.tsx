'use client'
import { Bell } from "@phosphor-icons/react";
import SidebarToggler from "../sidebar/sidebar-toggler";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
    return (
        <header className="flex bg-white items-center justify-between border-b px-4 lg:px-6 py-2 md:py-4">
            <SidebarToggler />
            <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <Bell size={24} />
                    <span className="sr-only">Notifications</span>
                </Button>
                {/* <Button variant="ghost" size="icon">
                    <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="rounded-full"
                        width={32}
                        height={32}
                    />
                    <span className="sr-only">User menu</span>
                </Button> */}

                <div className="space-x-2">
                    <Link href={"/login"} className={cn(buttonVariants({variant:"outline"}))}>
                        Login
                    </Link>
                    <Link href={"/register"} className={cn(buttonVariants({variant:"default"}))}>
                        Daftar
                    </Link>
                </div>
            </div>
        </header>
    )
}