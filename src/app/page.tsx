"use client";

import { usePollar } from "@pollar/react";
import { motion } from "framer-motion";
import { Wallet, CreditCard, ArrowUpRight, Copy, CheckCircle2 } from "lucide-react";
import { VirtualCard } from "@/components/VirtualCard";
import { useState } from "react";
import Link from "next/link";

export default function NeobankDashboard() {
  const { walletAddress, walletBalance } = usePollar();
  const balances = walletBalance.step === 'loaded' ? walletBalance.data.balances : [];
  const isLoading = walletBalance.step === 'loading';
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-widest uppercase font-serif text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Welcome back to Pollar Neobank</p>
        </div>
        
        {walletAddress && (
          <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            <span className="text-xs text-slate-400 font-medium font-mono">
              {truncateAddress(walletAddress)}
            </span>
            <button 
              onClick={copyAddress}
              className="text-slate-500 hover:text-emerald-400 transition-colors"
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* Main Account Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-emerald-900/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10 relative">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <Wallet size={16} /> Total Balance
            </h2>
            {isLoading ? (
              <div className="h-12 w-48 bg-slate-800 rounded animate-pulse" />
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-extrabold tracking-tight text-white">
                  ${balances?.[0]?.balance ? parseFloat(balances[0].balance).toFixed(2) : "0.00"}
                </span>
                <span className="text-xl font-bold text-slate-500">USDC</span>
              </div>
            )}
            
            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 w-fit px-4 py-2 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Account Active
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Link 
              href="/receive"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 text-white hover:bg-slate-700 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors border border-slate-700 hover:border-slate-600 shadow-xl"
            >
              Deposit
            </Link>
            <Link 
              href="/send"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-slate-900 hover:bg-emerald-400 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1"
            >
              Send
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Assets List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-3xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
              <ArrowUpRight size={18} className="text-emerald-500" /> Your Assets
            </h3>
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/50 animate-pulse">
                  <div className="h-10 w-10 bg-slate-800 rounded-full"></div>
                  <div className="h-6 w-24 bg-slate-800 rounded"></div>
                </div>
              ))
            ) : balances && balances.length > 0 ? (
              balances.map((asset, i) => (
                <div key={i} className="flex items-center justify-between group p-4 rounded-2xl bg-slate-900/30 hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold shadow-inner">
                      {asset.code ? asset.code.substring(0, 1) : "X"}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                        {asset.code || "XLM"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Native Stellar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">
                      {parseFloat(asset.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                <p className="text-slate-400 text-sm">No assets found in your wallet.</p>
                <Link href="/receive" className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-4 inline-block hover:text-emerald-300">
                  Deposit Funds
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Virtual Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-3xl flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
              <CreditCard size={18} className="text-emerald-500" /> Virtual Card
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center relative z-10">
            <VirtualCard name={walletAddress ? "Pollar User" : "Not Connected"} number="**** **** **** 4092" />
          </div>
          <div className="mt-8 flex justify-center gap-6 relative z-10">
             <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">Freeze Card</button>
             <span className="text-slate-800">|</span>
             <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">Show Details</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
