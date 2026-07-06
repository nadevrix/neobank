"use client";

import { Wallet, TrendingUp, ShieldAlert, ArrowRight } from "lucide-react";
import { usePollar } from "@pollar/react";

export default function EarnPage() {
  const { openEarnModal, isAuthenticated } = usePollar();

  return (
    <div className="max-w-4xl mx-auto mt-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <TrendingUp className="text-emerald-400" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Yield & Earn</h1>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center gap-3 mb-8">
        <ShieldAlert className="text-amber-400" size={20} />
        <p className="text-slate-300 text-sm">
          Yield is generated through third-party protocols (Blend, DeFindex) and carries smart contract risk.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl text-center">
        <h2 className="text-xl font-bold text-white mb-2">Put Your Idle Capital to Work</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Deposit into curated DeFindex vaults or Blend pools directly from your Neobank wallet. 
          Yield opportunities are fetched in real-time.
        </p>
        
        <button 
          onClick={openEarnModal}
          disabled={!isAuthenticated}
          className="bg-emerald-500 text-slate-900 font-bold uppercase tracking-widest py-3 px-8 rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {isAuthenticated ? "Explore Opportunities" : "Connect Wallet First"}
          {isAuthenticated && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
