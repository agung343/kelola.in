"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Item {
  label: string;
  href: string;
}

export default function NavDropDown({ label, items }: {label: string, items: Item[]}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex items-center z-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {isOpen && (<>
        <div className="absolute left-0 max-w-32 rounded-md bg-neutral-100 z-50 shadow-white">
            <ul className="py-1">
                {items.map(item => (
                    <li key={item.label}>
                        <Link href={item.href} onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-neutral-200">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
      </>)}
    </div>
  );
}
