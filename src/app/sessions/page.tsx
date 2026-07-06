import { MonitorSmartphone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SessionsPage() {
  const sessions = [
    { device: "MacBook Pro - Chrome", location: "Washington, D.C., USA", current: true, time: "Active Now" },
    { device: "iPhone 14 Pro - Safari", location: "Washington, D.C., USA", current: false, time: "2 hours ago" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8">
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

      <div className="space-y-4">
        {sessions.map((session, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold">{session.device}</h3>
                {session.current && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold">
                    Current
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mt-1">{session.location} • {session.time}</p>
            </div>
            
            {!session.current && (
              <button className="text-red-400 text-sm font-bold uppercase tracking-widest hover:text-red-300">
                Revoke
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
