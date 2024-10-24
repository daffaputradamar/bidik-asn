"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { useState } from "react"

import { Column } from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDown, ArrowUp, CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, CaretUpDown } from "@phosphor-icons/react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: { pageIndex, pageSize }
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center md:justify-end items-center space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <CaretDoubleLeft weight="bold" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((pageIndex) => pageIndex - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          <CaretLeft weight="bold" />
        </Button>

        <span className="text-sm font-semibold">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((pageIndex) => pageIndex + 1)}
          disabled={!table.getCanNextPage()}
        >
          <CaretRight weight="bold" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <CaretDoubleRight weight="bold" />
        </Button>
      </div>
    </div>
  )
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn('text-sm', className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="none"
            size="sm"
            className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <span className="font-bold text-sm">{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2" />
            ) : (
              <CaretUpDown className="ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}