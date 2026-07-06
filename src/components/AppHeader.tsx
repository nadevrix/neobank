"use client";

import Link from "next/link";
import { WalletButton } from "@pollar/react";
import { motion } from "framer-motion";

export function AppHeader() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white font-bold text-sm shadow-lg shadow-violet-900/50">
            P
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Pollar<span className="text-violet-400">Bank</span>
          </span>
        </Link>
        <WalletButton />
      </div>
    </motion.header>
  );
}
