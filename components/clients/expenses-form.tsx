"use client";

import { useActionState, useState } from "react";
import CreateExpenseCategory from "./expense-category";
import { RupiahFormat } from "@/lib/indonesian-format";
import {
  AddNewExpensesAction,
  type ExpenseReturn,
} from "@/servers/expenses-action";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

type ExpensesItems = {
  items: {
    detail: string;
    amount: number;
  }[];
};

const initialState: ExpenseReturn = {
  success: false,
};

export default function ExpenseForm({ categories }: Props) {
  const [expenseDetail, setExpenseDetail] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expensesItems, setExpensesItems] = useState<ExpensesItems["items"]>(
    []
  );

  const [state, formAction, isPending] = useActionState(
    AddNewExpensesAction,
    initialState
  );

  function handleAddExpenseItem() {
    if (!expenseDetail.trim() || expenseAmount <= 0) return;

    setExpensesItems((prev) => [
      ...prev,
      { detail: expenseDetail, amount: expenseAmount },
    ]);

    setExpenseDetail("");
    setExpenseAmount(0);
  }

  return (
    <main className="p-4 md:p-8">
      <form className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 border rounded-md shadow-md" action={formAction}>
        <h1 className="text-center text-xl font-semibold mb-4">
          Buat Catatan Pengeluaran Baru
        </h1>
        <div className="flex flex-col gap-2 md:gap-4">
          <label htmlFor="title" className="text-sm md:text-base">
            Judul{" "}
            {state.errors?.title ? (
              <span className="text-red-500/50 text-xs font-extralight">
                {state.errors.title}
              </span>
            ) : (
              <span className="text-red-500/50 text-xs font-extralight">
                *wajib di-isi
              </span>
            )}
          </label>
          <input
            type="text"
            name="title"
            className="py-1.5 px-3 rounded-md border"
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <label htmlFor="category" className="text-sm md:text-base">
            Kategori{" "}
            {state.errors?.category ? (
              <span className="text-red-500/50 text-xs font-extralight">
                {state.errors.category}
              </span>
            ) : (
              <span className="text-red-500/50 text-xs font-extralight">
                *pilih salah satu kategori
              </span>
            )}
          </label>
          <select
            name="category"
            className="py-1.5 px-3 rounded-md bg-neutral-200 border border-neutral-800/50 shadow-xs"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <CreateExpenseCategory />
        </div>
        <div className="space-y-2 md:space-y-4">
          <p className="text-sm">
            Detail{" "}
            {state.errors?.items && (
              <span className="text-red-500/50 text-xs font-extralight">
                {state.errors.items}
              </span>
            )}
          </p>
          <div className="flex flex-col items-start gap-2 md:gap-4">
            <div className="flex flex-col justify-between gap-2 md:gap-4 w-full">
              <input
                type="text"
                name="detail"
                className="py-1.5 text-sm px-3 rounded-md border bg-neutral-200/50 w-full"
                placeholder="detail pengeluaran..."
                value={expenseDetail}
                onChange={(e) => setExpenseDetail(e.target.value)}
              />
              <input
                type="text"
                name="amount"
                className="py-1.5 text-sm px-3 rounded-md border bg-neutral-200/50 w-3/5"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(+e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                type="button"
                className="bg-green-300 py-1.5 px-2.5 text-sm text-neutral-800/50 rounded-md border active:bg-green-500 active:text-neutral-800 w-1/2"
                onClick={handleAddExpenseItem}
              >
                Tambah Detail
              </button>
            </div>
          </div>
          <ul className="bg-zinc-50 min-h-2 p-2 rounded-md list-disc list-inside">
            {expensesItems.map((item) => (
              <li className="text-sm font-light" key={item.detail}>
                {item.detail} - {RupiahFormat(item.amount)}
              </li>
            ))}
          </ul>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(expensesItems)}
          />
        </div>
        <div className="flex justify-center gap-2 md:gap-4">
          <button
            type="submit"
            className="bg-blue-500/70 py-2 px-4 rounded-md active:bg-blue-500 text-sm font-semibold text-zinc-200 disabled:bg-gray-700/50"
            disabled={isPending}
          >
            {isPending ? "Sedang Menyimpan" : "Tambah Pengeluaran Baru"}
          </button>
        </div>
      </form>
    </main>
  );
}
