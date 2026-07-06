"use client";

import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { SwapModal } from "@pollar/react";

export default function SwapPage() {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <ArrowRightLeft className="text-emerald-400" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Swap Assets</h1>
      </div>

      <div className="glass-card p-8 rounded-3xl text-center">
        <h2 className="text-xl font-bold text-white mb-2">Trade Across All Venues</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Pollar quotes every enabled venue and ranks the routes best-first to give you the cheapest rate.
        </p>
        
        <button 
          onClick={() => setShowWidget(true)}
          className="bg-emerald-500 text-slate-900 font-bold uppercase tracking-widest py-3 px-8 rounded-xl hover:bg-emerald-400 transition-colors"
        >
          Open Swap
        </button>
      </div>

      {showWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <SwapModal onClose={() => setShowWidget(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
