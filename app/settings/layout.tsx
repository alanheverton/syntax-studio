"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, Bell, CreditCard } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isCurrent = (path: string) => pathname === path;

  const linkClass = (path: string) => {
    return isCurrent(path)
      ? "flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 text-[#1E1E24] rounded-md font-semibold text-sm shadow-sm"
      : "flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-md font-medium text-sm transition-colors";
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E24]">Settings</h1>
        <div className="text-sm text-gray-500/80 mt-2 font-medium">Home / <span className="text-[#1E1E24]">Settings</span></div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full xl:w-[250px] shrink-0">
          <div className="flex flex-col space-y-1">
            <Link href="/settings" className={linkClass("/settings")}>
              <User size={18} /> Profile
            </Link>
            <Link href="/settings/security" className={linkClass("/settings/security")}>
              <Shield size={18} /> Security
            </Link>
            <Link href="/settings/notifications" className={linkClass("/settings/notifications")}>
              <Bell size={18} /> Notifications
            </Link>
            <Link href="/settings/billing" className={linkClass("/settings/billing")}>
              <CreditCard size={18} /> Billing
            </Link>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8">
           {children}
        </div>
      </div>
    </div>
  );
}
