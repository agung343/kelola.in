import { Metadata } from "next";
import BackToTop from "@/components/clients/buttons/back-to-top";

export const metadata: Metadata = {
  title: "Layanan Kelolal.in",
  description: "Fitur layanan",
};

export default function ServicePage() {
  return (
    <main className="min-h-screen font-sans dark:bg-black p-4 md:-p-8">
      <div className="space-y-4 mt-8">
        <h1 className="text-4xl md:text-6xl text-center font-bold text-blue-500/70">
          LAYANAN Kelola.in
        </h1>
        <h2 className="text-xl md:text-3xl text-center font-medium">
          Semua Fitur yang membantu kamu mengelola pesanan dari Whatsapp dan
          media sosial jadi lebih rapi.
        </h2>
      </div>

      <section id="fitur" className="mt-8 md:mt-12 p-4 md:p-8">
        <h2 className="text-3xl md:text-6xl text-center font-semibold text-blue-500/70 mb-4">
          Fitur Kelola.in
        </h2>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium text-orange-500/70">
              Whatsapp tetap pilar utama
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>Whatsapp tetap jadi tempat orderan kamu masuk. </li>
              <li>Kelolain membantu usaha kamu lebih rapi dan terstruktur.</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium text-orange-500/70">
              Katalog Produk
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>Buat Katalog Produk beserta foto, harga dan deskripsi barang/jasa.</li>
            
              <li>Bagikan link katalog ke pembeli agar mereka bisa memilih produk
              dengan mudah.</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium text-orange-500/70">
              Direct Message setelah Checkout
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>Pembeli memilih beberapa produk di halaman katalog sebelum
              checkout.</li>
              <li>Pembeli langsung diarahkan direct message ke nomer Whatsapp kamu.</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-2 md:my-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium text-orange-500/70">
              Tracking Order
            </h2>
            <ul className="text-neutral-800/70 font-light text-sm md:text-base list-disc list-inside">
              <li>Pantau semua orderan yang masuk lewat kelolain dalam satu
              dashboard.</li>
              
              <li>Tandai order sebagai diproses, dibatalkan atau selesai.</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="steps" className="my-2 md:my-2">
        
      </section>
      <BackToTop />
    </main>
  );
}
