import type { Metadata } from "next";
import { Providers } from "./providers";
import { AppHeader } from "@/components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pollar Neobank — consumer banking template",
  description:
    "A batteries-included consumer banking app on Stellar: balance, receive, send, and history — powered by Pollar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Providers>
          <AppHeader />
          <main className="mx-auto max-w-md px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
