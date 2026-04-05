export default function BillingSettings() {
  return (
    <>
      <h2 className="text-xl font-bold text-[#1E1E24] mb-6">Billing Settings</h2>
      <p className="text-sm text-gray-500 mb-8">Manage your subscription and payment methods.</p>
      
      <div className="flex flex-col gap-6 max-w-2xl">
         <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-6 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-1">Current Plan</p>
              <p className="font-bold text-xl text-[#1E1E24]">Pro Workspace</p>
              <p className="text-sm text-gray-500 mt-1">$29.00 / month</p>
            </div>
            <button className="bg-white border border-gray-200 text-[#E63B48] font-medium py-2 px-6 rounded-md transition-colors text-sm shadow-sm hover:bg-gray-50">
              Upgrade Plan
            </button>
         </div>

         <div className="mt-4">
           <h3 className="font-bold text-[#1E1E24] mb-4">Payment Method</h3>
           <div className="flex items-center gap-4 py-4 border-b">
              <div className="w-12 h-8 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold font-serif">visa</div>
              <div>
                 <p className="text-sm font-semibold text-[#1E1E24]">Visa ending in 4242</p>
                 <p className="text-xs text-gray-500">Expires 12/2028</p>
              </div>
           </div>
         </div>
      </div>
    </>
  );
}
