"use client";
import { useActionState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  const [state, formAction, isPending] = useActionState(
    CreateCategoryAction,
    initialState
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>+ Kategori Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction} className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Buat Kategori Baru</DialogTitle>
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
          {state.message && (
            <p className="text-sm font-light text-red-500">{state.message}</p>
          )}
          <div className="flex justify-center">
            <Button variant={"default"} disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
