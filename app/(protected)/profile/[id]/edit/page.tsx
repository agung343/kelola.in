import EditBusiness from "@/components/clients/edit-profile";
import prisma from "@/lib/prisma";

export default async function EditBusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const business = await prisma.business.findUnique({
    where: { id: userId },
  });
  return (
    <main className="w-full mt-4">
        
      <EditBusiness
        name={business?.name ?? ""}
        whatsapp={business?.whatsAppNumber ?? ""}
      />
    </main>
  );
}
