import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const business = await prisma.business.findUnique({
    where: {
      ownerId: session!.user.id,
    },
    select: {
      isOnBoarding: true,
    },
  });
  const notCompleted = !business || !business.isOnBoarding;

  return (
    <main className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Halo {session?.user.name}</h1>
      {notCompleted ? (
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="md:text-lg">
            Profil usaha kamu belum tersimpan{" "}
            <Link
              href={`/profile/${user?.id}/edit`}
              className="md:text-lg text-blue-500/50 underline active:bg-blue-500"
            >
               Klik disini{" "}
            </Link>
            untuk menyimpan profil usaha
          </p>
        </div>
      ) : (
        <div className="my-2 md:my-4 flex flex-col gap-2 md:gap-4">
          <p className="md:text-lg">Profil usaha kamu telah tersimpan</p>
          <p className="md:text-lg">
            Buat katalog produk baru{" "}
            <Link href={`/product/create-catalog`} className="text-blue-500 underline">klik</Link> atau klik{" "}
            <Link href={"/order"} className="text-blue-500 underline">Order</Link> untuk melihat histori pemesanan
          </p>
        </div>
      )}
    </main>
  );
}
