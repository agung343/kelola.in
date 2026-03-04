"use client";
import { Button } from "../../ui/button";
import { useCartStore } from "@/store/cart-context";
import type { CartItem } from "@/store/cart-context";

interface Props {
    product: {
        id: string
        name: string
        price: number
        imageUrl: string | null
    }
}

export default function AddButton({product}: Props) {
    const {addItem} = useCartStore()
  return (
    <div className="flex items-center justify-center">
      <Button className="bg-green-500" onClick={() => addItem(product)}>
        + Keranjang
      </Button>
    </div>
  );
}
