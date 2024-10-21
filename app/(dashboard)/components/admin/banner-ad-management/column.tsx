import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DotsThreeOutline } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type BannerAd = {
    id: number;
    title: string;
    image: string;
    link: string;
}

export const columns: ColumnDef<BannerAd>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
              <DataTableColumnHeader column={column} title="Judul" className="text-base font-bold" />
            )
          },
    },
    {
        accessorKey: "image",
        header: "Gambar",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <a href={row.getValue("image")} target="_blank">
                        <Image
                            src={row.getValue("image")}
                            width={360}
                            height={120}
                            alt={row.getValue("title")}
                            className="rounded object-cover aspect-[3/1] md:aspect-[5/1]"
                        />
                    </a>
                </div>
            )
        }
    },
    {
        accessorKey: "link",
        header: "Tautan",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const ad = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="none" size="sm">
                            <span className="sr-only">Open menu</span>
                            <DotsThreeOutline size={24} weight="thin" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(ad.link)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]