"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, LayoutDashboard, ArrowRightLeft, Send, Download, History, PiggyBank, CreditCard, MonitorSmartphone } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Send", href: "/send", icon: Send },
    { name: "Receive", href: "/receive", icon: Download },
    { name: "History", href: "/history", icon: History },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 glass-card border-r border-emerald-500/20 h-screen fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500 text-slate-900 p-2 rounded-lg group-hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
            <Landmark size={24} />
          </div>
          <span className="text-2xl font-bold tracking-widest text-white uppercase font-serif">
            Pollar
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
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
            Stellar Mainnet
          </div>
        </div>
      </div>
    </div>
  );
}
