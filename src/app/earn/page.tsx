"use client";

import { PiggyBank, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { DistributionRulesModal } from "@pollar/react";

export default function EarnPage() {
  const [showWidget, setShowWidget] = useState(false);

  const vaults = [
    { name: "Pollar Rewards", apy: "Variable", balance: "0.00" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <PiggyBank className="text-emerald-400" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Earn Yield</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vaults.map((vault, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-white text-lg">{vault.name}</h3>
                <p className="text-slate-400 text-sm mt-1">Claim airdrops and rewards</p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                <TrendingUp size={16} /> {vault.apy} APY
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-xl flex justify-between items-center">
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Your Deposit</span>
              <span className="text-white font-bold">{vault.balance}</span>
            </div>
            
            <button 
              onClick={() => setShowWidget(true)}
              className="w-full mt-4 bg-emerald-500 text-slate-900 font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Open Rewards
            </button>
          </motion.div>
        ))}
      </div>

      {showWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <DistributionRulesModal onClose={() => setShowWidget(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
