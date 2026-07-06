import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border ${
          type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-500/10' 
            : 'bg-red-50 text-red-800 border-red-200 shadow-red-500/10'
        }`}>
          {type === 'success' ? <CheckCircle2 size={20} className="text-emerald-600" /> : <AlertCircle size={20} className="text-red-600" />}
          <span className="font-bold text-sm tracking-wide">{message}</span>
          <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
