export default function NotificationSettings() {
  return (
    <>
      <h2 className="text-xl font-bold text-[#1E1E24] mb-6">Notification Settings</h2>
      <p className="text-sm text-gray-500 mb-8">Choose what you want to be notified about.</p>
      
      <div className="flex flex-col gap-6 max-w-xl">
         <div className="flex items-center justify-between py-3 border-b">
           <div>
             <p className="font-semibold text-sm text-[#1E1E24]">New Order Received</p>
             <p className="text-xs text-gray-500">Get an email when a client creates a new content order.</p>
           </div>
           <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#E63B48]" />
         </div>
         <div className="flex items-center justify-between py-3 border-b">
           <div>
             <p className="font-semibold text-sm text-[#1E1E24]">Deadline Upcoming</p>
             <p className="text-xs text-gray-500">Get notified 24 hours before a deadline.</p>
           </div>
           <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#E63B48]" />
         </div>
         <div className="flex items-center justify-between py-3 border-b">
           <div>
             <p className="font-semibold text-sm text-[#1E1E24]">Marketing & Promos</p>
             <p className="text-xs text-gray-500">Receive tips and feature updates from Syntax Studio.</p>
           </div>
           <input type="checkbox" className="w-4 h-4 accent-[#E63B48]" />
         </div>
         
         <div className="mt-4 flex justify-end gap-4">
          <button className="bg-[#1E1E24] hover:bg-black text-white font-medium py-2 px-8 rounded-md transition-colors text-sm shadow-sm">
            Save Preferences
          </button>
        </div>
      </div>
    </>
  );
}
