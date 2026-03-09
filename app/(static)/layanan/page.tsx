import { Metadata } from "next";
import BackToTop from "@/components/clients/buttons/back-to-top";

export const metadata: Metadata = {
  title: "Layanan Kelolal.in",
  description: "Fitur layanan",
};

export default function ServicePage() {
  return (
    <main className="min-h-screen dark:bg-black p-4 md:-p-8 font-dm_Sans">
      <div className="space-y-4 mt-8">
        <h1 className="text-2xl md:text-6xl font-fraunces font-bold text-neutral-800/70">
          Terima Orderan di <span className="text-green-500/70 font-extrabold">Whatsapp</span>, Kelola semuanya di <span className="text-blue-800/70 font-extrabold">Kelola.in</span>
        </h1>
        <h2 className="text-lg md:text-3xl text-left text-wrap font-light text-neutral-800/70">
          Orderan rapi, bisnis profesional, WhatsApp tetap jalan.<br /> Kelola.in
          adalah tools pencatatan dan manajemen pesanan untuk pebisnis yang
          masih pakai WhatsApp — dan tidak mau ribet ganti sistem.
        </h2>
      </div>

      <section id="fitur" className="mt-8 md:mt-12 p-4 md:p-8">
        <h2 className="text-2xl md:text-4xl font-fraunces text-center font-semibold text-blue-500/70 mb-4">
          Fitur Kelola.in
        </h2>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-fraunces font-medium text-orange-500/70">
              Whatsapp tetap jadi pusat usaha
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>
                Semua orderan tetap masuk lewat pesan Whatsapp seperti biasa.{" "}
              </li>
              <li>
                Kelola.in bekerja dibalik layar agar usaha kamu terlihat lebih
                profesional di mata pembeli.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-fraunces font-medium text-orange-500/70">
              Share link Katalog Produk
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>
                Buat tampilan produk lengkap dengan foto, harga dan deskripsi -
                tanpa perlu website sendiri.
              </li>

              <li>
                Cukup bagikan satu link ke pembeli, mereka bisa lihat semua
                produk kamu.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-fraunces font-medium text-orange-500/70">
              Pesan Otomatis Setelah Chekcout
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>
                Pembeli pilih produk dari katalog, lalu checkout, semua detail
                pesanan otomatis terkirim lewat pesan Whatsapp
              </li>
              <li>
                Cukup chat seperti biasa, tidak ada form ribet ataupun aplikasi
                tambahan.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-fraunces font-medium text-orange-500/70">
              Tracking Order
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>
                Tidak perlu scrool chat panjang untuk status pesanan. Semua
                orderan tercatat otomatis di dashboard
              </li>

              <li>Tandai order sebagai diproses, dibatalkan atau selesai.</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="steps" className="my-2 md:my-2"></section>
      <BackToTop />
    </main>
  );
}
