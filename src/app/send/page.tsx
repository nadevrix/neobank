"use client";

import { usePollar, WalletButton } from "@pollar/react";
import { SendForm } from "@/components/SendForm";

export default function SendPage() {
  const { isAuthenticated } = usePollar();
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-neutral-500">Log in to send a payment.</p>
        <WalletButton />
      </div>
    );
  }
  return <SendForm />;
}
