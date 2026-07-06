"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Download, 
  History, 
  Wallet, 
  Menu, 
  X,
  Send,
  ArrowRightLeft,
  PiggyBank,
  CreditCard,
  MonitorSmartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryLinks = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Transfer", href: "/send", icon: Wallet },
    { name: "Receive", href: "/receive", icon: Download },
  ];

  const allLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Send", href: "/send", icon: Send },
    { name: "Receive", href: "/receive", icon: Download },
    { name: "Swap", href: "/swap", icon: ArrowRightLeft },
    { name: "Earn", href: "/earn", icon: PiggyBank },
    { name: "History", href: "/history", icon: History },
    { name: "Ramps", href: "/ramps", icon: CreditCard },
    { name: "Sessions", href: "/sessions", icon: MonitorSmartphone },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full glass-card border-t border-emerald-500/20 z-50 px-6 py-4">
        <div className="flex items-center justify-between">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-emerald-500/10' : ''}`}>
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
              </Link>
            );
          })}
          
          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <div className="p-2 rounded-xl transition-all duration-200">
              <Menu size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
          </button>
        </div>
      </div>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-emerald-500/20">
              <span className="text-xl font-bold tracking-widest text-white uppercase font-serif">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4">
                {allLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border transition-all duration-200 ${
                        isActive 
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                          : "bg-slate-900/50 border-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon size={24} className={isActive ? "text-emerald-400" : "text-slate-500"} />
                      <span className="text-xs font-bold uppercase tracking-widest text-center">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="p-4 pb-12 text-center border-t border-slate-800/50">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Pollar Neobank</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
