"use client";
import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  CreateExpenseCategoryAction,
  type ExpenseCategoryReturn,
} from "@/servers/expenses-action";

const initialState: ExpenseCategoryReturn = {
  success: false,
  message: "",
};

export default function CreateExpenseCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  console.log("KEY: ", formKey);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setFormKey((prev) => prev + 1);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>+ Kategori Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <Form key={formKey} close={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function Form({ close }: { close: () => void }) {
  const [state, formAction, isPending] = useActionState(
    CreateExpenseCategoryAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        close();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.success, close]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <DialogHeader>
        <DialogTitle>Buat Kategori Baru</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <div className="flex items-center gap-4">
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          id="name"
          name="name"
          className="py-1.5 px-3 rounded-md bg-neutral-200 text-neutral-800/70 w-full"
        />
      </div>
      {state.success ? (
        <p className="text-sm md:text-base font-light text-green-500/70">
          {state.message}
        </p>
      ) : (
        <p className="text-sm md:text-base font-light text-red-500/80">
          {state.message}
        </p>
      )}
      <div className="flex justify-center gap-2 md:gap-4">
        <Button variant={"default"} disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
        <DialogClose>Kembali</DialogClose>
      </div>
    </form>
  );
}
