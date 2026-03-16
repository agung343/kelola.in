import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { useGetSession } from "@/lib/useGetSession";
import ExpensesTable from "@/components/clients/expenses-table";

export default async function BookingKeepPage() {
  const session = await useGetSession();
  const user = session!.user;
  const business = await prisma.business.findUnique({
    where: {
      ownerId: user.id,
    },
  });
  if (!business) {
    redirect(`/profile/${user.id}`);
  }

  const expensesResult = await prisma.expenses.findMany({
    where: {
      businessId: business.id,
    },
    include: {
      expensesCategory: {
        select: {
          name: true,
        },
      },
      items: {
        omit: {
          expenseId: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const expenses = expensesResult.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.expensesCategory.name,
    date: item.createdAt,
    totalAmount: item.totalAmount,
    details: item.items.map(i => ({
      id: i.id,
      detail: i.detail,
      amount: i.amount
    }))
  }));

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-16 xl:p-24">
      <div className="flex items-center my-6">
        <Link
          href={"/expenses/new-expense"}
          className="text-blue-500/50 active:text-blue-500 active:underline"
        >
          Catat Pengeluaran
        </Link>
      </div>
      {expenses.length > 0 ? (
        <div className="my-8">
          <ExpensesTable expenses={expenses} />
        </div>
      ) : (
        <h1 className="text-lg text-center font-semibold">
          Kamu belum mencatat pengeluaran.
        </h1>
      )}
    </main>
  );
}
