import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pollar Neobank Template",
  description: "A functional Neobank shell powered by Pollar on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-500/20">
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64 relative w-full h-full">
              <Header />
              <main className="flex-1 overflow-y-auto px-4 md:px-8 py-4 pb-24 md:py-8 md:pb-8 relative z-10 w-full max-w-7xl mx-auto">
                {children}
              </main>
              <MobileNav />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
