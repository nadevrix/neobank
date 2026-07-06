"use client";

import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SwapPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <ArrowRightLeft className="text-emerald-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Swap Assets</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">You Pay</label>
            <div className="flex items-center justify-between mt-2">
              <input type="text" placeholder="0.00" className="bg-transparent text-3xl font-bold text-white outline-none w-1/2" />
              <div className="bg-slate-800 px-4 py-2 rounded-xl text-white font-bold flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs">X</div>
                XLM
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-4 relative z-10">
            <div className="bg-slate-800 p-2 rounded-full border-4 border-slate-950 text-emerald-400 cursor-pointer hover:bg-slate-700 transition-colors">
              <ArrowRightLeft size={20} className="rotate-90" />
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">You Receive</label>
            <div className="flex items-center justify-between mt-2">
              <input type="text" placeholder="0.00" className="bg-transparent text-3xl font-bold text-white outline-none w-1/2" readOnly />
              <div className="bg-slate-800 px-4 py-2 rounded-xl text-white font-bold flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">U</div>
                USDC
              </div>
            </div>
          </div>

          <button className="w-full bg-emerald-500 text-slate-900 font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-emerald-400 transition-all mt-4">
            Review Swap
          </button>
        </div>
      </motion.div>
    </div>
  );
}
