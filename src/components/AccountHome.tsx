"use client";

// Account home — composes the SDK natives into one screen: balance, address+QR
// to receive, assets/trustlines, and entry points to send / full receive modal.
// Nothing here reimplements wallet logic; it reads from usePollar()/the client.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { usePollar } from "@pollar/react";
import type { WalletBalanceContent } from "@pollar/core";

type Balance = WalletBalanceContent["balances"][number];

export function AccountHome() {
  const { walletAddress, getClient, openReceiveModal } = usePollar();
  const [balances, setBalances] = useState<Balance[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
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
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      {/* Total / primary balance */}
      <section className="rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 p-6 text-white shadow-sm">
        <p className="text-sm/relaxed text-violet-200">Available</p>
        {balances === null ? (
          <div className="mt-1 h-9 w-40 animate-pulse rounded bg-white/20" />
        ) : (
          <p className="font-mono text-3xl font-bold">
            {xlm ? Number(xlm.available).toFixed(4) : "0.0000"}{" "}
            <span className="text-base font-normal text-violet-200">XLM</span>
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <Link
            href="/send"
            className="flex-1 rounded-xl bg-white py-2 text-center text-sm font-semibold text-violet-700"
          >
            Send
          </Link>
          <button
            onClick={openReceiveModal}
            className="flex-1 rounded-xl bg-violet-500/40 py-2 text-center text-sm font-semibold ring-1 ring-white/30"
          >
            Receive
          </button>
          <Link
            href="/history"
            className="flex-1 rounded-xl bg-violet-500/40 py-2 text-center text-sm font-semibold ring-1 ring-white/30"
          >
            History
          </Link>
        </div>
      </section>

      {/* Receive: address + QR */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-500">Your address</h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="rounded-lg border border-neutral-200 p-2">
            <QRCodeSVG value={walletAddress} size={88} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-all font-mono text-xs text-neutral-600">{walletAddress}</p>
            <button
              onClick={copy}
              className="mt-2 rounded-lg border border-neutral-300 px-3 py-1 text-xs font-medium hover:bg-neutral-50"
            >
              {copied ? "Copied ✓" : "Copy address"}
            </button>
          </div>
        </div>
      </section>

      {/* Assets / trustlines */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-500">Assets</h2>
        {error ? (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        ) : balances === null ? (
          <div className="mt-3 space-y-2">
            <div className="h-10 animate-pulse rounded bg-neutral-100" />
            <div className="h-10 animate-pulse rounded bg-neutral-100" />
          </div>
        ) : balances.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500">No assets yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-neutral-100">
            {balances.map((b) => (
              <li key={`${b.code}:${b.issuer ?? "native"}`} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-medium">{b.code}</p>
                  {b.issuer && (
                    <p className="font-mono text-xs text-neutral-400">
                      {b.issuer.slice(0, 4)}…{b.issuer.slice(-4)}
                    </p>
                  )}
                </div>
                <p className="font-mono">{Number(b.balance).toFixed(4)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
