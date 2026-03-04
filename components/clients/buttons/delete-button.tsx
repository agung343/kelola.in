"use client";
import { DeleteProduct } from "@/servers/product-action";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ id }: { id: string }) {
  return (
    <Button variant="destructive" onClick={() => DeleteProduct(id)} title="Arsipkan">
      <Trash2 />
    </Button>
  );
}
