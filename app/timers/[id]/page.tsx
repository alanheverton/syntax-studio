"use client";

import { Loader2, Trash2, Clock } from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

// Helper to convert hh:mm:ss to seconds
const timeToSeconds = (timeStr: string) => {
  const [h, m, s] = timeStr.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};

// Helper to convert seconds back to hh:mm:ss
const secondsToTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

export default function EditTimerPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    task: "",
    project: "",
    time: "",
    status: ""
  });

  useEffect(() => {
    fetch(`/api/timers/${id}`)
      .then(res => {
         if (!res.ok) router.push('/timers');
         return res.json();
      })
      .then(data => {
        if (data.timer) setFormData(data.timer);
        setLoading(false);
      })
      .catch(() => router.push('/timers'));
  }, [id, router]);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/timers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           ...formData,
           seconds: timeToSeconds(formData.time)
        })
      });
      router.push("/timers");
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/timers/${id}`, { method: "DELETE" });
      router.push("/timers");
    } catch(e) {
      console.error(e);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-full w-full"><Loader2 className="animate-spin text-red-500" size={32} /></div>;

  return (
    <div className="flex flex-col h-full w-full p-10 font-sans">
       <div className="mb-8">
         <h1 className="text-3xl font-bold text-[#1E1E24]">Edit Timer Log</h1>
         <div className="text-sm text-gray-500/80 mt-2 font-medium">Timers / <span className="text-[#1E1E24]">{formData.task}</span></div>
       </div>

       <div className="max-w-xl bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8">
         <div className="flex flex-col mb-7">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Task Description</label>
           <input type="text" value={formData.task} onChange={e => setFormData({...formData, task: e.target.value})} className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px]" />
         </div>

         <div className="flex flex-col mb-7">
           <label className="text-[13px] font-medium text-gray-700 mb-2.5">Project / Client Name</label>
           <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px]" />
         </div>

         <div className="grid grid-cols-2 gap-6 mb-10">
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Recorded Time</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                 <Clock size={16} className="text-gray-400" />
               </div>
               <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} placeholder="HH:MM:SS" className="font-mono tracking-wider w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px]" />
             </div>
           </div>
           
           <div className="flex flex-col">
             <label className="text-[13px] font-medium text-gray-700 mb-2.5">Status</label>
             <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-white/50 border border-white/40 rounded-[5px] outline-none text-[14px] appearance-none">
               <option value="Running">Running</option>
               <option value="Paused">Paused</option>
               <option value="Completed">Completed</option>
             </select>
           </div>
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
             <button onClick={() => router.back()} className="bg-transparent hover:bg-white/50 text-gray-600 py-2.5 px-6 rounded-[5px] font-medium text-[14px]">
               Cancel
             </button>
           </div>
           
           <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 py-2 px-4 rounded transition-colors font-medium text-sm">
              <Trash2 size={16} /> Delete Log
           </button>
         </div>
       </div>
    </div>
  );
}
