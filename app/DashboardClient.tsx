"use client";

import { useState, useMemo } from "react";
import type { Order } from "@/lib/mockDatabase";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";
import { Filter, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardClient({ initialData }: { initialData: { orders: Order[], stats: { totalOrders: number, pending: number, inProgress: number } } }) {
  const router = useRouter();
  const [data, setData] = useState<{ orders: Order[], stats: { totalOrders: number, pending: number, inProgress: number } }>(initialData);
  
  // Phase 1 Requirements: Filter & Sort state
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/10 text-yellow-700 border border-yellow-500/20";
      case "In Progress": return "bg-blue-500/10 text-blue-700 border border-blue-500/20";
      case "Completed": return "bg-green-500/10 text-green-700 border border-green-500/20";
      default: return "bg-gray-500/10 text-gray-700 border border-gray-500/20";
    }
  };

  // Compute Filtered and Sorted Orders
  const processedOrders = useMemo(() => {
    if (!data?.orders) return [];
    
    let result = [...data.orders];
    
    // Filter
    if (filterStatus !== "All") {
      result = result.filter(o => o.status === filterStatus);
    }
    
    // Sort by creation date
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [data?.orders, filterStatus, sortOrder]);

  const toggleOrderStatus = async (id: string, currentStatus: string) => {
    // Only toggle through active states for demonstration
    const nextStatus = currentStatus === "Pending" ? "In Progress" : 
                       currentStatus === "In Progress" ? "Completed" : "Pending";
                       
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      
      if (res.ok) {
        // Optimistic update
        setData(prev => {
          if (!prev) return prev;
          
          const nextOrders = prev.orders.map(o => o.id === id ? { ...o, status: nextStatus as any } : o);
          return {
            ...prev,
            orders: nextOrders,
             stats: {
                totalOrders: nextOrders.length,
                pending: nextOrders.filter(o => o.status === "Pending").length,
                inProgress: nextOrders.filter(o => o.status === "In Progress").length,
             }
          };
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Compute Orders Over Time (Trailing 6 Months) dynamically
  const revenueData = useMemo(() => {
    if (!data?.orders) return [];

    const result: { name: string, orders: number }[] = [];
    const today = new Date();
    // Initialize last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push({
        name: d.toLocaleDateString('en-US', { month: 'short' }),
        orders: 0
      });
    }

    // Populate with real database orders
    data.orders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
      
      const targetMonth = result.find(m => m.name === monthStr);
      if (targetMonth) {
        targetMonth.orders += 1;
      }
    });

    return result;
  }, [data?.orders]);

  const pieData = [
    { name: 'Pending', value: data?.stats.pending || 0, color: '#f59e0b' },
    { name: 'In Progress', value: data?.stats.inProgress || 0, color: '#3b82f6' },
    { name: 'Completed', value: (data?.stats.totalOrders || 0) - ((data?.stats.pending || 0) + (data?.stats.inProgress || 0)), color: '#10b981' }
  ].filter(item => item.value > 0); 
  const defaultPieData = pieData.length ? pieData : [{ name: 'No Orders', value: 1, color: '#e5e7eb' }];

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans cursor-default">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E24]">Dashboard</h1>
        <div className="text-sm text-gray-500/80 mt-2 font-medium">Home / <span className="text-[#1E1E24]">Overview</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col rounded-2xl">
          <span className="text-gray-600 font-semibold text-sm">Total Orders</span>
          <span className="text-3xl font-bold text-[#1E1E24] mt-2">{data?.stats.totalOrders}</span>
        </div>
        <div className="bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col rounded-2xl">
          <span className="text-gray-600 font-semibold text-sm">Pending</span>
          <span className="text-3xl font-bold text-[#1E1E24] mt-2">{data?.stats.pending}</span>
        </div>
        <div className="bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col rounded-2xl">
          <span className="text-gray-600 font-semibold text-sm">In Progress</span>
          <span className="text-3xl font-bold text-[#1E1E24] mt-2">{data?.stats.inProgress}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 flex flex-col">
          <h3 className="font-bold text-[#1E1E24] mb-4">Orders Over Time</h3>
          <div className="w-full h-[280px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                 <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.4)', rx: 8}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
                 <Bar dataKey="orders" fill="#E63B48" radius={[6, 6, 6, 6]} barSize={32} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 flex flex-col">
          <h3 className="font-bold text-[#1E1E24] mb-2">Order Status</h3>
          <div className="w-full h-[260px] relative">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={defaultPieData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {defaultPieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
               </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
               <span className="text-2xl font-bold text-[#1E1E24]">{data?.stats.totalOrders}</span>
               <span className="text-xs text-gray-500 font-medium h-[1rem]">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Orders Table with Filters and Word Count */}
      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex-1">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-lg font-bold text-[#1E1E24]">Recent Orders</h2>
           <div className="flex gap-4">
              {/* Sorting Logic */}
              <div className="flex items-center gap-2 bg-white/50 border border-black/10 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600">
                 <ArrowUpDown size={14} />
                 <select 
                   value={sortOrder} 
                   onChange={(e) => setSortOrder(e.target.value as any)} 
                   className="bg-transparent outline-none cursor-pointer"
                 >
                   <option value="newest">Newest First</option>
                   <option value="oldest">Oldest First</option>
                 </select>
              </div>
              {/* Filter Logic */}
              <div className="flex items-center gap-2 bg-white/50 border border-black/10 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600">
                 <Filter size={14} />
                 <select 
                   value={filterStatus} 
                   onChange={(e) => setFilterStatus(e.target.value)} 
                   className="bg-transparent outline-none cursor-pointer"
                 >
                   <option value="All">All Statuses</option>
                   <option value="Pending">Pending</option>
                   <option value="In Progress">In Progress</option>
                   <option value="Completed">Completed</option>
                 </select>
              </div>
           </div>
        </div>
        
        <div className="w-full text-left">
          <div className="grid grid-cols-5 pb-3 border-b border-white/40 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Task Details</div>
              <div>Word Count</div>
              <div>Status</div>
              <div>Deadline</div>
          </div>
          <div className="divide-y divide-white/40 text-sm">
            {processedOrders.length === 0 ? (
              <div className="py-8 text-center text-gray-500 font-medium">No orders found matching filters.</div>
            ) : (
              processedOrders.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => router.push(`/orders/${order.id}`)}
                  className="grid grid-cols-5 py-4 items-center cursor-pointer hover:bg-white/40 transition-colors -mx-4 px-4 rounded-lg"
                  title="Click to edit"
                >
                  <div className="col-span-2 pr-4">
                     <div className="font-semibold text-[#1E1E24] truncate">{order.title}</div>
                     <div className="text-xs text-gray-500 mt-0.5">{order.clientName} &bull; {order.contentType}</div>
                  </div>
                  <div className="text-gray-600 font-medium font-mono border-white/40">{order.wordCount} words</div>
                  <div>
                    {/* UPDATE ACTION via Click */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOrderStatus(order.id, order.status);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wide font-bold transition-transform hover:scale-105 active:scale-95 ${getStatusColor(order.status)}`}
                      title="Click to advance status"
                    >
                      {order.status}
                    </button>
                  </div>
                  <div className="text-gray-600 font-medium flex items-center justify-between">
                    {order.deadline}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
