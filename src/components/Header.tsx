"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "@pollar/react";
import { Landmark, Menu, X, LayoutDashboard, ArrowRightLeft, Send, Download, History, PiggyBank, CreditCard, MonitorSmartphone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
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
      <header className="w-full glass-card sticky top-0 z-40 border-b border-emerald-500/20 backdrop-blur-md bg-slate-950/80">
        <div className="mx-auto flex w-full items-center justify-between md:justify-end px-4 py-4">
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 glass-card border-r border-emerald-500/20 z-50 flex flex-col md:hidden bg-slate-950"
            >
              <div className="p-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                  <div className="bg-emerald-500 text-slate-900 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                    <Landmark size={24} />
                  </div>
                  <span className="text-xl font-bold tracking-widest text-white uppercase font-serif">
                    Pollar
                  </span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
                      }`}
                    >
                      <Icon size={20} className={isActive ? "text-emerald-400" : "text-slate-500"} />
                      <span className="font-bold text-sm tracking-wide">{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-6 border-t border-slate-800/50">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
                  <p className="text-xs text-slate-400 font-medium mb-2">Network Status</p>
                  <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    Mainnet
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
