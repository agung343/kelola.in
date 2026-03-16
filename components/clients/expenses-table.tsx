"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import ExpenseDetail from "./expense-detail";
import { RupiahFormat, DateFormat } from "@/lib/indonesian-format";

interface Props {
  expenses: {
    id: string;
    title: string;
    category: string;
    totalAmount: number;
    date: Date;
    details: {
      id: string;
      detail: string;
      amount: number;
    }[];
  }[];
}

export default function ExpensesTable({ expenses }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead className="text-center">Tanggal</TableHead>
          <TableHead>Total Biaya</TableHead>
          <TableHead>More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{DateFormat(item.date)}</TableCell>
            <TableCell>{RupiahFormat(item.totalAmount)}</TableCell>
            <TableCell>
              <ExpenseDetail
                title={item.title}
                category={item.category}
                date={item.date}
                totalAmount={item.totalAmount}
                details={item.details}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
