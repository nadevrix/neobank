"use client";

import { usePollar, WalletButton } from "@pollar/react";
import { AccountHome } from "@/components/AccountHome";

export default function HomePage() {
  const { isAuthenticated } = usePollar();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center gap-6 py-24 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to PollarBank</h1>
          <p className="mt-1 text-neutral-500">
            Log in with Pollar to see your balance, receive, send, and history.
          </p>
        </div>
        <WalletButton />
      </div>
    );
  }

  return <AccountHome />;
}
