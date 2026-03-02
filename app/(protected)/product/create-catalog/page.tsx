import { useGetSession } from "@/lib/useGetSession"
import ProductForm from "@/components/clients/product-form"
import prisma from "@/lib/prisma"

export default async function CreateCatalogPage() {
    const session = await useGetSession()
    const user = session?.user
    const business = await prisma.business.findUnique({
        where: {id: user?.id},
        select: {id: true}
    })
    const categories = await prisma.category.findMany({
        where: {
            businessId: business?.id
        }
    })

    return (
        <main className="w-full p-4">
            <ProductForm mode="create" categories={categories} />
        </main>
    )
} 