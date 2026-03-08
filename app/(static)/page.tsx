import Link from "next/link";
import BackToTop from "@/components/clients/buttons/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen font-sans dark:bg-black">
      <div className="space-y-4 mt-8">
        <h1 className="text-4xl md:text-6xl text-center font-bold text-blue-500/70">
          Kelola.in
        </h1>
        <h2 className="text-xl md:text-3xl text-center font-medium">
          Kelola semua order dari Whatsapp dan DM Social Media di satu tempat.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <Link
          href={"/auth"}
          className="bg-emerald-400 py-2 px-4 rounded-lg text-lg font-medium hover:bg-green-400 active:bg-green-400"
        >
          Mulai Sekarang!
        </Link>
        <Link
          href={"/layanan"}
          className="bg-transparent border border-neutral-500 py-2 px-4 rounded-lg text-lg font-medium hover:bg-violet-200 active:bg-violet-200"
        >
          Cari tahu lebih
        </Link>
      </div>

      <section id="layanan" className="mt-8 md:mt-12 p-4 md:p-8 mx-auto md:flex md:flex-col md:items-center">
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold text-orange-500/70">
              Upgrade cara jualan di Whatsapp
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Kami sadar Whatsapp kamu adalah pilar utama usaha. Buat orderan dari Whatsapp lebih rapi dan terkelola.
            </p>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold text-orange-500/70">
              Buat katalog dan bagikan link 
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Pembeli bisa memilih, memasukan keranjang dan checkout, pesan otomatis akan tersampaikan ke kamu.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold text-orange-500/70">
              Pantau Orderan dari Whatsapp
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Riwayat orderan dari chat Whatsapp lebih rapi dan tandai mana yang sudah selesai ataupun dibatalkan.
            </p>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  );
}
