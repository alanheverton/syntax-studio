import { User } from "lucide-react";

export default function SettingsProfile() {
  return (
    <>
      <h2 className="text-xl font-bold text-[#1E1E24] mb-6">Profile Settings</h2>
      
      <div className="flex items-center gap-6 mb-8 pb-8 border-b">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border border-gray-300 overflow-hidden">
           {/* Replaced generic user icon with an actual image, addressing profile request */}
           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              Upload Photo
            </button>
            <button className="text-red-500 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors rounded-md">
              Remove
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-2">Full Name</label>
          <input type="text" defaultValue="Alan" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-md outline-none focus:border-red-400 focus:bg-white transition-all text-sm" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-2">Job Title</label>
          <input type="text" defaultValue="Content Writer" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-md outline-none focus:border-red-400 focus:bg-white transition-all text-sm" />
        </div>
      </div>
      
      <div className="flex flex-col mb-8">
        <label className="text-sm font-medium text-gray-500 mb-2">Email Address</label>
        <input type="email" defaultValue="alan@example.com" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-md outline-none focus:border-red-400 focus:bg-white transition-all text-sm" />
      </div>

      <div className="flex justify-end gap-4">
        <button className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 font-medium py-2 px-6 rounded-md transition-colors text-sm shadow-sm">
          Cancel
        </button>
        <button className="bg-[#1E1E24] hover:bg-black text-white font-medium py-2 px-8 rounded-md transition-colors text-sm shadow-sm">
          Save Changes
        </button>
      </div>
    </>
  );
}
