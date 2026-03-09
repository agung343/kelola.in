import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductList from "@/components/product-list";
import CatalogFilter from "@/components/clients/catalog-filter";
import BackToTop from "@/components/clients/buttons/back-to-top";
import CartButton from "@/components/clients/buttons/cart-button";
import { Prisma } from "@/app/generated/prisma/client";
import OrderForm from "@/components/clients/order-form";

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const slug = (await params).slug;
  const category = (await searchParams).category;
  const search = (await searchParams).search;

  const business = await prisma.business.findFirst({
    where: {
      slug,
    },
  });
  if (!business) {
    return notFound();
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
        {business.name} catalog:
      </h1>
      <CatalogFilter slug={slug} categories={categories} mode="client" />
      <ProductList products={products} mode="order" />
      <CartButton />
      <BackToTop />
      <OrderForm slug={slug} mode="client" />
    </main>
  );
}
