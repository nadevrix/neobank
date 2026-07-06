"use client";

import { usePollar } from "@pollar/react";
import { motion } from "framer-motion";
import { Download as ReceiveIcon, Copy, CheckCircle2, QrCode } from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ReceivePage() {
  const { wallet } = usePollar();
  const walletAddress = wallet?.address;
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
          <ReceiveIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Receive Assets</h1>
          <p className="text-slate-400 text-sm">Deposit crypto from another wallet</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white p-4 rounded-2xl mb-8 shadow-xl">
             {walletAddress ? (
               <QRCodeSVG value={walletAddress} size={192} />
             ) : (
               <div className="w-48 h-48 bg-slate-100 flex items-center justify-center rounded-xl">
                 <QrCode size={120} className="text-slate-300" />
               </div>
             )}
          </div>
          
          <h3 className="font-bold text-lg text-white mb-2">Your Stellar Address</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            Send only Stellar (XLM) or Stellar-issued assets to this address. Sending other assets may result in permanent loss.
          </p>
          
          {walletAddress ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-900/80 border border-slate-700/50 p-2 rounded-full w-full max-w-md">
              <span className="text-xs font-mono text-emerald-400 font-bold truncate flex-1 px-4 text-center sm:text-left">
                {walletAddress}
              </span>
              <button 
                onClick={copyAddress}
                className="bg-emerald-500 text-slate-900 hover:bg-emerald-400 flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors w-full sm:w-auto"
              >
                {copied ? <><CheckCircle2 size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
              </button>
            </div>
          ) : (
            <div className="text-slate-500 text-sm p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              Please connect your wallet to view your receiving address.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
