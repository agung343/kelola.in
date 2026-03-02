import Image from "next/image";
import Link from "next/link";
import ProductList from "@/components/product-list";
import { useGetSession } from "@/lib/useGetSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PenLine } from "lucide-react";
import DeleteProductButton from "@/components/clients/delete-button";

export default async function BusinessProductCatalog() {
  const session = await useGetSession();
  const userId = session!.user.id;
  const business = await prisma.business.findUnique({
    where: {
      ownerId: userId,
    },
  });
  if (!business || !business.isOnBoarding) {
    redirect(`/profile/${userId}`);
  }

  const products = await prisma.product.findMany({
    where: {
      userId: userId,
      isActive: true,
    },
  });
  if (products.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl text-red-500/70">
          Kamu belum menambahkan product ke catalog
        </h1>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-8 ">
      <div className="flex flex-col md:flex-row gap-y-2 md:items-center justify-between sticky top-12 md:top-20 z-40 bg-zinc-50 py-2">
        <h1 className="text-lg md:text-4xl font-semibold text-neutral-800/70">
          Katalog Produk:
        </h1>
        <div className="flex items-center gap-2.5">
          <Link
            href={`/product/create-catalog`}
            className="bg-emerald-300 py-1.5 px-2 md:py-2 md:px-4 rounded-md text-sm md:text-lg font-medium active:bg-green-300"
          >
            + Tambah Produk
          </Link>
          <Link
            href={`/product/archieve`}
            className="bg-red-400 text-neutral-100 py-1.5 px-2 md:py-2 md:px-4 rounded-md text-sm md:text-lg font-medium active:bg-red-500"
          >
            Lihat Arsip
          </Link>
        </div>
      </div>

      <ProductList mode="user" products={products} />
    </main>
  );
}
