"use client";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MdExpandMore } from "react-icons/md";
import { RupiahFormat, DateFormat } from "@/lib/indonesian-format";

interface Props {
  details: {
    id: string;
    detail: string;
    amount: number;
  }[];
  title: string;
  totalAmount: number;
  date: Date;
  category: string;
}

export default function ExpenseDetail(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <MdExpandMore />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>
            Kategori: {props.category} - Tanggal: {DateFormat(props.date)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm font-light">
          {props.details.map((d, index) => (
            <div className="flex items-center justify-between w-full" key={d.id}>
                <p>{index+1}. {d.detail}</p>
                <p>{RupiahFormat(d.amount)}</p>
            </div>
          ))}
        </div>
        <p className="text-bold text-right">
          {RupiahFormat(props.totalAmount)}
        </p>
        <DialogFooter>
          <DialogClose>Kembali</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
