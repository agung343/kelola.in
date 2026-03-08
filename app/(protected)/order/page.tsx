import { useGetSession } from "@/lib/useGetSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Prisma } from "@/app/generated/prisma/client";
import NameFilter from "@/components/clients/name-filter";
import BackToTop from "@/components/clients/buttons/back-to-top";
import { RupiahFormat, DateFormat } from "@/lib/indonesian-format";
import OrderDetail from "@/components/clients/order-detail";

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ name: string }>;
}) {
  const session = await useGetSession();
  const user = session!.user;

  const name = (await searchParams).name;

  const business = await prisma.business.findUnique({
    where: {
      ownerId: user.id,
    },
  });
  if (!business || !business.isOnBoarding) {
    redirect(`/profile/${user.id}`);
  }

  const where: Prisma.OrderWhereInput = {
    businessId: business.id,
  };
  if (name) {
    where.customerName = {
      contains: name,
      mode: "insensitive",
    };
  }

  const result = await prisma.order.findMany({
    where,
    omit: {
      updatedAt: true,
      businessId: true,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const orders = result.map((r) => ({
    id: r.id,
    name: r.customerName,
    whatsAppNumber: r.customerPhone,
    status: r.status,
    address: r.customerAddress ?? null,
    bookingDate: r.bookingDate ?? null,
    notes: r.notes ?? null,
    date: r.createdAt,
    totalAmount: r.totalAmount,
    items: r.items.map((i) => ({
      id: i.id,
      qty: i.quantity.toNumber(),
      price: i.price,
      name: i.product.name,
    })),
  }));

  return (
    <main className="p-4 md:p-8">
      <h1 className="text-lg md:text-2xl xl:text-4xl font-bold">
        Order <span className="text-sm">{`(order dari link)`}</span>
      </h1>
      <NameFilter url="order" placeholder="cari name pembeli..." />
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 my-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`flex flex-col p-2.5 md:p-4 rounded-2xl shadow-md shadow-neutral-200 w-72 md:w-md ${
              order.status === "Selesai" && "border border-green-500"
            } ${order.status === "Dibatalkan" && "border border-red-500"}`}
          >
            <p className="font-bold">{order.name}</p>
            <div className="flex items-center justify-between mb-2">
              <p>{DateFormat(order.date)}</p>
              <p>Total: {RupiahFormat(order.totalAmount)}</p>
            </div>

            <OrderDetail order={order} />
          </div>
        ))}
      </div>

      <BackToTop />
    </main>
  );
}
