'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { columns, Tryout } from "./column";
import { DataTable } from "@/components/ui/data-table";

export default function TableRiwayatPengerjaan() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());

    // Sample data
    const data: Tryout[] = [
        {
            tryoutName: "Tryout Akbar Gratis #1",
            status: "Tidak Lulus",
            date: "12.09.2019 - 12:53 PM",
            score: 423,
        },
    ];

    

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold">Riwayat Pengerjaan</CardTitle>
                <div className="flex space-x-4">
                    <Select defaultValue={new Date().getMonth().toString()}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">January</SelectItem>
                            <SelectItem value="1">February</SelectItem>
                            <SelectItem value="2">March</SelectItem>
                            <SelectItem value="3">April</SelectItem>
                            <SelectItem value="4">May</SelectItem>
                            <SelectItem value="5">June</SelectItem>
                            <SelectItem value="6">July</SelectItem>
                            <SelectItem value="7">August</SelectItem>
                            <SelectItem value="8">September</SelectItem>
                            <SelectItem value="9">October</SelectItem>
                            <SelectItem value="10">November</SelectItem>
                            <SelectItem value="11">December</SelectItem>
                        </SelectContent>
                    </Select>

                    <YearSelector currentYear={currentYear} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                </div>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}


const YearSelector = ({ currentYear, selectedYear, setSelectedYear }: { currentYear: number, selectedYear: string, setSelectedYear: Dispatch<SetStateAction<string>> }) => {
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const generateYears = () => {
            const startYear = 2024;
            const numberOfYears = 2;

            const endYear = Math.max(currentYear, startYear + numberOfYears - 1) + 1;
            const generatedYears = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
            setYears(generatedYears);
        };

        generateYears();
    }, [currentYear]);

    return (
        <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
