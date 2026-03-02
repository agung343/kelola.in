import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-sans dark:bg-black">
      <div className="space-y-4 mt-8">
        <h1 className="text-4xl md:text-6xl text-center font-bold text-blue-500/70">
          Kelola.in
        </h1>
        <h2 className="text-xl md:text-3xl text-center font-medium">
          Tingkatkan produktivitas WhatsApp dan Social Media usaha kamu.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <Link
          href={"/auth"}
          className="bg-emerald-400 py-2 px-4 rounded-lg text-lg font-medium hover:bg-green-400 active:bg-green-400"
        >
          Get Started!
        </Link>
        <Link
          href={"/layanan"}
          className="bg-transparent border border-neutral-500 py-2 px-4 rounded-lg text-lg font-medium hover:bg-violet-200 active:bg-violet-200"
        >
          Cari tahu lebih
        </Link>
      </div>

      <section id="layanan" className="mt-12 p-4 md:p-8">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-semibold text-orange-500/70">
              Tingkatkan Konversi Orderan Kamu
            </h2>
            <p className="text-neutral-800/70 font-light text-sm md:text-base">
              Orderan kamu lewat pesan Whatsapp dan Direct Message di media
              sosial kini bisa kamu atur lebih rapi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
