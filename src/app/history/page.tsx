"use client";

import { usePollar, WalletButton } from "@pollar/react";
import { HistoryList } from "@/components/HistoryList";

export default function HistoryPage() {
  const { isAuthenticated } = usePollar();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
      {isAuthenticated ? (
        <HistoryList />
      ) : (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-neutral-500">Log in to see your transaction history.</p>
          <WalletButton />
        </div>
      )}
    </div>
  );
}
