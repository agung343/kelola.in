"use client";
import { useCartStore } from "@/store/cart-context";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function CartButton() {
  const { items, addItem, reduceItem, clearItem, clearCart } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-20 right-6 md:hidden bg-pink-600/90 backdrop-blur-md p-2 rounded-full shadow-xl">
        <ShoppingCart size={20} />
        <div className="relative">
          <span className="absolute -bottom-3 -right-3 px-1 border border-white rounded-full text-xs font-light bg-pink-400">
            {totalItems}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Keranjang</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          {items.length === 0 && (
            <h2 className="text-sm font-medium text-center">
              Keranjang masih kosong
            </h2>
          )}
          {items.map((item) => (
            <div className="space-y-2" key={item.id}>
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-sm font-medium">{item.name}</p>
                  <div className="flex justify-between">
                    <p className="text-sm font-extralight">
                      {item.quantity} x {item.price}
                    </p>
                    <p className="text-sm">{item.quantity * item.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 text-sm font-light">
                    <button
                      type="button"
                      className="bg-neutral-200 px-1 rounded-md"
                      onClick={() => reduceItem(item.id)}
                    >
                      -
                    </button>
                    <span className="text-xs font-light">{item.quantity}</span>
                    <button
                      type="button"
                      className="bg-neutral-200 px-1 rounded-md"
                      onClick={() => addItem(item)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 p-1 rounded-md"
                    onClick={() => clearItem(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => clearCart()} className="bg-red-400 w-1/2 mx-auto mt-3 text-zinc-50 rounded-2xl">Hapus Semua</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
