"use client";

import Link from "next/link";
import { WalletButton } from "@pollar/react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Pollar<span className="text-violet-600">Bank</span>
        </Link>
        <WalletButton />
      </div>
    </header>
  );
}
