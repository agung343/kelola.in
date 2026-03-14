"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import UserHeader from "@/components/user-header";
import Footer from "@/components/footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
   if (!isPending && !session?.user) {
    router.replace("/")
   }
  }, [session, isPending, router]);

  if (isPending) return null

  if (!session?.user) return null

  return (<>
    <div className="font-dm_Sans min-h-[97.7vh]">
      <UserHeader />
      {children}
    </div>
    <Footer />
  </>);
}
