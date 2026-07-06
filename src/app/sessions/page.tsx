"use client";

import { MonitorSmartphone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { SessionsModal } from "@pollar/react";

export default function SessionsPage() {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <MonitorSmartphone className="text-emerald-400" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Active Sessions</h1>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 mb-8">
        <ShieldCheck className="text-emerald-400" size={20} />
        <p className="text-emerald-400 text-sm">Your account is secured by Pollar's non-custodial infrastructure.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl text-center">
        <h2 className="text-xl font-bold text-white mb-2">Manage Your Devices</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          View all devices currently logged into your wallet and remotely revoke access to keep your funds safe.
        </p>
        
        <button 
          onClick={() => setShowWidget(true)}
          className="bg-slate-800 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-xl hover:bg-slate-700 transition-colors"
        >
          View Active Sessions
        </button>
      </div>

      {showWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <SessionsModal onClose={() => setShowWidget(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
