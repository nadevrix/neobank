"use client";

// Transaction history — reads the SDK's txHistory state and pages with
// client.fetchTxHistory({ limit, offset }). Offset-based: hasMore is derived
// from offset + records.length < total.

import { useEffect } from "react";
import Link from "next/link";
import { usePollar } from "@pollar/react";
import { EXPLORER_TX } from "@/lib/config";

const PAGE = 20;

export function HistoryList() {
  const { txHistory, getClient } = usePollar();

  useEffect(() => {
    void getClient().fetchTxHistory({ limit: PAGE, offset: 0 });
  }, [getClient]);

  if (txHistory.step === "idle" || txHistory.step === "loading") {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-neutral-100" />
        ))}
      </div>
    );
  }

  if (txHistory.step === "error") {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-sm text-red-600">{txHistory.message}</p>
        <button
          onClick={() => getClient().fetchTxHistory({ limit: PAGE, offset: 0 })}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
        >
          Retry
        </button>
      </div>
    );
  }

  const { records, total, offset } = txHistory.data;
  const hasMore = offset + records.length < total;

  if (records.length === 0) {
    return (
      <div className="py-16 text-center text-neutral-500">
        <p>No transactions yet.</p>
        <Link href="/send" className="mt-3 inline-block rounded-lg bg-violet-600 px-4 py-2 text-white">
          Send your first payment
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {records.map((tx) => (
          <li key={tx.id} className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="font-medium capitalize">{tx.operation}</p>
              <p className="truncate text-sm text-neutral-500">{tx.summary}</p>
              <p className="text-xs text-neutral-400">
                {new Date(tx.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusPill status={tx.status} />
              <a
                href={EXPLORER_TX(tx.hash)}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-violet-600 hover:underline"
              >
                view ↗
              </a>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() =>
            getClient().fetchTxHistory({ limit: PAGE, offset: offset + records.length })
          }
          className="w-full rounded-xl border border-neutral-300 py-2.5 text-sm font-medium hover:bg-neutral-50"
        >
          Load more
        </button>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: "PENDING" | "SUCCESS" | "FAILED" }) {
  const cls =
    status === "SUCCESS"
      ? "bg-emerald-100 text-emerald-700"
      : status === "FAILED"
        ? "bg-red-100 text-red-700"
        : "bg-amber-100 text-amber-700";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${cls}`}>
      {status}
    </span>
  );
}
