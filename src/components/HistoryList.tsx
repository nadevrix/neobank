"use client";

// Transaction history — reads the SDK's txHistory state and pages with
// client.fetchTxHistory({ limit, offset }). Offset-based: hasMore is derived
// from offset + records.length < total.

import { useEffect } from "react";
import Link from "next/link";
import { usePollar } from "@pollar/react";
import { EXPLORER_TX } from "@/lib/config";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Clock } from "lucide-react";
import { clsx } from "clsx";

const PAGE = 20;

export function HistoryList() {
  const { txHistory, getClient } = usePollar();

  useEffect(() => {
    void getClient().fetchTxHistory({ limit: PAGE, offset: 0 });
  }, [getClient]);

  if (txHistory.step === "idle" || txHistory.step === "loading") {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-800/50" />
        ))}
      </div>
    );
  }

  if (txHistory.step === "error") {
    return (
      <div className="space-y-4 py-10 text-center rounded-2xl border border-red-500/20 bg-red-500/5">
        <p className="text-sm text-red-400">{txHistory.message}</p>
        <button
          onClick={() => getClient().fetchTxHistory({ limit: PAGE, offset: 0 })}
          className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
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
      <div className="py-16 text-center text-slate-500 rounded-2xl border border-slate-800 border-dashed">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 mb-4">
          <Clock size={20} className="text-slate-400" />
        </div>
        <p>No transactions yet.</p>
        <Link href="/send" className="mt-4 inline-block rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/20">
          Send your first payment
        </Link>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-4">
      <motion.ul 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {records.map((tx) => {
          // Determine icon based on operation (rough heuristic for template purposes)
          const isPayment = tx.operation === "payment";
          const isIncoming = tx.summary.toLowerCase().includes("received");
          
          return (
            <motion.li 
              variants={item}
              key={tx.id} 
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:bg-slate-800/80 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={clsx(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  isPayment && isIncoming ? "bg-emerald-500/10 text-emerald-400" :
                  isPayment && !isIncoming ? "bg-violet-500/10 text-violet-400" :
                  "bg-slate-800 text-slate-400"
                )}>
                  {isPayment && isIncoming ? <ArrowDownLeft size={18} /> :
                   isPayment && !isIncoming ? <ArrowUpRight size={18} /> :
                   <ArrowLeftRight size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="font-medium capitalize text-slate-200">{tx.operation}</p>
                  <p className="truncate text-sm text-slate-400">{tx.summary}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <StatusPill status={tx.status} />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">
                    {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <a
                    href={EXPLORER_TX(tx.hash)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      {hasMore && (
        <button
          onClick={() =>
            getClient().fetchTxHistory({ limit: PAGE, offset: offset + records.length })
          }
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
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
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : status === "FAILED"
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cls}`}>
      {status}
    </span>
  );
}
