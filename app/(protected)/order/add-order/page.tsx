import { useGetSession } from "@/lib/useGetSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductList from "@/components/product-list";
import CatalogFilter from "@/components/clients/catalog-filter";
import BackToTop from "@/components/clients/buttons/back-to-top";
import CartButton from "@/components/clients/buttons/cart-button";
import { Prisma } from "@/app/generated/prisma/client";
import OrderForm from "@/components/clients/order-form";

export default async function UserAddOrder({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const category = (await searchParams).category;
  const search = (await searchParams).search;

  const session = await useGetSession()
  if (!session) {
    redirect("/auth")
  }
  const user = session.user

  const business = await prisma.business.findUnique({
    where: {ownerId: user.id},
    select: {
        id: true
    }
  })
  if (!business) {
    redirect("/beranda")
  }

  const categories = await prisma.category.findMany({
    where: { businessId: business.id },
  });

  const where: Prisma.ProductWhereInput = {
    businessId: business.id,
    isActive: true,
  };

  const selectedCategory = await prisma.category.findFirst({
    where: { businessId: business.id, id: category },
  });
  const categoryId = selectedCategory?.id;

  if (category) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: {
      name: "asc"
    }
  });

  return (
    <main className="p-4 md:p-8 space-7-4">
      <h1 className="text-2xl md:text-4xl text-neutral-800/70">
        Buat Order Untuk Pembeli
      </h1>
      <CatalogFilter mode="user" categories={categories} />
      <ProductList products={products} mode="order" />
      <CartButton />
      <BackToTop />
      <OrderForm mode="user" />
    </main>
  );
}
