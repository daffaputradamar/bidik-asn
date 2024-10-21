'use client'

import { DataTable } from "@/components/ui/data-table"
import { BannerAd, columns } from "./column"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const bannerAds: BannerAd[] = [
    {
        id: 1,
        title: "Space Iklan",
        image: "/assets/images/bg_auth.png",
        link: "/ini-link-iklan",
    },
    {
        id: 2,
        title: "Sxpace Iklan",
        image: "/assets/images/bg_auth.png",
        link: "/ini-link-iklan-1",
    },
    {
        id: 3,
        title: "Sypace Iklan",
        image: "/assets/images/bg_auth.png",
        link: "/ini-link-iklan-2",
    },
]

export default function BannerAdManagement() {
    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold">Manajemen Iklan Banner</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={bannerAds} />
            </CardContent>
        </Card>
    )
}