"use client";
import { RestoreProduct } from "@/servers/product-action";
import { Button } from "../../ui/button";
import { RotateCcw } from "lucide-react";

export default function RestoreProductButton({ id }: { id: string }) {
  return (
    <Button variant="secondary" className="bg-green-500 w-1/2 hover:border-2 hover:border-green-500" onClick={() => RestoreProduct(id)}>
      <RotateCcw size={20} />
      <span className="text-neutral-800">Pulihkan</span>
    </Button>
  );
}
