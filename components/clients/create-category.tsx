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
  CreateCategoryAction,
  type ReturnState,
} from "@/servers/product-action";

const initialState: ReturnState = {
  success: false,
};

export default function CreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    CreateCategoryAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>+ Kategori Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
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
      </DialogContent>
    </Dialog>
  );
}
