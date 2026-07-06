"use client";

import { motion } from "framer-motion";
import { History as HistoryIcon } from "lucide-react";
import { HistoryList } from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
          <HistoryIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Transaction History</h1>
          <p className="text-slate-400 text-sm">View your past activity and transfers</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <HistoryList />
      </motion.div>
    </div>
  );
}
