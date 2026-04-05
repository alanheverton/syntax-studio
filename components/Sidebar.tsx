"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, LayoutDashboard, Users, FileText, Timer, CreditCard, Settings, User, LogOut } from "lucide-react";
import { signOut } from "@/app/login/actions";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname?.startsWith(path));
  };

  const navClass = (path: string) => {
    return isActive(path)
      ? "w-full flex justify-center py-3 bg-white/10 text-white border-l-[3px] border-[#E63B48] transition-all outline-none"
      : "w-full flex justify-center py-3 hover:text-white hover:bg-white/5 transition-all outline-none";
  };

  const iconClass = (path: string) => {
    return isActive(path) ? "-ml-[3px]" : "";
  };

  return (
    <aside className="w-[80px] bg-[#1E1E24]/80 backdrop-blur-2xl shadow-[4px_0_24px_rgb(0,0,0,0.05)] h-screen flex flex-col items-center py-6 justify-between flex-shrink-0 text-white/50 border-r border-white/5 z-50">
      <div className="flex flex-col items-center space-y-8 w-full">
        {/* Logo area */}
        <Link href="/landing" className="text-[#E63B48] mb-4 cursor-pointer hover:text-red-400 transition-colors">
          <ArrowLeftRight size={28} strokeWidth={3} className="text-[#E63B48]" />
        </Link>
        
        {/* Navigation Icons */}
        <nav className="flex flex-col items-center space-y-4 w-full">
          <Link href="/" className={pathname === "/" ? "w-full flex justify-center py-3 bg-white/10 text-white border-l-[3px] border-[#E63B48] transition-all outline-none" : "w-full flex justify-center py-3 hover:text-white hover:bg-white/5 transition-all outline-none"}>
            <LayoutDashboard size={22} className={pathname === "/" ? "-ml-[3px]" : ""} />
          </Link>
          <Link href="/clients" className={navClass("/clients")}>
            <Users size={22} className={iconClass("/clients")} />
          </Link>
          <Link href="/orders" className={navClass("/orders")}>
            <FileText size={22} className={iconClass("/orders")} />
          </Link>
          <Link href="/timers" className={navClass("/timers")}>
            <Timer size={22} className={iconClass("/timers")} />
          </Link>
          <Link href="/billing" className={navClass("/billing")}>
            <CreditCard size={22} className={iconClass("/billing")} />
          </Link>
        </nav>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full mb-4">
         <form action={signOut} className="w-full">
            <button type="submit" title="Sign Out" className="w-full flex justify-center py-2 hover:text-[#E63B48] transition-colors outline-none">
              <LogOut size={20} className="ml-1" />
            </button>
         </form>
         <Link href="/settings" title="Settings" className={isActive("/settings") ? "w-full flex justify-center py-2 text-white bg-white/10 transition-all outline-none" : "w-full flex justify-center py-2 hover:text-white transition-all outline-none"}>
           <Settings size={22} />
         </Link>
         <Link href="/settings" className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white overflow-hidden border-2 border-transparent hover:border-gray-400 transition-colors outline-none mx-auto">
           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
         </Link>
      </div>
    </aside>
  );
}
