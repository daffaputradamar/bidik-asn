import Sidebar from "@/components/sidebar/sidebar";
import SidebarToggler from "@/components/sidebar/sidebar-toggler";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <SidebarToggler />
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              {/* Notification icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
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

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="container mx-auto space-y-6">
            <Card className="bg-indigo-700 text-white">
              <CardContent className="flex items-center justify-between p-6">
                <CaretLeft className="w-6 h-6" />
                <h2 className="text-2xl font-bold">SPACE IKLAN</h2>
                <CaretRight className="w-6 h-6" />
              </CardContent>
            </Card>

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
      </div>
    </div>
  );
}
