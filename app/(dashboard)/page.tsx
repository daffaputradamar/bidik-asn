import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BannerCarousel from "./components/BannerCarousel";

export default function Dashboard() {
  return (

    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
      <div className="container mx-auto space-y-6">
        <BannerCarousel />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Riwayat Pengerjaan</CardTitle>
            <Select defaultValue="october">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="october">Oktober</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">Desember</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
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
                  <TableCell>
                    <Button variant="outline" className="mr-2">Statistik & Pembahasan</Button>
                    <Button>Kerjakan Lagi</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tryout Mandiri #20</TableCell>
                  <TableCell>Lulus</TableCell>
                  <TableCell>12.09.2019 - 12:53 PM</TableCell>
                  <TableCell>423</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2">Statistik & Pembahasan</Button>
                    <Button>Kerjakan Lagi</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Belajar dari Youtuber Pilihan</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt={`Youtube thumbnail ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
