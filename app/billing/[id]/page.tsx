"use client";

import { FileText, Loader2, Trash2 } from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    clientName: "",
    invoiceNumber: "",
    amount: "",
    status: "Draft"
  });

  useEffect(() => {
    fetch(`/api/invoices/${id}`)
      .then(res => {
         if (!res.ok) router.push('/billing');
         return res.json();
      })
      .then(data => {
        if (data.invoice) {
           // Strips out '$' sign for editing
           const amt = typeof data.invoice.amount === 'string' ? data.invoice.amount.replace('$', '').replace(/,/g, '') : data.invoice.amount;
           setFormData({ ...data.invoice, amount: amt });
        }
        setLoading(false);
      })
      .catch(() => router.push('/billing'));
  }, [id, router]);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           ...formData,
           amount: `$${Number(formData.amount).toFixed(2)}`
        })
      });
      router.push("/billing");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      router.push("/billing");
    } catch(e) {
      console.error(e);
    }
  };

  if (loading) return <div className="flex justify-center flex-1 h-full items-center"><Loader2 className="animate-spin text-red-500" size={32} /></div>;

  return (
    <div className="flex flex-col h-full w-full p-10 font-sans">
       <div className="mb-8">
         <h1 className="text-3xl font-bold text-[#1E1E24]">Edit Invoice</h1>
         <div className="text-sm text-gray-500/80 mt-2 font-medium">Billing / <span className="text-[#1E1E24]">{formData.invoiceNumber}</span></div>
       </div>

       <div className="max-w-2xl bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8">
         <div className="flex flex-col mb-7">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Client Name / Company</label>
           <input 
             value={formData.clientName}
             onChange={e => setFormData({ ...formData, clientName: e.target.value })}
             className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 text-[14px]"
           />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-7">
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Invoice Number</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                 <FileText size={16} className="text-gray-400" />
               </div>
               <input type="text" value={formData.invoiceNumber} onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px]" />
             </div>
           </div>
           
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Total Amount ($)</label>
             <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px]" />
           </div>
         </div>
         
         <div className="flex flex-col mb-10">
            <label className="text-[13px] font-medium text-gray-700 mb-2.5">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px] cursor-pointer appearance-none">
               <option value="Draft">Draft</option>
               <option value="Pending">Pending</option>
               <option value="Paid">Paid</option>
               <option value="Overdue">Overdue</option>
            </select>
         </div>

         <div className="flex justify-between items-center pt-6 border-t border-black/5">
           <div className="flex gap-4">
             <button 
               onClick={handleUpdate}
               disabled={isSubmitting}
               className="bg-[#E63B48] hover:bg-red-600 disabled:opacity-70 flex items-center gap-2 text-white font-semibold py-2.5 px-8 rounded-[5px] text-[14px]"
             >
               {isSubmitting && <Loader2 size={16} className="animate-spin" />}
               Save Changes
             </button>
             <button onClick={() => router.back()} className="bg-transparent hover:bg-white/50 text-gray-600 py-2.5 px-6 rounded-[5px] text-[14px]">
               Cancel
             </button>
           </div>
           
           <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 py-2 px-4 rounded transition-colors font-medium text-sm">
              <Trash2 size={16} /> Delete Invoice
           </button>
         </div>
       </div>
    </div>
  );
}
