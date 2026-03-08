"use client";
import { useActionState } from "react";
import type { ProfileFormState } from "@/types/profile";
import { BusinessProfileAction } from "@/servers/profile-action";
import { Button } from "../ui/button";

const initialState: ProfileFormState = {
  success: false,
};

export default function EditBusiness({
  name,
  whatsapp,
}: {
  name: string;
  whatsapp: string;
}) {
  const [state, formAction, isPending] = useActionState(
    BusinessProfileAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="p-4 md:p-8 md:w-1/3 mx-auto shadow rounded-md shadow-neutral-200 my-8"
    >
      <h1 className="text-2xl md:text-4xl text-center font-bold mb-8 text-neutral-800">
        Profile Usaha
      </h1>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">
            Nama Bisnis/Usaha{" "}
            <span className="text-red-600 text-xs">* wajib diisi</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-neutral-200 py-2 px-4 rounded-md"
            defaultValue={name}
          />
          {state.errors?.name && (
            <p className="text-xs font-extralight text-red-600">
              {state.errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="whatsapp">
            Nomer WhatsApp{" "}
            <span className="text-red-600 text-xs">* wajib diisi</span>
          </label>
          <input
            type="text"
            id="whatsAppNumber"
            name="whatsAppNumber"
            className="bg-neutral-200 py-2 px-4 rounded-md"
            defaultValue={whatsapp}
          />
          {state.errors?.whatsAppNumber && (
            <p className="text-xs font-extralight text-red-600">
              {state.errors.whatsAppNumber}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            id="instagramAccount"
            name="instagramAccount"
            className="bg-neutral-200 py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tiktok">Tiktok</label>
          <input
            type="text"
            id="tiktokAccount"
            name="tiktokAccount"
            className="bg-neutral-200 py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Tentang Bisnis/Usaha</label>
          <input
            type="text"
            id="description"
            name="description"
            className="bg-neutral-200 py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address">Alamat Usaha</label>
          <input
            type="text"
            id="address"
            name="address"
            className="bg-neutral-200 py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={isPending} className="text-lg bg-emerald-500 hover:cursor-pointer">
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  );
}
