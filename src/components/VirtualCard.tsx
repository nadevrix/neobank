import { motion } from "framer-motion";

export function VirtualCard({ name, number }: { name: string; number: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-sm aspect-[1.586/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-500 p-6 rounded-2xl text-white flex flex-col justify-between shadow-xl shadow-emerald-500/20"
    >
      <div className="flex justify-between items-start">
        <div className="font-serif text-xl font-bold tracking-widest italic">Pollar</div>
        {/* Contactless icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
          <path d="M8.5 21c-2.4-1.9-4.5-5.3-4.5-9s2.1-7.1 4.5-9"/>
          <path d="M11.5 19c-1.8-1.5-3.5-4.2-3.5-7s1.7-5.5 3.5-7"/>
          <path d="M14.5 17c-1.3-1-2.5-3.1-2.5-5s1.2-4 2.5-5"/>
          <path d="M17.5 15c-.8-.6-1.5-2.1-1.5-3s.7-2.4 1.5-3"/>
        </svg>
      </div>
      
      <div>
        <div className="font-mono text-xl tracking-widest mb-2 opacity-90">{number}</div>
        <div className="flex justify-between items-end">
          <div className="font-bold text-sm tracking-widest uppercase opacity-80">{name}</div>
          <div className="text-xs tracking-widest font-mono">12/28</div>
        </div>
      </div>
    </motion.div>
  );
}
