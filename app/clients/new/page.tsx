"use client";

import { User, Mail, MapPin, Flag, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: ""
  });
  
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      router.push("/clients");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E24]">Clients</h1>
        <div className="text-sm text-gray-500/80 mt-2 font-medium">Clients / <span className="text-[#1E1E24]">New Client</span></div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 max-w-4xl">
         <h2 className="text-[17px] font-bold text-[#1E1E24] mb-1.5">Create New Client</h2>
         <p className="text-[13px] text-gray-600 mb-8 font-medium">Enter client details to register them in your portal.</p>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-7">
           {/* First Name */}
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">First Name</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                 <User size={16} className="text-gray-400" />
               </div>
               <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="Shahid" className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
             </div>
           </div>
           
           {/* Last Name */}
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Last Name</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                 <User size={16} className="text-gray-400" />
               </div>
               <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Miah" className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
             </div>
           </div>
         </div>

         {/* Add a Company Name */}
         <div className="flex flex-col mb-7">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Company Name</label>
           <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="e.g. Wavespace Agency" className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
         </div>

         {/* Email */}
         <div className="flex flex-col mb-10">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Email Address</label>
           <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
               <Mail size={16} className="text-gray-400" />
             </div>
             <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="shahid@wavespace.agency" className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 focus:bg-white transition-all text-[14px]" />
           </div>
         </div>

         {/* Actions */}
         <div className="flex gap-4 pt-4 border-t border-white/40">
           <button 
             onClick={handleSave}
             disabled={isSubmitting}
             className="bg-[#E63B48] hover:bg-red-600 focus:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-white font-semibold py-2.5 px-8 rounded-[5px] transition-colors text-[14px]"
           >
             {isSubmitting && <Loader2 size={16} className="animate-spin" />}
             Register Client
           </button>
           <button onClick={() => router.back()} className="bg-transparent hover:bg-white/40 text-gray-700 border border-transparent font-medium py-2.5 px-6 rounded-[5px] transition-colors text-[14px]">
             Cancel
           </button>
         </div>
      </div>
    </div>
  );
}
