"use client";

import { Play, Pause, Square, Plus, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Timer } from "@/lib/mockDatabase";

const secondsToTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

export default function TimersPageClient({ initialTimers }: { initialTimers: Timer[] }) {
  const router = useRouter();
  const [timers, setTimers] = useState<Timer[]>(initialTimers);
  
  const [focusTimerId, setFocusTimerId] = useState<string | null>(
    timers.find((t: Timer) => t.status === "Running")?.id || (timers.length > 0 ? timers[0].id : null)
  );

  // Tick interval for active timers
  useEffect(() => {
    if (timers.length === 0) return;
    const intervalId = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (timer.status === "Running") {
            const nextSeconds = timer.seconds + 1;
            // Every 10 seconds, blindly sync up to backend to ensure DB mirrors visually
            if (nextSeconds % 5 === 0) {
               fetch(`/api/timers/${timer.id}`, {
                 method: "PUT",
                 headers: {"Content-Type": "application/json"},
                 body: JSON.stringify({ seconds: nextSeconds, time: secondsToTime(nextSeconds) })
               });
            }
            return { ...timer, seconds: nextSeconds, time: secondsToTime(nextSeconds) };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timers.length]);

  const toggleTimerStatus = async (id: string, newStatus: string) => {
    // Optimistic update locally
    setTimers(prev => prev.map(t => t.id === id ? { ...t, status: newStatus as any } : t));
    
    // Sync backend
    await fetch(`/api/timers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
  };
  
  const activeTimer = timers.find(t => t.id === focusTimerId) || timers[0];

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-10 font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1E24]">Timers</h1>
          <div className="text-sm text-gray-500/80 mt-2 font-medium">Home / <span className="text-[#1E1E24]">Timers</span></div>
        </div>
        <button 
          onClick={() => router.push('/timers/new')}
          className="bg-[#E63B48] hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-[5px] transition-colors text-[14px] flex items-center gap-2"
        >
           <Plus size={16} /> Start New Timer
        </button>
      </div>

      {timers.length === 0 ? (
         <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-12 flex flex-col items-center justify-center mb-8">
            <h2 className="text-lg font-bold text-[#1E1E24] mb-2">No Active Timers</h2>
            <p className="text-gray-500 text-sm mb-6">Create a Timer to log activity tracking.</p>
         </div>
      ) : (
         <>
         {/* Active Timer Card */}
         <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex flex-col mb-8 transition-all">
            <div className="flex justify-between items-center w-full">
               <div>
                  <h2 className="text-lg font-bold text-[#1E1E24]">Current Focus</h2>
                  <p className="text-sm text-gray-600 font-medium mt-1">{activeTimer?.task} - <span className="font-semibold">{activeTimer?.project}</span></p>
               </div>
               <div className="flex items-center gap-6">
                  <span className="text-4xl font-black text-[#1E1E24] tracking-wider font-mono w-[200px] text-right">
                    {activeTimer?.time}
                  </span>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => toggleTimerStatus(activeTimer.id, activeTimer.status === "Running" ? "Paused" : "Running")}
                       disabled={activeTimer.status === "Completed"}
                       className={`w-12 h-12 rounded-full ${activeTimer.status === "Running" ? "bg-yellow-500 hover:bg-yellow-600" : activeTimer.status === "Completed" ? "bg-gray-200" : "bg-green-500 hover:bg-green-600"} text-white flex items-center justify-center transition-colors shadow-md disabled:opacity-50`}
                     >
                        {activeTimer.status === "Running" ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
                     </button>
                     <button 
                       onClick={() => toggleTimerStatus(activeTimer.id, "Completed")}
                       disabled={activeTimer.status === "Completed"}
                       className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                     >
                        <Square fill="currentColor" size={18} />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex-1">
            <h2 className="text-lg font-bold text-[#1E1E24] mb-6">Recent Timelogs</h2>
            <div className="w-full text-left">
               <div className="grid grid-cols-5 pb-3 border-b border-white/40 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-2">Task / Project</div>
                  <div>Time Logged</div>
                  <div className="text-center">Status</div>
                  <div className="text-right">Actions</div>
               </div>
               <div className="divide-y divide-white/40 text-sm">
                  {timers.map((timer) => (
                     <div 
                       key={timer.id}
                       onClick={() => router.push(`/timers/${timer.id}`)}
                       className={`grid grid-cols-5 py-4 items-center cursor-pointer transition-colors group ${focusTimerId === timer.id ? 'bg-white/30 -mx-4 px-4 rounded-lg' : 'hover:bg-white/20 -mx-4 px-4 rounded-lg'}`}
                     >
                        <div className="col-span-2">
                           <div className="font-semibold text-[#1E1E24] mb-0.5 group-hover:text-red-500 transition-colors">{timer.task}</div>
                           <div className="text-xs text-gray-500">{timer.project}</div>
                        </div>
                        <div className="font-mono text-gray-700 font-bold">{timer.time}</div>
                        
                        <div className="text-center flex items-center justify-center">
                           <span 
                             onClick={(e) => { e.stopPropagation(); setFocusTimerId(timer.id); }}
                             className={`px-3 py-1.5 cursor-pointer hover:opacity-80 rounded-full text-[10.5px] uppercase tracking-wider font-bold ${
                             timer.status === "Running" ? "bg-green-100/50 text-green-700 hover:bg-green-200" :
                             timer.status === "Paused" ? "bg-yellow-100/50 text-yellow-700 hover:bg-yellow-200" :
                             "bg-gray-100/50 text-gray-500 hover:bg-gray-200"
                           }`} title="Set as Current Focus">
                             {timer.status}
                           </span>
                        </div>
                        
                        <div className="flex justify-end pr-2 gap-3 text-gray-400" onClick={(e) => e.stopPropagation()}>
                           {/* Quick Action Toggles */}
                           {timer.status === "Running" ? (
                              <Pause onClick={() => toggleTimerStatus(timer.id, "Paused")} size={18} className="cursor-pointer hover:text-yellow-600" />
                           ) : timer.status === "Paused" ? (
                              <Play onClick={() => toggleTimerStatus(timer.id, "Running")} size={18} className="cursor-pointer hover:text-green-600" />
                           ) : timer.status === "Completed" ? (
                              <Square className="text-gray-300 pointer-events-none" size={16} />
                           ) : null}
                           
                           {/* Full Edit Action */}
                           <button onClick={(e) => { e.stopPropagation(); router.push(`/timers/${timer.id}`); }} className="hover:text-black ml-3">
                              <Edit3 size={18} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         </>
      )}
    </div>
  );
}
