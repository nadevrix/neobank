"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Download, History, Wallet } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Transfer", href: "/send", icon: Wallet },
    { name: "Receive", href: "/receive", icon: Download },
    { name: "History", href: "/history", icon: History },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full glass-card border-t border-emerald-500/20 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        {links.map((link) => {
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
      </div>
    </div>
  );
}
