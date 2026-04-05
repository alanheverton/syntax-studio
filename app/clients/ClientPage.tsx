"use client";

import { useEffect, useState } from "react";
import type { Client } from "@/lib/mockDatabase";
import { Plus, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientPage({ initialClients }: { initialClients: Client[] }) {
  const router = useRouter();
  // Initialize state natively from the server's pre-fetched array
  const [clients, setClients] = useState<Client[]>(initialClients);

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1E24]">Clients</h1>
          <div className="text-sm text-gray-500/80 mt-2 font-medium">Home / <span className="text-[#1E1E24]">Clients</span></div>
        </div>
        <Link href="/clients/new" className="bg-[#E63B48] hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-[5px] transition-colors text-[14px] flex items-center gap-2">
           <Plus size={16} /> New Client
        </Link>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex-1">
         {clients.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-center">
             <h2 className="text-lg font-bold text-[#1E1E24] mb-2">No Active Clients</h2>
             <p className="text-gray-500 text-sm mb-6">No clients have been registered yet.</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {clients.map((client, idx) => (
                <div 
                  key={idx} 
                  onClick={() => router.push(`/clients/${client.id}`)}
                  className="bg-white/50 backdrop-blur-sm border border-white/40 shadow-[0_4px_12px_rgb(0,0,0,0.03)] p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-red-50 text-[#E63B48] rounded-full flex items-center justify-center font-bold text-lg shrink-0 uppercase">
                       {client.company.charAt(0)}
                     </div>
                     <div className="truncate">
                        <h3 className="font-bold text-[#1E1E24] truncate">{client.company}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={12}/> <span className="truncate">{client.email}</span></p>
                     </div>
                  </div>
                  <div className="pt-4 border-t border-white/40 flex justify-between items-center text-sm">
                     <span className="text-gray-500">Representative</span>
                     <span className="font-medium text-gray-800">{client.firstName} {client.lastName}</span>
                  </div>
                </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
}
