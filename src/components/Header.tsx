"use client";

import Link from "next/link";
import { WalletButton } from "@pollar/react";
import { Landmark } from "lucide-react";

export function Header() {
  return (
    <header className="w-full glass-card sticky top-0 z-40 border-b border-emerald-500/20 backdrop-blur-md bg-slate-950/80">
      <div className="mx-auto flex w-full items-center justify-end px-4 py-4">
        <div className="flex items-center gap-4">
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
