"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/landing" || pathname.startsWith("/login");

  if (isLandingPage) {
    return (
      <main className="flex-1 w-full bg-transparent">
        {children}
      </main>
    );
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        {children}
      </main>
    </>
  );
}
