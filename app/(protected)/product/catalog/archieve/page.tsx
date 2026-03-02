import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { useGetSession } from "@/lib/useGetSession";
import ProductList from "@/components/product-list";

export default async function DeletedProduct() {
    const session = await useGetSession()
    const userId = session!.user.id

    const products = await prisma.product.findMany({
        where: {
            userId,
            isActive: false
        }
    })

    if (products.length === 0) {
        return (
            <h1 className="mt-4 text-2xl md:text-4xl text-center text-neutral-800/70">
                Tidak produk yang terhapus
            </h1>
        )
    }

    return (
        <main className="p-4 md:p-8 min-h-screen">
            <ProductList mode="deleted" products={products} />
        </main>
    )
}