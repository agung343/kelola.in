import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { useGetSession } from "@/lib/useGetSession";
import ExpenseForm from "@/components/clients/expenses-form";

export default async function AddExpensesPage() {
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

  const expensesCategory = await prisma.expensesCategory.findMany({
    where: {
      businessId: business.id,
    },
  });

  return (
    <ExpenseForm categories={expensesCategory} />
  )
}
