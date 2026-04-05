export default function SecuritySettings() {
  return (
    <>
      <h2 className="text-xl font-bold text-[#1E1E24] mb-6">Security Settings</h2>
      <p className="text-sm text-gray-500 mb-8">Manage your password and security preferences.</p>
      
      <div className="flex flex-col gap-6 max-w-lg">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-2">Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-md outline-none focus:border-red-400 focus:bg-white transition-all text-sm" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-2">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-md outline-none focus:border-red-400 focus:bg-white transition-all text-sm" />
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-end gap-4">
          <button className="bg-[#1E1E24] hover:bg-black text-white font-medium py-2 px-8 rounded-md transition-colors text-sm shadow-sm">
            Update Password
          </button>
        </div>

        <div className="mt-8">
           <h3 className="font-bold text-[#1E1E24] mb-2">Two-Factor Authentication</h3>
           <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account.</p>
           <button className="bg-white border border-gray-200 text-gray-700 font-medium py-2 px-6 rounded-md transition-colors text-sm shadow-sm hover:bg-gray-50">
             Enable 2FA
           </button>
        </div>
      </div>
    </>
  );
}
