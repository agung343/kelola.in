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
      {notCompleted && (
        <div className="text-red-600 border-2 w-lg border-red-500 text-sm font-medium p-1.5">
          <p className="text-center">
            Click{" "}
            <Link
              href={`/profile/${user!.id}/edit`}
              className="text-blue-500 hover:underline"
            >
              here{" "}
            </Link>
            to Update Your Business Profile, unlock productivity booster!
          </p>
        </div>
      )}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">
          Profil Usaha
        </h1>
        <p className="text-lg">
          Name:{" "}
          <span className="font-semibold">
            {business?.name ?? "Kamu belum simpan nama usaha"}
          </span>
        </p>
        <p className="text-lg">
          Nomer Whatsapp:{" "}
          <span className="font-semibold">
            {business?.whatsAppNumber ?? "Nomer Whatsapp belum disimpan"}
          </span>
        </p>
        <p className="text-lg">
          Instagram:{" "}
          <span className="font-semibold">
            {business?.instagramAccount ?? null}
          </span>
        </p>
        <p className="text-lg">
          Tiktok:{" "}
          <span className="font-semibold">
            {business?.tiktokAccount ?? null}
          </span>
        </p>
        <p className="text-lg">
          Tentang Usaha:{" "}
          <span className="font-semibold">{business?.description ?? null}</span>
        </p>
        <p className="text-lg">
          Alamat Usaha:{" "}
          <span className="font-semibold">{business?.address ?? null}</span>
        </p>
      </div>
      <Link href={`/profile/${user!.id}/edit`} className="py-2 px-4 rounded-md text-lg bg-blue-400">
        Update Profil
      </Link>
    </div>
  );
}
