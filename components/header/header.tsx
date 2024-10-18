'use client'
import { Bell } from "@phosphor-icons/react";
import SidebarToggler from "../sidebar/sidebar-toggler";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <header className="flex bg-white h-16 items-center justify-between border-b px-4 lg:px-6">
            <SidebarToggler />
            <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <Bell size={24} />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" size="icon">
                    {/* User avatar */}
                    <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="rounded-full"
                        width={32}
                        height={32}
                    />
                    <span className="sr-only">User menu</span>
                </Button>
            </div>
        </header>
    )
}