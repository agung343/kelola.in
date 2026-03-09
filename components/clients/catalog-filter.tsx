"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type Category = {
  id: string;
  name: string;
};

export default function CatalogFilter({
  slug,
  categories,
  mode,
}: {
  slug?: string;
  categories: Category[];
  mode: "user" | "client";
}) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

  function handleSearch(e: React.SubmitEvent) {
    e.preventDefault();

    const searchParams = new URLSearchParams();

    if (category && category !== "all") {
      searchParams.set("category", category);
    }
    if (query.trim().length > 0) {
      searchParams.set("search", query);
    }
    
    if (mode === "client") {
      router.push(`/catalog/${slug}?${searchParams.toString()}`);
    } else {
      router.push(`/order/add-order?${searchParams.toString()}`)
    }
  }

  return (
    <form
      method="GET"
      className="flex flex-col md:flex-row md:items-center gap-2 text-sm mt-2 md:mt-4"
      onSubmit={handleSearch}
    >
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="py-1.5 px-3 rounded-md bg-neutral-200 text-neutral-800"
      >
        <option value={"all"}>Semua kategori...</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="search"
        placeholder="cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-1.5 px-3 rounded-md bg-neutral-200 text-neutral-800"
      />
      <button className="border border-green-500 py-1.5 px-3 rounded-md">
        Cari
      </button>
    </form>
  );
}
