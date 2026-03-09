import Link from "next/link";
import BackToTop from "@/components/clients/buttons/back-to-top";
import { RupiahFormat } from "@/lib/indonesian-format";

export default function PricingPage() {
  return (
    <main className="min-h-screen font-sans p-4 md:p-8 mt-8">
      <div className="flex flex-col justify-center p-2 border-b border-neutral-500/50">
        <h1 className="text-2xl md:text-4xl text-neutral-800/70 font-medium text-center font-fraunces">
          Gratis, Early Access
        </h1>
        <h2 className="md:text-2xl font-light text-center">
          <span className="text-blue-500/70 font-bold">Kelola.in</span> sedang
          dalam periode Early Access. Semua fitur bisa kamu gunakan tanpa batas,
          tanpa biaya - selama periode early access.
        </h2>
      </div>
      <div className="flex items-center justify-center p-4 md:p-8 lg:p-16 xl:p-32">
        <main className="p-4 md:p-8 rounded-md bg-zinc-100 flex flex-col gap-2 md:gap-4 border border-neutral-800">
          <div className="mb-4 border-b border-blue-500/50">
            <h1 className="font-bold font-fraunces text-center text-blue-500/70">
              EARLY ACCESS
            </h1>
            <h1 className="text-2xl text-center font-bold text-neutral-800 mb-2">
              {RupiahFormat(0)}
            </h1>
          </div>

          <div className="flex flex-col items-start gap-2 md:gap-4 text-sm">
            <p className="font-semibold md:text-base">Fitur yang termasuk:</p>
            <ul className="list-none space-y-2.5 md:space-y-4 font-light">
              <li>✓ Katalog produk tanpa batas</li>
              <li>✓ Link katalog yang bisa dibagikan</li>
              <li>✓ Tracking & manajemen orderan</li>
              <li>✓ Dashboard pesanan</li>
              <li>✓ Direct message otomatis ke WhatsApp</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Link
              href={"/auth"}
              className="bg-blue-500/70 py-1.5 px-3 text-sm text-zinc-800/70 text-shadow-2xs rounded-md shadow-2xl font-medium active:bg-blue-500"
            >
              Mulai Gratis Sekarang!
            </Link>
          </div>
        </main>
      </div>
      <BackToTop />
    </main>
  );
}
