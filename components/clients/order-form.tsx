"use client";
import { useActionState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { useCartStore } from "@/store/cart-context";
import {
  CreateNewOrder,
  AddOrderAction,
  type OrderState,
} from "@/servers/order-action";
import { ShoppingCart } from "lucide-react";

interface Props {
  slug: string;
  mode: "user" | "client";
}

const initialState: OrderState = {
  success: false,
};

export default function OrderForm({ slug, mode }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const { items, getTotal, clearCart } = useCartStore();

  const createOrderWithSlug = CreateNewOrder.bind(null, slug);
  const addOrderWithSlug = AddOrderAction.bind(null, slug);
  const action =
    mode == "client" ? createOrderWithSlug : addOrderWithSlug;
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success && state.waUrl) {
      clearCart();
      formRef.current?.reset()
      window.location.href = state.waUrl;
    }
  }, [state.success, state.waUrl, clearCart]);

  const totalAmount = getTotal();

  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-20 left-6 bg-red-500 md:hidden backdrop-blur-md p-2 rounded-full shadow-xl">
        <ShoppingCart size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={formAction} className="text-sm space-y-2" ref={formRef}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <label htmlFor="name">
              Nama{" "}
              {state.errors?.name ? (
                <span className="text-red-500/70 text-xs">
                  {state.errors.name}
                </span>
              ) : (
                <span className="text-red-500/70 text-xs">*wajib di-isi</span>
              )}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="py-1.5 px-3 rounded-md border w-fit md:w-full bg-neutral-200 text-neutral-800/70"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <label htmlFor="whatsAppNumber">
              Nomer Telepon/Whatsapp{" "}
              {state.errors?.whatsAppNumber ? (
                <span className="text-red-500/70 text-xs">
                  {state.errors.whatsAppNumber}
                </span>
              ) : (
                <span className="text-red-500/70 text-xs">*wajib di-isi</span>
              )}
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsAppNumber"
              className="py-1.5 px-3 rounded-md border bg-neutral-200 text-neutral-800/70"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="address">Alamat</label>
            <input
              type="text"
              id="address"
              name="address"
              className="py-1.5 px-3 rounded-md border bg-neutral-200 text-neutral-800/70"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="">Tanggal Pemesanan</label>
            <input
              type="date"
              name="bookingDate"
              className="border border-neutral-200 py-1.5 px-3 rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="items">
              Item{" "}
              {state.errors?.items ? (
                <span className="text-red-500/70 text-xs">
                  {state.errors.items}
                </span>
              ) : (
                <span className="text-red-500/70 text-xs">*wajib di-isi</span>
              )}
            </label>
            <input
              type="hidden"
              id="items"
              name="items"
              value={JSON.stringify(
                items.map((i) => ({
                  id: i.id,
                  quantity: i.quantity,
                }))
              )}
            />
            {!items.length && (
              <p className="text-sm font-bold text-center">
                Keranjang masih kosong, pilih produk di katalog
              </p>
            )}
            {items.map((item) => (
              <div className="flex items-center justify-between" key={item.id}>
                <p className="text-sm">
                  <span className="font-medium">{item.name}</span> X{" "}
                  {item.quantity}
                </p>
                <p className="font-semibold">
                  Rp. {item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="notes">Catatan</label>
            <input
              type="text"
              id="notes"
              name="notes"
              className="py-1.5 px-3 rounded-md border bg-neutral-200 text-neutral-800/70"
            />
          </div>
          <h2 className="text-base">
            Total: <span className="font-bold">Rp. {totalAmount}</span>
          </h2>

          <DialogFooter>
            <DialogClose type="button">Kembali</DialogClose>
            <button
              type="submit"
              className="bg-green-500/70 py-2 px-4 rounded-md active:bg-green-500 disabled:bg-neutral-500"
              disabled={isPending}
            >
              {isPending
                ? "Ordering..."
                : mode === "user"
                ? "Checkout"
                : "Konfirmasi Pesanan"}
            </button>
            {!state.success && (
              <p className="text-sm text-red-500 font-semibold text-center">
                {state.message}
              </p>
            )}
            {state.success && (
              <p className="text-sm font-green-500 font-semibold text-center">
                {state.message}
              </p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
