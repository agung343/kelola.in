"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "./ui/drawer";
import { GripVertical } from "lucide-react";

export default function Header() {
  return (
    <header className="h-12 md:h-20 p-4 bg-neutral-100 text-neutral-800 rounded-b-md">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <GripVertical />
            </DrawerTrigger>
            <DrawerContent className="p-4 max-w-64">
              <DrawerTitle className="text-2xl font-bold">
                Kelola.in
              </DrawerTitle>
              <hr className="my-2" />
              <div className="flex flex-col gap-4">
                <Navigation />
                <hr className="my-2" />
                <AuthNav />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <h2 className="md:hidden text-2xl font-bold text-blue-800/70">
          Kelola.in
        </h2>
      </div>

      <nav className="hidden md:flex items-center justify-between">
        <Navigation />
        <AuthNav />
      </nav>
    </header>
  );
}

function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex flex-col md:flex-row md:items-center gap-4 text-base">
        <Link
          href={"/"}
          className={pathname === "/" ? "underline font-bold" : undefined}
        >
          Home
        </Link>
        <Link
          href="/layanan"
          className={
            pathname === "/layanan" ? "underline font-bold" : undefined
          }
        >
          Layanan
        </Link>
        <Link
          href="/pricing"
          className={
            pathname === "/pricing" ? "underline font-bold" : undefined
          }
        >
          Pricing
        </Link>
      </ul>
    </>
  );
}

function AuthNav() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-center gap-2 text-base">
      {!session?.user ? (
        <>
          <Link
            href="/auth"
            className="py-2 px-3 bg-sky-400 hover:bg-cyan-400 font-medium md:rounded-md"
          >
            Sign In
          </Link>
        </>
      ) : (
        <>
          <Link href={"/beranda"}>
            {session.user.name || session.user.email}
          </Link>
          <Button
            variant="destructive"
            onClick={async () => {
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/auth");
                  },
                },
              });
            }}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
}
