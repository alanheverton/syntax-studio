"use client";

import { useState } from "react";
import { Loader2, Lock, Mail, UserPlus, LogIn } from "lucide-react";
import { signIn, signUp } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Toggle between Sign In and Sign Up modes
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Construct FormData correctly utilizing NextJS Server Actions
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    try {
      const response = isSignUp ? await signUp(formData) : await signIn(formData);
      if (response?.error) {
         setError(response.error);
         setIsSubmitting(false);
      }
      // If success, the Server Action handles the Next.js redirect seamlessly
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center font-sans relative">
      {/* Absolute Gradient Matcher (in case global layouts miss the login route wrapping) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFE9E6] via-[#FFD6D1] to-[#FFC2BC] -z-10" />
      
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 p-10 m-4">
        <div className="text-center mb-8">
           <div className="mx-auto w-16 h-16 bg-[#E63B48] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg mb-6">
             Sx
           </div>
           <h1 className="text-2xl font-bold text-[#1E1E24] mb-2 tracking-tight">Syntax Studio</h1>
           <p className="text-sm font-medium text-gray-500/90">
             {isSignUp ? "Create a new administrator account." : "Sign in to securely access your data ecosystem."}
           </p>
        </div>

        {/* Custom Toggle Switch */}
        <div className="flex bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl p-1 mb-8 relative">
           <button 
             type="button"
             onClick={() => { setIsSignUp(false); setError(null); }}
             className={`flex-1 py-2 text-sm font-bold flex items-center justify-center gap-2 rounded-lg transition-all z-10 ${!isSignUp ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
           >
              <LogIn size={16} /> Sign In
           </button>
           <button 
             type="button"
             onClick={() => { setIsSignUp(true); setError(null); }}
             className={`flex-1 py-2 text-sm font-bold flex items-center justify-center gap-2 rounded-lg transition-all z-10 ${isSignUp ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
           >
              <UserPlus size={16} /> Create Account
           </button>
           {/* Animated Sliding Background Slider */}
           <div 
             className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#E63B48] rounded-lg transition-transform duration-300 ease-in-out ${isSignUp ? 'translate-x-full left-1' : 'translate-x-0 left-1'}`}
           />
        </div>

        {error && (
           <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-md border border-red-100 rounded-xl text-red-600 text-sm font-medium text-center">
             {error}
           </div>
        )}

        <form suppressHydrationWarning onSubmit={handleSubmit} className="flex flex-col gap-5">
           <div className="flex flex-col">
             <label className="text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Mail size={16} className="text-gray-400" />
               </div>
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl outline-none focus:border-red-400 focus:bg-white/80 transition-all text-[14px]" 
                 placeholder="name@agency.com"
               />
             </div>
           </div>

           <div className="flex flex-col">
             <label className="text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Secure Password</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Lock size={16} className="text-gray-400" />
               </div>
               <input 
                 type="password" 
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl outline-none focus:border-red-400 focus:bg-white/80 transition-all text-[14px]" 
                 placeholder="••••••••"
               />
             </div>
           </div>

           <button 
             type="submit"
             disabled={isSubmitting}
             className="mt-4 w-full bg-[#E63B48] hover:bg-red-600 active:bg-red-700 disabled:opacity-70 flex justify-center items-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md text-[14px]"
           >
             {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : (isSignUp ? "Register Account" : "Authenticate Identity")}
           </button>
        </form>
        
        <p className="mt-8 text-center text-[12px] font-medium text-gray-400">
          This system is restricted to authorized personnel only. 
          <br/> All session entries are logged.
        </p>
      </div>
    </div>
  );
}
