"use client";

import { useState } from "react";
import { usePollar } from "@pollar/react";

type AssetChoice = "native" | "custom";

export function TransferForm({ onSuccess, onError }: { onSuccess: () => void, onError: (msg: string) => void }) {
  const { runTx } = usePollar();
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [assetChoice, setAssetChoice] = useState<AssetChoice>("native");
  const [code, setCode] = useState("");
  const [issuer, setIssuer] = useState("");
  const [busy, setBusy] = useState(false);

  const valid =
    destination.trim().length > 0 &&
    parseFloat(amount) > 0 &&
    (assetChoice === "native" || (code.trim() !== "" && issuer.trim() !== ""));

  async function submit() {
    setBusy(true);
    try {
      const asset =
        assetChoice === "native"
          ? ({ type: "native" } as const)
          : ({ type: "credit_alphanum4", code: code.trim(), issuer: issuer.trim() } as const);

      const outcome = await runTx(
        "payment",
        { destination: destination.trim(), amount: amount.trim(), asset },
        memo.trim() ? { memo: { type: "text", value: memo.trim() } } : undefined,
      );

      if (outcome.status === "error") {
        onError(outcome.details ?? outcome.resultCode ?? "Payment failed");
      } else {
        onSuccess();
      }
    } catch (e) {
      onError(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <Field label="Destination Address">
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="G..."
          className="w-full rounded-lg border border-slate-700 px-4 py-3 font-mono text-sm bg-slate-900/50 text-white focus:bg-slate-800 transition-colors outline-none focus:border-emerald-500"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Amount">
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-700 px-4 py-3 font-mono text-sm bg-slate-900/50 text-white focus:bg-slate-800 transition-colors outline-none focus:border-emerald-500"
          />
        </Field>
        
        <Field label="Asset Type">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAssetChoice("native")}
              className={`flex-1 rounded-lg border px-3 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${assetChoice === "native" ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-slate-700 text-slate-400 hover:text-white"}`}
            >
              XLM
            </button>
            <button
              type="button"
              onClick={() => setAssetChoice("custom")}
              className={`flex-1 rounded-lg border px-3 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${assetChoice === "custom" ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-slate-700 text-slate-400 hover:text-white"}`}
            >
              Custom
            </button>
          </div>
        </Field>
      </div>

      {assetChoice === "custom" && (
        <div className="grid grid-cols-2 gap-4">
          <Field label="Asset Code">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="USDC"
              className="w-full rounded-lg border border-slate-700 px-4 py-3 text-sm bg-slate-900/50 text-white focus:bg-slate-800 transition-colors outline-none focus:border-emerald-500"
            />
          </Field>
          <Field label="Issuer">
            <input
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="G..."
              className="w-full rounded-lg border border-slate-700 px-4 py-3 font-mono text-sm bg-slate-900/50 text-white focus:bg-slate-800 transition-colors outline-none focus:border-emerald-500"
            />
          </Field>
        </div>
      )}

      <Field label="Memo (optional)">
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          maxLength={28}
          placeholder="Payment reference"
          className="w-full rounded-lg border border-slate-700 px-4 py-3 text-sm bg-slate-900/50 text-white focus:bg-slate-800 transition-colors outline-none focus:border-emerald-500"
        />
      </Field>

      <button
        disabled={!valid || busy}
        onClick={submit}
        className="w-full rounded-full bg-emerald-500 py-4 font-bold uppercase tracking-widest text-xs text-slate-900 transition hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
      >
        {busy ? "Processing..." : "Confirm Transfer"}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
      {children}
    </label>
  );
}
