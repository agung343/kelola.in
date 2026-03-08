import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const business = await prisma.business.findUnique({
    where: {
      ownerId: user?.id,
    },
  });

  const notCompleted = !business || !business.isOnBoarding;
  return (
    <div className="md:w-full p-8">
      <h1 className="text-2xl font-semibold text-neutral-800/70 text-center">
        Profil Usaha
      </h1>
      {notCompleted && (
        <div className="text-red-600 border-2 md:w-lg border-red-500 text-sm font-medium p-1.5 rounded-xl my-2 md:my-4">
          <p className="md:text-center text-xs font-extralight text-wrap">
            Kamu belum menyimpan profil usaha, segera update profil usaha biar
            bisa buat katalog produk dan tracking histori pesanan
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex flex-col md:gap-2 md:text-lg">
          <p className="font-light text-neutral-800/50">Nama Usaha</p>
          <p className="font-semibold text-neutral-800">
            {business?.name ?? "Nama usaha belum tersimpan"}
          </p>
        </div>
        <div className="flex flex-col md:gap-2 md:text-lg">
          <p className="font-light text-neutral-800/50">Nomer Whatsapp</p>
          <p className="font-semibold text-neutral-800">
            {business?.whatsAppNumber ?? "Nomer Whatsapp belum tersimpan"}
          </p>
        </div>
        <div className="flex flex-col md:gap-2 md:text-lg">
          <p className="font-light text-neutral-800/50">Alamat</p>
          <p className="font-semibold text-neutral-800">
            {business?.address ?? "Alamat belum tersimpan"}
          </p>
        </div>
        <div className="flex flex-col md:gap-2 md:text-lg">
          <p className="font-light text-neutral-800/50">Tentang Usaha</p>
          <p className="font-semibold text-neutral-800">
            {business?.description ?? (
              <span className="font-light text-neutral-800/50">
                Ceritakan profil usaha, syarat dan ketentuan pemesanan, dan
                lain-lain untuk menarik pelanggan
              </span>
            )}
          </p>
        </div>

        <h2 className="text-lg font-semibold underline text-sky-600">
          Social Media
        </h2>
        <div className="flex flex-col md:gap-2 md:text-lg">
          <p className="font-light text-neutral-800/50">Instagram</p>
          <p className="font-semibold text-neutral-800">
            {business?.instagramAccount ?? "-"}
          </p>
        </div>
        <div className="flex flex-col md:gap-2 md:text-lg">
          <p className="font-light text-neutral-800/50">Tiktok</p>
          <p className="font-semibold text-neutral-800">
            {business?.tiktokAccount ?? "-"}
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href={`/profile/${user!.id}/edit`}
            className="py-2 px-4 rounded-md text-lg bg-blue-400 my-2 md:my-4"
          >
            Update Profil
          </Link>
        </div>
      </div>
    </div>
  );
}
