"use client";
import { useState } from "react";

export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopyLink() {
    const url = `${window.location.origin}/catalog/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(slug);

    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <button
      className="bg-blue-500/50 py-1.5 px-2 md:py-2 md:px-4 border border-neutral-200 rounded-md text-sm md:text-lg font-medium active:bg-blue-500"
      onClick={() => handleCopyLink()}
    >
        {copied === slug ? "Tersalin" : "Salin Link"}
    </button>
  );
}
