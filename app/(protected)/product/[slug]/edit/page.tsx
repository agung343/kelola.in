import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import ProductForm from "@/components/clients/product-form";

export default async function EditCatalog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const userId = session!.user.id
  const product = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
      userId
    }
  })
  if (!product) {
    return;
  }
 

  return (
    <main className="p-4 md:p-8 ">
      <ProductForm mode="edit" name={product.name} price={product.price} description={product.description ?? ""} />
    </main>
  );
}
