"use client";
import { upload } from "@imagekit/next";
import { useRef, useState, useActionState } from "react";
import { CreateProduct, type ReturnState } from "@/servers/product-action";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import type { Category } from "./catalog-filter";
import CreateCategory from "./create-category";

const initialState: ReturnState = {
  success: false,
};

interface Props {
  mode: "create" | "edit"
  name?: string
  price?: number
  description?: string
  categories?: Category[]
}

export default function ProductForm({mode, name, price, description, categories}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [state, formAction, isPending] = useActionState(
    CreateProduct,
    initialState
  );

  async function authenticator() {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) {
      throw new Error("Auth Error");
    }
    return res.json();
  }

  async function handleUpload() {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      alert("Please select an imaget");
      return;
    }

    const file = fileInput.files[0];
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Image must be less than 1 MB");
      return;
    }

    const { signature, expire, token, publicKey } = await authenticator();

    const uploadResponse = await upload({
      file,
      fileName: file.name,
      signature,
      expire,
      token,
      publicKey,
      onProgress: (e) => {
        setProgres((e.loaded / e.total) * 100);
      },
    });

    setImageUrl(uploadResponse.url);
  }

  return (
    <form
      action={formAction}
      className="p-4 md:p-8 md:w-1/3 mx-auto shadow shadow-neutral-200 my-8 rounded-md"
    >
      <h1 className="text-lg md:text-4xl font-semibold text-center mb-4 text-blue-800/70">
        Tambah Produk ke Catalog
      </h1>
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm md:text-base">
            Nama Produk/Jasa{" "}
            {state.errors?.name ? (
              <span className="text-sm text-red-400 font-light">
                - {state.errors.name}
              </span>
            ) : (
              <span className="text-sm text-red-400 font-light">
                *wajib di-isi
              </span>
            )}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="py-2 px-4 rounded-md bg-neutral-200 text-neutral-800"
            defaultValue={mode === "edit" ? name : ""}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm md:text-base">
            Harga{" "}
            {state.errors?.price ? (
              <span className="text-sm text-red-400 font-light">
                {state.errors.price}
              </span>
            ) : (
              <span className="text-sm text-red-400 font-light">
                *wajib di-isi
              </span>
            )}
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="py-2 px-4 rounded-md bg-neutral-200 text-neutral-800"
            defaultValue={mode === "edit" ? price : ""}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm md:text-base">
            Category{" "}
            {state.errors?.category ? (
              <span className="text-sm text-red-400 font-light">
                {state.errors.category}
              </span>
            ) : (
              <span className="text-sm text-red-400 font-light">
                *wajib di-isi
              </span>
            )}
          </label>
          <select id="category" name="category" className="py-2 px-4 rounded-md bg-neutral-200 text-neutral-800">
            {categories?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <CreateCategory />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="image" className="text-sm md:text-base">File Image </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              className="py-2 px-4 rounded-md bg-neutral-200 w-32"
            />
            <button
              type="button"
              onClick={handleUpload}
              className="border border-neutral-300 py-2 px-4 rounded-md hover:cursor-pointer hover:bg-neutral-100"
            >
              Upload Image
            </button>
          </div>
          {progres > 0 && <Progress value={progres} className={`w-1/2 ${progres === 100 ? "bg-green-500/80" : "bg-primary/20"}`} />}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm md:text-base">Tentang Produk/Jasa </label>
          <input
            type="text"
            id="description"
            name="description"
            className="py-2 px-4 rounded-md bg-neutral-200 text-neutral-800"
            defaultValue={mode === "edit" ? description : ""}
          />
        </div>
        <input type="hidden" id="imageUrl" name="imageUrl" value={imageUrl} />
        <div className="flex justify-center mt-4">
          <Button
            className="bg-green-400 text-neutral-100 hover:bg-emerald-500 text-xl font-semibold"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Sedang Menyimpan..." : "Tambah Katalog"}
          </Button>
        </div>
      </div>
    </form>
  );
}
