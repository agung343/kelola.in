"use client";
import { useOptimistic, startTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { RupiahFormat, DateFormat } from "@/lib/indonesian-format";
import {
  CanceledOrderAction,
  CompletedOrderAction,
} from "@/servers/order-action";

interface Props {
  order: {
    id: string;
    name: string;
    whatsAppNumber: string;
    date: Date;
    address: string | null;
    bookingDate: Date | null;
    notes: string | null;
    totalAmount: number;
    status: "Dikerjakan" | "Dibatalkan" | "Selesai";
    items: {
      id: string;
      name: string;
      qty: number;
      price: number;
    }[];
  };
}

export default function OrderDetail({ order }: Props) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    order.status,
    (_, newStatus: "Selesai" | "Dibatalkan") => newStatus
  );

  async function handleCancelOrder() {
    startTransition(async () => {
      setOptimisticStatus("Dibatalkan");
      await CanceledOrderAction(order.id);
    });
  }

  async function handleDoneOrder() {
    startTransition(async () => {
      setOptimisticStatus("Selesai");
      await CompletedOrderAction(order.id);
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="border rounded-md w-fit mx-auto px-2 border-neutral-400">Lihat Detail</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {order.name} - {order.whatsAppNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start">
          <p className="text-sm">
            Tanggal Order:{" "}
            <span className="font-bold">{DateFormat(order.date)}</span>
          </p>
          {order.address && (
            <p className="text-sm font-light">
              Alamat: <span className="font-semibold">{order.address}</span>
            </p>
          )}
          {order.bookingDate && (
            <p className="text-sm light">
              Tanggal Pengambilan/Pengiriman:{" "}
              <span className="font-semibold">
                {DateFormat(order.bookingDate)}
              </span>
            </p>
          )}
          {order.notes && (
            <p className="text-sm font-extralight">Catatan: {order.notes}</p>
          )}
          <div className="grid w-full mt-4">
            <h2 className="text-lg font-semibold">Item: </h2>
            {order.items.map((item, index) => (
              <div
                className="flex flex-col justify-center text-sm text-neutral-800"
                key={item.id}
              >
                <p className="font-semibold">
                  <span className="text-neutral-800/50 font-extralight">
                    {index + 1}.{" "}
                  </span>
                  {item.name}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-medium w-36">
                    {RupiahFormat(item.price)}{" "}
                    <span className="font-light">X</span> {item.qty}
                  </p>
                  <p className="font-semibold">
                    {RupiahFormat(item.price * item.qty)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-2 md:mt-4 text-lg md:text-2xl xl:text-4xl font-semibold">
            {RupiahFormat(order.totalAmount)}
          </h2>
          {optimisticStatus === "Dikerjakan" ? (
            <div className="flex items-center justify-center gap-4 mt-2 md:mt-4">
              <button
                className="py-1.5 px-3 rounded-md bg-red-500/70 active:bg-red-500 text-sm md:text-lg"
                onClick={handleCancelOrder}
              >
                Batalkan
              </button>
              <button
                className="py-1.5 px-3 rounded-md bg-green-500/70 active:bg-green-500 text-sm md:text-lg"
                onClick={handleDoneOrder}
              >
                Selesai
              </button>
            </div>
          ) : (
            <h2 className="text-lg">Status: {optimisticStatus}</h2>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
