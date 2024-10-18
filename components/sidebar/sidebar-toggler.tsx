'use client'

import { useSidebar } from "@/context/sidebar-context";
import { Button } from "../ui/button"
import { List } from "@phosphor-icons/react"

export default function SidebarToggler() {
    const { toggleSidebar } = useSidebar();
    return (
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <List size={24} />
            <span className="sr-only">Toggle sidebar</span>
        </Button>
    )
}