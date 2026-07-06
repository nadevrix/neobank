"use client";

import { motion } from "framer-motion";
import { Send as SendIcon } from "lucide-react";
import { TransferForm } from "@/components/TransferForm";
import { useState } from "react";
import { Toast } from "@/components/Toast";

export default function SendPage() {
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
          <SendIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Send Assets</h1>
          <p className="text-slate-400 text-sm">Transfer tokens securely on the Stellar network</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl relative overflow-hidden"
      >
        {/* Decorative background blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <TransferForm 
          onSuccess={() => setToast({ message: "Transfer successful", type: "success" })}
          onError={(msg) => setToast({ message: msg, type: "error" })}
        />
      </motion.div>
    </div>
  );
}
