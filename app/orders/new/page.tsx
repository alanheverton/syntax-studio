"use client";

import { FileText, Loader2, Link as LinkIcon, Type, Calendar } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewOrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "Blog Post",
    wordCount: 0,
    clientName: "Wavespace",
    clientEmail: "orders@wavespace.agency",
    deadline: ""
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push("/orders");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E24]">Orders</h1>
        <div className="text-sm text-gray-500/80 mt-2 font-medium">Orders / <span className="text-[#1E1E24]">New Order</span></div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Form Container */}
        <div className="flex-1 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8">
           <h2 className="text-[17px] font-bold text-[#1E1E24] mb-1.5">Welcome To Order Creation</h2>
           <p className="text-[13px] text-gray-500 mb-8 font-medium">Fill in the fields below to schedule a new content writing task.</p>
           
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
                   placeholder="e.g. Q4 SEO Blog Post" 
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
                   placeholder="e.g. 1500" 
                   className="w-full px-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" 
                 />
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-7">
             <div className="flex flex-col">
               <label className="text-[13px] font-medium text-[#707070] mb-2.5">Select Client</label>
               <div className="relative">
                 <select 
                   value={formData.clientName}
                   onChange={e => setFormData({...formData, clientName: e.target.value})}
                   className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-[#E5E6EB] rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px] appearance-none"
                 >
                   <option>Wavespace</option>
                   <option>Syntax Studio</option>
                   <option>TechFlow</option>
                   <option>Nova Retail</option>
                 </select>
                 <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                   <span className="text-gray-400 text-xs">▼</span>
                 </div>
               </div>
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
                   placeholder="e.g. Oct 31, 2026" 
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
                   placeholder="Outline the goals and context of this order..." 
                   className="w-full px-4 py-2.5 bg-[#FAFAFA]/50 border border-black/10 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" 
                 />
             </div>
           </div>

           {/* Actions */}
           <div className="flex gap-4">
             <button 
               onClick={handleSave}
               disabled={isSubmitting || !formData.title || !formData.deadline}
               className="bg-[#E63B48] hover:bg-red-600 focus:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-white font-semibold py-2.5 px-8 rounded-[5px] transition-colors text-[14px]"
             >
               {isSubmitting && <Loader2 size={16} className="animate-spin" />}
               Create Order
             </button>
             <button onClick={() => router.back()} className="bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent font-medium py-2.5 px-6 rounded-[5px] transition-colors text-[14px]">
               Cancel
             </button>
           </div>
        </div>

        {/* Right Settings Container kept matching the original mockup requested */}
        <div className="w-full xl:w-[350px]">
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-7 h-fit shrink-0">
             <h3 className="text-[17px] font-bold text-[#1E1E24] mb-8">Order Settings</h3>
             
             <div className="flex flex-col gap-6">
               <div className="flex items-start justify-between group cursor-pointer">
                 <div className="flex gap-4">
                   <div className="mt-0.5 text-[#9CA3AF]"><FileText size={18} strokeWidth={2.5} /></div>
                   <div>
                     <p className="font-semibold text-[14px] text-[#1E1E24]">Auto-Generate Briefs</p>
                     <p className="text-[12px] text-gray-500 mt-1 font-medium">Create AI drafts automatically</p>
                   </div>
                 </div>
                 <div className="text-[13px] font-semibold text-gray-500 flex items-center gap-1.5 group-hover:text-gray-800 transition-colors mt-0.5">
                   No <span className="text-lg leading-none mt-[-2px]">›</span>
                 </div>
               </div>
               
               <div className="w-full h-px bg-[#F3F4F6]"></div>

               <div className="flex items-start justify-between group cursor-pointer">
                 <div className="flex gap-4">
                   <div className="mt-0.5 text-[#9CA3AF] flex items-center justify-center font-bold font-sans">
                     <span className="text-[13px]">A</span>
                     <span className="text-[10px] ml-0.5">文</span>
                   </div>
                   <div>
                     <p className="font-semibold text-[14px] text-[#1E1E24]">Review Language</p>
                     <p className="text-[12px] text-gray-500 mt-1 font-medium">US English</p>
                   </div>
                 </div>
                 <div className="text-[13px] font-semibold text-gray-500 flex items-center gap-1.5 group-hover:text-gray-800 transition-colors mt-0.5">
                   Yes <span className="text-lg leading-none mt-[-2px]">›</span>
                 </div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
