"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "@/lib/useDebounceCallback";

export default function NameFilter({url, placeholder}: {url: string, placeholder: string}) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const search = useDebounceCallback((value: string) => {
    const searchParams = new URLSearchParams();
    if (value.trim().length > 0) {
      searchParams.set("name", value);
    }
    router.replace(`/${url}?${searchParams.toString()}`);
  }, 500);

  function handleSearch(value: string) {
    setQuery(value);
    search(value);
  }

  return (
    <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base mt-2 md:mt-4">
      <input
        type="type"
        name="name"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="py-1.5 px-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-800/50"
      />
      <button
        type="button"
        onClick={() => {
          setQuery("");
          router.replace(`/${url}`);
        }}
        className="p-2 rounded-lg border border-red-500 bg-gray-300"
      >
        Reset
      </button>
    </div>
  );
}
