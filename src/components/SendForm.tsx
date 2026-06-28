"use client";

// Send flow — collects destination / amount / asset / memo and submits with
// runTx('payment', …). Pollar's transaction modal opens automatically and
// surfaces review + result; we also reflect the SubmitOutcome inline.

import { useState } from "react";
import Link from "next/link";
import { usePollar } from "@pollar/react";
import { EXPLORER_TX } from "@/lib/config";

type AssetChoice = "native" | "custom";

export function SendForm() {
  const { runTx } = usePollar();
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [assetChoice, setAssetChoice] = useState<AssetChoice>("native");
  const [code, setCode] = useState("");
  const [issuer, setIssuer] = useState("");

  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<
    | { kind: "success" | "pending"; hash: string }
    | { kind: "error"; message: string }
    | null
  >(null);

  const valid =
    destination.trim().length > 0 &&
    parseFloat(amount) > 0 &&
    (assetChoice === "native" || (code.trim() !== "" && issuer.trim() !== ""));

  async function submit() {
    setBusy(true);
    setResult(null);
    try {
      const asset =
        assetChoice === "native"
          ? ({ type: "native" } as const)
          : ({ type: "credit_alphanum4", code: code.trim(), issuer: issuer.trim() } as const);

      // params carry { destination, amount, asset }; memo (MEMO_TEXT) goes in options.
      const outcome = await runTx(
        "payment",
        { destination: destination.trim(), amount: amount.trim(), asset },
        memo.trim() ? { memo: { type: "text", value: memo.trim() } } : undefined,
      );

      if (outcome.status === "error") {
        setResult({
          kind: "error",
          message: outcome.details ?? outcome.resultCode ?? "Payment failed",
        });
      } else {
        setResult({ kind: outcome.status, hash: outcome.hash });
      }
    } catch (e) {
      setResult({ kind: "error", message: e instanceof Error ? e.message : "Payment failed" });
    } finally {
      setBusy(false);
    }
  }

  if (result && result.kind !== "error") {
    return (
      <div className="space-y-5 py-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          ✓
        </div>
        <div>
          <h1 className="text-xl font-bold">
            {result.kind === "pending" ? "Payment submitted" : "Payment sent"}
          </h1>
          <p className="text-neutral-500">{amount} to {destination.slice(0, 6)}…</p>
        </div>
        <a
          href={EXPLORER_TX(result.hash)}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
        >
          View transaction ↗
        </a>
        <Link href="/" className="block rounded-xl bg-violet-600 py-3 font-semibold text-white">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Send</h1>

      <Field label="Destination">
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="G…"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-mono text-sm"
        />
      </Field>

      <Field label="Amount">
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-mono"
        />
      </Field>

      <Field label="Asset">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAssetChoice("native")}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm ${assetChoice === "native" ? "border-violet-600 bg-violet-50 font-medium text-violet-700" : "border-neutral-300"}`}
          >
            XLM (native)
          </button>
          <button
            type="button"
            onClick={() => setAssetChoice("custom")}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm ${assetChoice === "custom" ? "border-violet-600 bg-violet-50 font-medium text-violet-700" : "border-neutral-300"}`}
          >
            Issued asset
          </button>
        </div>
      </Field>

      {assetChoice === "custom" && (
        <div className="grid grid-cols-2 gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="CODE (e.g. USDC)"
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          />
          <input
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="Issuer G…"
            className="rounded-lg border border-neutral-300 px-3 py-2 font-mono text-sm"
          />
        </div>
      )}

      <Field label="Memo (optional)">
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          maxLength={28}
          placeholder="Reference"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      {result?.kind === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {result.message}
        </p>
      )}

      <button
        disabled={!valid || busy}
        onClick={submit}
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {busy ? "Sending…" : "Review & send"}
      </button>
      <Link href="/" className="block text-center text-sm text-neutral-500 hover:underline">
        Cancel
      </Link>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-neutral-600">{label}</span>
      {children}
    </label>
  );
}
