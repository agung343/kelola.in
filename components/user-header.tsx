"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "./ui/drawer";
import NavDropDown from "./ui/navDropDown";
import { GripVertical } from "lucide-react";

export default function UserHeader() {
  const { data: session } = useSession();
  const user = session!.user;
  return (
    <header className="h-12 md:h-20 p-4  bg-neutral-100 text-neutral-800 rounded-b-md sticky top-0 z-50">
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
              <h1 className="text-xl font-medium">{user.name || user.email}</h1>
              <hr className="my-2" />
              <div className="flex flex-col gap-4">
                <ul className="flex flex-col md:flex-row md:items-center gap-4">
                  <Navigation id={user.id} />
                </ul>
                <AuthNav name={user.name || user.email} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <h2 className="md:hidden text-2xl font-bold text-blue-800/70">
          Kelola.in
        </h2>
      </div>

      <nav className="hidden md:flex items-center justify-between">
        <Navigation id={user.id} />
        <AuthNav name={user.name || user.email} />
      </nav>
    </header>
  );
}

function Navigation({ id }: { id: string }) {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex flex-col md:flex-row md:items-center gap-4">
        <Link
          href="/home"
          className={
            pathname === "/beranda" ? "underline font-bold" : undefined
          }
        >
          Beranda
        </Link>
        <Link
          href={`/profile/${id}`}
          className={
            pathname.startsWith("/profile") ? "underline font-bold" : undefined
          }
        >
          Profile
        </Link>
        <Link
          href="/form"
          className={pathname === "/form" ? "underline font-bold" : undefined}
        >
          Form
        </Link>
        <NavDropDown
          label="Product"
          items={[
            { label: "Buat Catalog", href: "/product/create-catalog" },
            { label: "Lihat Catalog", href: `/product/catalog` },
          ]}
        />
        <Link
          href="/messaging"
          className={
            pathname === "/messaging" ? "underline font-bold" : undefined
          }
        >
          Instant Messaging
        </Link>
      </ul>
    </>
  );
}

function AuthNav({ name }: { name: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-center gap-4">
      <Link href="/home">{name}</Link>
      <Button
        variant={"destructive"}
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
    </div>
  );
}
