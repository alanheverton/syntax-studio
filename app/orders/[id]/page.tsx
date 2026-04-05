"use client";

import { FileText, Loader2, Type, Calendar, Trash2 } from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "Blog Post",
    wordCount: 0,
    clientName: "",
    clientEmail: "",
    deadline: "",
    status: ""
  });

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => {
         if (!res.ok) router.push('/orders');
         return res.json();
      })
      .then(data => {
        if (data.order) setFormData(data.order);
        setLoading(false);
      })
      .catch(() => router.push('/orders'));
  }, [id, router]);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push("/orders");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
       await fetch(`/api/orders/${id}`, { method: "DELETE" });
       router.push("/orders");
    } catch(e) {
       console.error(e);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-full w-full"><Loader2 className="animate-spin text-red-500" size={32} /></div>;

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E24]">Edit Order</h1>
        <div className="text-sm text-gray-500/80 mt-2 font-medium">Orders / <span className="text-[#1E1E24]">{formData.title}</span></div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8">
           <h2 className="text-[17px] font-bold text-[#1E1E24] mb-8">Update Order Specifications</h2>
           
           <div className="mb-7">
             <div className="flex flex-col">
               <label className="text-[13px] font-medium text-[#707070] mb-2.5">Order Title</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                   <Type size={16} className="text-gray-400" />
                 </div>
                 <input 
                   type="text" 
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" 
                 />
               </div>
             </div>
             
             <div className="flex gap-6 mt-7">
               <div className="flex-1 flex flex-col">
                 <label className="text-[13px] font-medium text-[#707070] mb-2.5">Content Type</label>
                 <select 
                   value={formData.contentType}
                   onChange={e => setFormData({...formData, contentType: e.target.value})}
                   className="w-full px-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px] appearance-none"
                 >
                   <option>Blog Post</option>
                   <option>Website Copy</option>
                   <option>Email</option>
                   <option>Product Description</option>
                 </select>
               </div>
               <div className="flex-1 flex flex-col">
                 <label className="text-[13px] font-medium text-[#707070] mb-2.5">Word Count</label>
                 <input 
                   type="number" 
                   value={formData.wordCount}
                   onChange={e => setFormData({...formData, wordCount: Number(e.target.value)})}
                   className="w-full px-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" 
                 />
               </div>
               <div className="flex-1 flex flex-col">
                 <label className="text-[13px] font-medium text-[#707070] mb-2.5">Status</label>
                 <select 
                   value={formData.status}
                   onChange={e => setFormData({...formData, status: e.target.value})}
                   className="w-full px-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px] appearance-none cursor-pointer"
                 >
                   <option value="Pending">Pending</option>
                   <option value="In Progress">In Progress</option>
                   <option value="Completed">Completed</option>
                 </select>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-7">
             <div className="flex flex-col">
               <label className="text-[13px] font-medium text-[#707070] mb-2.5">Client</label>
               <input 
                 value={formData.clientName}
                 disabled
                 className="w-full px-4 py-2.5 bg-gray-100/50 text-gray-500 border border-[#E5E6EB] rounded-[5px] outline-none text-[14px]"
               />
             </div>
             
             <div className="flex flex-col">
               <label className="text-[13px] font-medium text-[#707070] mb-2.5">Deadline</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                   <Calendar size={16} className="text-gray-400" />
                 </div>
                 <input 
                   type="text" 
                   value={formData.deadline}
                   onChange={e => setFormData({...formData, deadline: e.target.value})}
                   className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-[#E5E6EB] rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" 
                 />
               </div>
             </div>
           </div>

           <div className="flex flex-col mb-10">
             <label className="text-[13px] font-medium text-[#707070] mb-2.5">Description / Brief</label>
             <div className="relative">
                 <textarea 
                   rows={3} 
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   className="w-full px-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" 
                 />
             </div>
           </div>

           {/* Actions with Delete Button */}
           <div className="flex justify-between items-center pt-6 border-t border-black/5">
             <div className="flex gap-4">
               <button 
                 onClick={handleUpdate}
                 disabled={isSubmitting}
                 className="bg-[#E63B48] hover:bg-red-600 focus:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-white font-semibold py-2.5 px-8 rounded-[5px] transition-colors text-[14px]"
               >
                 {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                 Save Changes
               </button>
               <button onClick={() => router.back()} className="bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent font-medium py-2.5 px-6 rounded-[5px] transition-colors text-[14px]">
                 Cancel
               </button>
             </div>
             
             <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 py-2 px-4 rounded transition-colors font-medium text-sm">
                <Trash2 size={16} /> Delete Order
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
