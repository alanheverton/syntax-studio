import Link from "next/link";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F2F5] font-sans">
      <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <ArrowLeftRight size={28} strokeWidth={3} className="text-[#E63B48]" />
          <span className="text-xl font-bold text-[#1E1E24]">Syntax Studio</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-gray-500 hover:text-[#1E1E24] transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-500 hover:text-[#1E1E24] transition-colors">Pricing</Link>
          <div className="w-px h-6 bg-gray-200"></div>
          <Link href="/" className="text-sm font-semibold text-[#1E1E24] hover:opacity-80 transition-opacity">Log In</Link>
          <Link href="/" className="bg-[#E63B48] hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-[5px] transition-colors text-sm">
            Get Started
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#E63B48] text-xs font-bold uppercase tracking-wider mb-8">
           <span>New: Client Portal 2.0</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-[#1E1E24] tracking-tight max-w-4xl mb-6">
          Manage your writing business with zero friction.
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mb-12">
          Syntax Studio is the ultimate unified workspace for freelance writers and content agencies. Orders, billing, timers, and clients—all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/" className="bg-[#1E1E24] hover:bg-black text-white font-semibold py-4 px-10 rounded-[5px] transition-colors text-base shadow-lg">
            Start your free trial
          </Link>
          <Link href="/" className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-10 rounded-[5px] transition-colors text-base shadow-sm">
            Book a Demo
          </Link>
        </div>
        
        <div className="flex justify-center gap-8 text-gray-400">
           <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> <span className="text-sm font-medium">No credit card required</span></div>
           <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> <span className="text-sm font-medium">14-day free trial</span></div>
           <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> <span className="text-sm font-medium">Cancel anytime</span></div>
        </div>
      </main>
    </div>
  );
}
