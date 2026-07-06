"use client";

// Account home — composes the SDK natives into one screen: balance, address+QR
// to receive, assets/trustlines, and entry points to send / full receive modal.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { usePollar } from "@pollar/react";
import type { WalletBalanceContent } from "@pollar/core";
import { motion } from "framer-motion";
import { Send, ArrowDownToLine, History, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { clsx } from "clsx";

type Balance = WalletBalanceContent["balances"][number];

export function AccountHome() {
  const { wallet, getClient, openReceiveModal } = usePollar();
  const walletAddress = wallet?.address;
  const [balances, setBalances] = useState<Balance[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    if (!walletAddress) return;
    setError(null);
    try {
      const client = getClient();
      await client.ready();
      const res = await client.getWalletBalance(walletAddress);
      setBalances(res.balances);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load balance");
    }
  }, [getClient, walletAddress]);

  useEffect(() => {
    void load();
  }, [load]);

  const xlm = balances?.find((b) => b.type === "native");

  const copy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Total / primary balance - Virtual Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/80 to-purple-900/80 p-6 text-white shadow-xl shadow-violet-900/20 backdrop-blur-xl border border-white/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl"></div>
        
        <div className="relative z-10">
          <p className="text-sm/relaxed font-medium text-violet-200 uppercase tracking-wider">Available Balance</p>
          {balances === null ? (
            <div className="mt-2 h-10 w-48 animate-pulse rounded-lg bg-white/20" />
          ) : (
            <div className="mt-1 flex items-baseline gap-2">
              <p className="font-mono text-4xl font-bold tracking-tight">
                {xlm ? Number(xlm.available).toFixed(4) : "0.0000"}
              </p>
              <span className="text-lg font-medium text-violet-200">XLM</span>
            </div>
          )}
          
          <div className="mt-8 flex gap-3">
            <Link
              href="/send"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-violet-900 transition-transform hover:scale-105 hover:bg-slate-50 shadow-md"
            >
              <Send size={16} /> Send
            </Link>
            <button
              onClick={openReceiveModal}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm"
            >
              <ArrowDownToLine size={16} /> Receive
            </button>
            <Link
              href="/history"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm"
            >
              <History size={16} /> History
            </Link>
          </div>
        </div>
      </section>

      {/* Receive: address + QR */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-slate-400">Your address</h2>
        <div className="mt-4 flex items-center gap-5">
          <div className="rounded-xl bg-white p-2 shadow-sm">
            <QRCodeSVG value={walletAddress || ""} size={80} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-all font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 shadow-inner">
              {walletAddress}
            </p>
            <button
              onClick={copy}
              className={clsx(
                "mt-3 flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors w-full justify-center",
                copied 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
              )}
            >
              {copied ? <><Check size={14} /> Copied to clipboard</> : <><Copy size={14} /> Copy address</>}
            </button>
          </div>
        </div>
      </section>

      {/* Assets / trustlines */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-slate-400">Assets</h2>
        {error ? (
          <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">{error}</p>
        ) : balances === null ? (
          <div className="mt-4 space-y-3">
            <div className="h-12 animate-pulse rounded-xl bg-slate-800" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-800" />
          </div>
        ) : balances.length === 0 ? (
          <p className="mt-4 rounded-lg bg-slate-800/50 p-4 text-center text-sm text-slate-500">No assets yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-800">
            {balances.map((b) => (
              <li key={`${b.code}:${b.issuer ?? "native"}`} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-200 font-bold border border-slate-700 shadow-sm">
                    {b.code.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">{b.code}</p>
                    {b.issuer && (
                      <p className="font-mono text-xs text-slate-500">
                        {b.issuer.slice(0, 4)}…{b.issuer.slice(-4)}
                      </p>
                    )}
                  </div>
                </div>
                <p className="font-mono font-medium text-slate-200">{Number(b.balance).toFixed(4)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </motion.div>
  );
}
