'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

export default function TableRiwayatPengerjaan() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold">Riwayat Pengerjaan</CardTitle>
                <div className="flex space-x-4">
                    {/* Month Selector */}
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
                <Table className="w-full">
                    <TableHeader className="bg-gray-100/60 text-base">
                        <TableRow>
                            <TableHead>Pengerjaan Tryout</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Nilai</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Tryout Akbar Gratis #1</TableCell>
                            <TableCell>Tidak Lulus</TableCell>
                            <TableCell>12.09.2019 - 12:53 PM</TableCell>
                            <TableCell>423</TableCell>
                            <TableCell className="gap-5 flex flex-col md:flex-row">
                                <Button className={cn(badgeVariants(), 'rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-sm py-0 px-4 font-bold')}>Statistik & Pembahasan</Button>
                                <Button className={cn(badgeVariants(), 'rounded-3xl bg-accent hover:bg-accent/60 text-sm py-0 px-4 font-bold')}>Kerjakan Lagi</Button> 
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tryout Mandiri #20</TableCell>
                            <TableCell>Lulus</TableCell>
                            <TableCell>12.09.2019 - 12:53 PM</TableCell>
                            <TableCell>423</TableCell>
                            <TableCell className="gap-5 flex flex-col md:flex-row">
                                <Button className={cn(badgeVariants(), 'rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-sm py-0 px-4 font-bold')}>Statistik & Pembahasan</Button>
                                <Button className={cn(badgeVariants(), 'rounded-3xl bg-accent hover:bg-accent/60 text-sm py-0 px-4 font-bold')}>Kerjakan Lagi</Button> 
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}


const YearSelector = ({ currentYear, selectedYear, setSelectedYear } : { currentYear: number, selectedYear: string, setSelectedYear: Dispatch<SetStateAction<string>> }) => {
  
    const [years, setYears] = useState<number[]>([]);
    
    useEffect(() => {
        const generateYears = () => {
          const startYear = 2024;
          const numberOfYears = 2;
    
          // If the current year is greater than 2024 + 4 (last year in the default range),
          // extend the range so that it covers the current year and 5 more years.
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