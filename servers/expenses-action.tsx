"use server";
import { useGetSession } from "@/lib/useGetSession";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

const expenseCategorySchema = z.object({
  name: z.string().trim().min(1, "Nama Kategori tidak boleh kosong"),
});

const expenseItemSchema = z.object({
  detail: z.string().trim().min(1, "Detail Pengeluaran tidak boleh kosong"),
  amount: z.number().min(1, "Jumlah harus diatas 0"),
});

const expenseSchema = z.object({
  title: z.string().trim().min(1, "Judul tidak boleh kosong"),
  categoryId: z.cuid("Pilih kategori"),
  items: z.array(expenseItemSchema).min(1, "Minimal satu detail pengeluaran"),
  notes: z.string().optional()
});

export type ExpenseCategoryReturn = {
  success: boolean;
  errors?: {
    name?: string;
  };
  message: string;
};

export type ExpenseReturn = {
  success: boolean;
  errors?: {
    title?: string;
    category?: string;
    items?: string;
  };
  message?: string;
};

export async function CreateExpenseCategoryAction(
  prevState: ExpenseCategoryReturn,
  formData: FormData
): Promise<ExpenseCategoryReturn> {
  const session = await useGetSession();
  const user = session!.user;

  const business = await prisma.business.findUnique({
    where: { ownerId: user.id },
  });

  const form = expenseCategorySchema.safeParse({
    name: formData.get("name"),
  });
  if (!form.success) {
    const fieldErrors = form.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
      },
      message: "form tidak valid",
    };
  }

  const existed = await prisma.expensesCategory.findUnique({
    where: {
      businessId_name: {
        businessId: business!.id,
        name: form.data.name,
      },
    },
  });
  if (existed) {
    return {
      success: false,
      message: "Kategori telah ada, gagal membuat baru",
    };
  }

  const slug = slugify(form.data.name, { replacement: "-", lower: true });

  try {
    await prisma.expensesCategory.create({
      data: {
        name: form.data.name,
        slug,
        businessId: business!.id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return {
      success: false,
      message: "Gagal Menyimpan Kategori",
    };
  }

  revalidatePath("/expenses/new-expense");

  return {
    success: true,
    message: "Berhasil menyimpan",
  };
}

export async function AddNewExpensesAction(
  prevState: ExpenseReturn,
  formData: FormData
): Promise<ExpenseReturn> {
  const session = await useGetSession();
  const user = session!.user;

  const business = await prisma.business.findUnique({
    where: { ownerId: user.id },
  });

  const raw = {
    title: formData.get("title") as string,
    categoryId: formData.get("category") as string,
    notes: formData.get("notes")?.toString(),
    items: formData.get("items") ?  JSON.parse(formData.get("items") as string) : []
  }

  const parsed = expenseSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return {
        success: false,
        errors: {
            title: fieldErrors.title?.[0],
            category: fieldErrors.categoryId?.[0],
            items: fieldErrors.items?.[0]
        }
    }
  }

  const parsedItems = parsed.data.items
  let totalAmount = 0;
  const expenseItemData = parsedItems.map(item => {
    totalAmount += item.amount

    return {
        detail: item.detail,
        amount: item.amount
    }
  })

  try {
    await prisma.$transaction(async (tx) => {
        const expense = await tx.expenses.create({
            data: {
                title: parsed.data.title,
                expensesCategoryId: parsed.data.categoryId,
                totalAmount,
                notes: parsed.data.notes,
                businessId: business!.id
            }
        })

        for (const item of expenseItemData) {
            await tx.expensesItem.create({
                data: {
                    ...item,
                    expenseId: expense.id
                }
            })
        }
    })
  } catch (error) {
    console.error("Something went wrong", error)
    return {
        success: false,
        message: "Gagal menyimpan pengeluaran"
    }
  }

  revalidatePath("/expenses")

  redirect("/expenses")
}
