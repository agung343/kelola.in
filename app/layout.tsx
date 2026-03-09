import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets:["latin"]
})

const dm_Sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Kelolain",
  description: "Tools to increase productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${dm_Sans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
