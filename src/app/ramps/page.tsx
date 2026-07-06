"use client";

import { CreditCard, DollarSign, Building } from "lucide-react";
import { motion } from "framer-motion";
import { usePollar } from "@pollar/react";

export default function RampsPage() {
  const { openRampModal, isAuthenticated } = usePollar();

  const ramps = [
    { name: "Global Onramp", type: "Buy & Sell Crypto", icon: DollarSign, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <CreditCard className="text-emerald-400" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Fiat Ramps</h1>
      </div>

      <p className="text-slate-400 mb-8">Connect your bank account or use cash to fund your Neobank wallet globally.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ramps.map((ramp, i) => {
          const Icon = ramp.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-3xl flex items-center justify-between hover:bg-slate-800/50 cursor-pointer transition-colors border border-transparent hover:border-slate-700"
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${ramp.bg}`}>
                  <Icon size={24} className={ramp.color} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{ramp.name}</h3>
                  <p className="text-slate-500 text-sm">{ramp.type}</p>
                </div>
              </div>
              <button 
                onClick={openRampModal}
                disabled={!isAuthenticated}
                className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticated ? "Connect" : "Login"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
