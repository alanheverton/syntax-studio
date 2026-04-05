"use client";

import { CheckCircle2, User, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    clientName: "Wavespace",
    invoiceNumber: "INV-2026-005",
    amount: "0.00"
  });
  
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           ...formData,
           amount: `$${Number(formData.amount).toFixed(2)}`,
           status: "Draft"
        })
      });
      router.push("/billing");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E24]">Billing</h1>
        <div className="text-sm text-gray-500/80 mt-2 font-medium">Invoices / <span className="text-[#1E1E24]">Create Invoice</span></div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 max-w-4xl">
         <h2 className="text-[17px] font-bold text-[#1E1E24] mb-1.5">Create New Invoice</h2>
         <p className="text-[13px] text-gray-600 mb-8 font-medium">Input invoice details to bill a client.</p>
         
         <div className="flex flex-col mb-7">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Select Client</label>
           <select 
             value={formData.clientName}
             onChange={e => setFormData({ ...formData, clientName: e.target.value })}
             className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]">
               <option>Select a Client...</option>
               <option>Wavespace</option>
               <option>Syntax Studio</option>
               <option>TechFlow</option>
               <option>Nova Retail</option>
           </select>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-7">
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Invoice Number</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                 <FileText size={16} className="text-gray-400" />
               </div>
               <input type="text" value={formData.invoiceNumber} onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
             </div>
           </div>
           
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Total Amount ($)</label>
             <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} placeholder="250.00" className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
           </div>
         </div>

         <div className="flex flex-col mb-10">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Line Items Description</label>
           <textarea rows={3} placeholder="Describe the content deliveries..." className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
         </div>

         {/* Actions */}
         <div className="flex gap-4 pt-4 border-t border-white/40">
           <button 
             onClick={handleSave}
             disabled={isSubmitting}
             className="bg-[#E63B48] hover:bg-red-600 focus:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-white font-semibold py-2.5 px-8 rounded-[5px] transition-colors text-[14px]"
           >
             {isSubmitting && <Loader2 size={16} className="animate-spin" />}
             Send Invoice
           </button>
           <button onClick={() => router.back()} className="bg-transparent hover:bg-white/40 text-gray-700 border border-transparent font-medium py-2.5 px-6 rounded-[5px] transition-colors text-[14px]">
             Cancel
           </button>
         </div>
      </div>
    </div>
  );
}
