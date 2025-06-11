"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Table2Icon } from "lucide-react";
import Link from "next/link";

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  className?: string;
  cell?: (value: any, item: T) => React.ReactNode;
}

interface BaseTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  title?: string;
}

export function BaseTable<T>({
  data,
  columns,
  actions,
  onRowClick,
  title,
}: BaseTableProps<T>) {
  return (
    <div className="border-border rounded-md border bg-white px-6 py-5 shadow">
      {title && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Table2Icon className="size-5" />
            <h1 className="text-lg font-medium">{title}</h1>
          </div>
          <Link
            href="/appointments"
            className="text-muted-foreground text-sm hover:underline"
          >
            Ver todos
          </Link>
        </div>
      )}
      <Table>
        <TableHeader className="bg-blue-50">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={String(column.accessorKey)}
                className={column.className}
              >
                {column.header}
              </TableHead>
            ))}
            {actions && <TableHead className="w-14"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(item)}
              className={cn(onRowClick && "cursor-pointer")}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.accessorKey)}
                  className={column.className}
                >
                  {column.cell
                    ? column.cell(item[column.accessorKey], item)
                    : (item[column.accessorKey] as React.ReactNode)}
                </TableCell>
              ))}
              {actions && (
                <TableCell className="w-14">{actions(item)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
