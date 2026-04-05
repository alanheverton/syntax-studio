"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTimerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    task: "",
    project: ""
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/timers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      router.push("/timers");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-10 font-sans">
       <div className="mb-8">
         <h1 className="text-3xl font-bold text-[#1E1E24]">New Timer</h1>
         <div className="text-sm text-gray-500/80 mt-2 font-medium">Timers / <span className="text-[#1E1E24]">Define Task</span></div>
       </div>

       <div className="max-w-xl bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8">
         <div className="flex flex-col mb-7">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Task Description</label>
           <input type="text" value={formData.task} onChange={e => setFormData({...formData, task: e.target.value})} placeholder="e.g. Editing Q4 Copy" className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 text-[14px]" />
         </div>

         <div className="flex flex-col mb-10">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Project / Client Name</label>
           <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} placeholder="e.g. Syntax Studio" className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none focus:border-red-400 text-[14px]" />
         </div>

         <div className="flex gap-4 pt-6 border-t border-black/5">
           <button 
             onClick={handleSave}
             disabled={isSubmitting || !formData.task}
             className="bg-[#E63B48] hover:bg-red-600 disabled:opacity-70 flex items-center gap-2 text-white font-semibold py-2.5 px-8 rounded-[5px] text-[14px]"
           >
             {isSubmitting && <Loader2 size={16} className="animate-spin" />}
             Start Timer Record
           </button>
           <button onClick={() => router.back()} className="bg-transparent hover:bg-white/50 text-gray-600 py-2.5 px-6 rounded-[5px] font-medium text-[14px]">
             Cancel
           </button>
         </div>
       </div>
    </div>
  );
}
