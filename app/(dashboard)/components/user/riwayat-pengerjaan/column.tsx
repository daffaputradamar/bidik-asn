import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

export type Tryout = {
    tryoutName: string;
    status: string;
    date: string;
    score: number;
}

export const columns: ColumnDef<Tryout>[] = [
    { header: 'Pengerjaan Tryout', accessorKey: 'tryoutName' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Tanggal', accessorKey: 'date' },
    { header: 'Nilai', accessorKey: 'score' },
    {
        header: 'Action',
        id: 'action',
        cell: ({ }) => (
            <div className="gap-5 flex flex-col md:flex-row">
                <Button className={cn(badgeVariants(), 'rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-sm py-0 px-4 font-bold')}>
                    Statistik & Pembahasan
                </Button>
                <Button className={cn('rounded-3xl bg-amber-500 hover:bg-amber-400 text-sm py-0 px-4 font-bold')}>
                    Kerjakan Lagi
                </Button>
            </div>
        ),
    },
];