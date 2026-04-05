"use client";

import { Download, FileText, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Invoice } from "@/lib/mockDatabase";

export default function BillingPageClient({ initialInvoices }: { initialInvoices: Invoice[] }) {
  const router = useRouter();
  const [invoices] = useState<Invoice[]>(initialInvoices);

  const parseAmount = (amount: string | number) => {
    if (typeof amount === 'number') return amount;
    return parseFloat(amount.replace(/[^0-9.-]+/g,"")) || 0;
  };

  const formatAmount = (num: number) => {
    return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const { monthlyRevenue, pendingAmount, overdueAmount } = useMemo(() => {
    let rev = 0, pend = 0, over = 0;
    invoices.forEach(inv => {
      const val = parseAmount(inv.amount);
      if (inv.status === "Paid") rev += val;
      else if (inv.status === "Pending") pend += val;
      else if (inv.status === "Overdue") over += val;
    });
    return { monthlyRevenue: rev, pendingAmount: pend, overdueAmount: over };
  }, [invoices]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-500/10 text-green-700 border border-green-500/20";
      case "Pending": return "bg-yellow-500/10 text-yellow-700 border border-yellow-500/20";
      case "Overdue": return "bg-red-500/10 text-red-700 border border-red-500/20";
      default: return "bg-gray-500/10 text-gray-700 border border-gray-500/20";
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1E24]">Billing</h1>
          <div className="text-sm text-gray-500/80 mt-2 font-medium">Home / <span className="text-[#1E1E24]">Invoices</span></div>
        </div>
        <Link href="/billing/new" className="bg-[#E63B48] hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-[5px] transition-colors text-[14px] flex items-center gap-2">
           <Plus size={16} /> Create Invoice
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col rounded-2xl">
            <span className="text-gray-600 font-semibold text-sm">Monthly Revenue</span>
            <span className="text-3xl font-bold text-[#1E1E24] mt-2">{formatAmount(monthlyRevenue)}</span>
         </div>
         <div className="bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col rounded-2xl">
            <span className="text-gray-600 font-semibold text-sm">Pending Invoices</span>
            <span className="text-3xl font-bold text-[#1E1E24] mt-2">{formatAmount(pendingAmount)}</span>
         </div>
         <div className="bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col rounded-2xl">
            <span className="text-gray-600 font-semibold text-sm">Overdue</span>
            <span className="text-3xl font-bold text-red-500 mt-2">{formatAmount(overdueAmount)}</span>
         </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex-1">
         <h2 className="text-lg font-bold text-[#1E1E24] mb-6">Recent Invoices</h2>
         <div className="w-full text-left">
            <div className="grid grid-cols-5 pb-3 border-b border-white/40 text-sm font-semibold text-gray-500 uppercase tracking-wider">
               <div>Invoice</div>
               <div>Client</div>
               <div>Amount</div>
               <div>Status</div>
               <div className="text-right">Actions</div>
            </div>
            <div className="divide-y divide-white/40 text-sm">
               {invoices.length === 0 ? (
                 <div className="py-8 flex justify-center text-gray-500 font-medium">No active invoices found.</div>
               ) : invoices.map((invoice) => (
                  <div 
                    key={invoice.id} 
                    onClick={() => router.push(`/billing/${invoice.id}`)}
                    className="grid grid-cols-5 py-4 items-center cursor-pointer hover:bg-white/40 transition-colors -mx-4 px-4 rounded-lg group"
                  >
                     <div className="font-semibold text-[#1E1E24] flex items-center gap-2 group-hover:text-red-500 transition-colors">
                        <FileText size={16} className="text-gray-400" />
                        {invoice.invoiceNumber}
                     </div>
                     <div className="text-gray-600 font-medium">{invoice.clientName}</div>
                     <div className="font-bold text-[#1E1E24]">{invoice.amount}</div>
                     <div>
                        <span className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wide font-bold ${getStatusColor(invoice.status)}`}>
                           {invoice.status}
                        </span>
                     </div>
                     <div className="flex justify-end">
                        <button className="text-gray-400 hover:text-[#1E1E24] transition-colors p-1 flex items-center justify-center">
                           <Download size={18} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
