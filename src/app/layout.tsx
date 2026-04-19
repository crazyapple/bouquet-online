import type { Metadata } from "next";
import { Geist, Geist_Mono, Martian_Mono } from "next/font/google";
import "./globals.css";
import { BouquetProvider } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  subsets: ['latin'],
  weight: ['200'],
  variable: '--font-martian-mono',
});

export const metadata: Metadata = {
  title: "🌷 Bouquet Customizer",
  description: "Create and customize beautiful flower bouquets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BouquetProvider>{children}</BouquetProvider>
      </body>
    </html>
  );
}
