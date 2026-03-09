import Link from "next/link";
import BackToTop from "@/components/clients/buttons/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen font-dm_Sans dark:bg-black p-4 md:p-8">
      <div className="space-y-4 mt-8">
        <h1 className="text-4xl md:text-6xl text-center font-fraunces font-bold text-blue-500/70">
          Kelola.in
        </h1>
        <h2 className="text-xl md:text-3xl text-center font-medium font-fraunces">
          Terima orderan di WhatsApp. Catat, pantau, dan kelola semuanya di Kelola.in
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

      <section id="layanan" className="mt-8 md:mt-12 p-4 mx-auto md:flex md:flex-col md:items-center">
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold font-fraunces text-orange-500/70">
              WhatsApp Terus Jalan, Bisnis Makin Rapi.
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Kelola.in tidak menggantikan Whatsapp! - kami hadir di balik layar agar setiap orderan tercata rapi dan tidak ada yang terlewat.
            </p>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold font-fraunces text-orange-500/70">
              Satu Link Katalog, Pembeli Langsung Bisa Pesan.
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Buat katalog produk dengan foto, harga, dan deskripsi singkat. Bagikan linknya, pembeli pilih barang, checkout dan orderan otomatis masuk lewat pesan WhatsApp.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold font-fraunces text-orange-500/70">
              Semua Orderan Tercatat. Tidak ada yang terlewat.
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Pantau status orderan dari satu dashboard, tandai sebagai diproses, selesai atau dibatalkan tanpa perlu cari chat atau scrool chat panjang.
            </p>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  );
}
