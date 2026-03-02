import Image from "next/image";
import Link from "next/link";
import { PenLine } from "lucide-react";
import DeleteProductButton from "./clients/delete-button";
import { Button } from "./ui/button";
import RestoreProductButton from "./clients/restore-button";

interface Props {
  products: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    price: number;
    description?: string | null;
  }[];
  categories?: {
    id: string
    name: string
  }[]

  mode: "order" | "user" | "catalog" | "deleted";
}

export default function ProductList({ products,categories= [], mode }: Props) {
  return (
    <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-fr justify-items-center md:place-items-center mt-4">
      {products.map((item) => (
        <div
          className="flex flex-col gap-y-2 h-full w-72 md:w-sm p-4 shadow-md border border-neutral-200/50 shadow-neutral-200 rounded-md"
          key={item.id}
        >
          <h2 className="text-xl font-bold text-neutral-800/70">{item.name}</h2>
          <Image
            src={item?.imageUrl ?? ""}
            height={320}
            width={320}
            alt={item?.description ?? ""}
            className="rounded-lg w-full h-full md:h-96 object-cover"
          />
          <h2 className="text-lg font-semibold text-neutral-800/70">
            Rp {item.price}
          </h2>
          <div className="flex-1">
            <p className="font-light text-sm">
              Tentang Produk:{" "}
              <span className="font-semibold">{item.description}</span>
            </p>
          </div>
          {mode === "user" && (
            <div className="flex items-center justify-end gap-4">
              <Link
                href={`/product/${item.slug}/edit`}
                className="bg-neutral-200 p-2 rounded-md"
                title="Edit"
              >
                <PenLine size={20} />
              </Link>
              <DeleteProductButton id={item.id} />
            </div>
          )}
          {mode === "order" && (
            <div className="flex items-center justify-center">
              <Button variant={"secondary"}>Order</Button>
            </div>
          )}
          {mode === "deleted" && (
            <div className="flex justify-center">
              <RestoreProductButton id={item.id} />
            </div>
          )}
          {mode === "catalog" && null}
        </div>
      ))}
    </div>
  );
}
