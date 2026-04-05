"use client";

import { useState } from "react";
import type { Order } from "@/lib/mockDatabase";
import { Trash2, Loader2, Plus, Edit3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrdersPageClient({ initialOrders }: { initialOrders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      setOrders(orders.filter(o => o.id !== id));
    } catch (e) {
      console.error(e);
    }
    setDeletingId(null);
  };
  const toggleOrderStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Pending" ? "In Progress" : 
                       currentStatus === "In Progress" ? "Completed" : "Pending";
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      setOrders(orders.map(o => o.id === id ? { ...o, status: nextStatus as any } : o));
    } catch (e) {
      console.error(e);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Completed": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1E24]">Orders</h1>
          <div className="text-sm text-gray-500/80 mt-2 font-medium">Home / <span className="text-[#1E1E24]">Orders</span></div>
        </div>
        <Link href="/orders/new" className="bg-[#E63B48] hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-[5px] transition-colors text-[14px] flex items-center gap-2">
           <Plus size={16} /> New Order
        </Link>
      </div>
      
      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex-1">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <h2 className="text-lg font-bold text-[#1E1E24] mb-2">No Active Orders</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">You have not created any orders yet.</p>
          </div>
        ) : (
          <div className="w-full text-left">
             <div className="grid grid-cols-6 pb-3 border-b text-sm font-medium text-gray-500">
                <div className="col-span-2">Task Details</div>
                <div>Word Count</div>
                <div>Client</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
             </div>
             <div className="divide-y text-sm border-white/40">
               {orders.map((order) => (
                 <div 
                   key={order.id} 
                   onClick={() => router.push(`/orders/${order.id}`)}
                   className="grid grid-cols-6 py-4 items-center cursor-pointer hover:bg-white/40 transition-colors -mx-4 px-4 rounded-lg group"
                 >
                   <div className="col-span-2 pr-4">
                      <div className="font-semibold text-[#1E1E24] truncate group-hover:text-red-500 transition-colors">{order.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{order.contentType}</div>
                   </div>
                   <div className="text-gray-600 font-medium font-mono border-white/40">{order.wordCount} words</div>
                   <div className="text-gray-500">{order.clientName}</div>
                   <div>
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         toggleOrderStatus(order.id, order.status);
                       }}
                       className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-transform hover:scale-105 ${getStatusColor(order.status)}`}
                       title="Click to advance status"
                     >
                       {order.status}
                     </button>
                   </div>
                   <div className="flex justify-end gap-3 pr-2" onClick={e => e.stopPropagation()}>
                      <button 
                         onClick={() => router.push(`/orders/${order.id}`)}
                         className="text-gray-400 hover:text-[#1E1E24] transition-colors"
                      >
                         <Edit3 size={18} />
                      </button>
                      <button 
                         onClick={() => handleDelete(order.id)}
                         disabled={deletingId === order.id}
                         className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        {deletingId === order.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
