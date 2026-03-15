import { X } from "lucide-react";

export default function CreatorProfilingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Backdrop overlay with blur
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 font-sans">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Add Creator</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-8 overflow-y-auto space-y-7">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Elena Voss"
              defaultValue="e.g. Elena Voss"
              // The default text color is matched to the design,
              // and the border/ring are set to simulate the active focus state shown in your image.
              className="w-full px-4 py-2.5 border border-yellow-500 text-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm"
            />
          </div>

          {/* Official Website URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Official Website URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm font-mono placeholder-gray-400"
            />
          </div>

          {/* Handles */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Handles
            </label>
            <div className="flex space-x-3 mb-3">
              <select className="w-1/3 px-3 py-2.5 border border-gray-200 rounded-md shadow-sm bg-white text-sm text-gray-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none cursor-pointer">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Twitter</option>
                <option>YouTube</option>
              </select>
              <input
                type="text"
                placeholder="@handle"
                className="w-2/3 px-4 py-2.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm font-mono placeholder-slate-400"
              />
            </div>
            <button className="inline-flex items-center px-4 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              + Add Handle
            </button>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Profile Photo
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                Click to upload or drag and drop
              </span>
            </div>
          </div>

          {/* Known Content URLs */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Known Content URLs
            </label>
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="https://..."
                className="w-2/3 px-4 py-2.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm font-mono placeholder-slate-400"
              />
              <select className="w-1/3 px-3 py-2.5 border border-gray-200 rounded-md shadow-sm bg-white text-sm text-gray-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none cursor-pointer">
                <option>Image</option>
                <option>Video</option>
                <option>Account</option>
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              + Add URL
            </button>
          </div>
        </div>

        {/* Footer / Submit */}
        <div className="p-8 pt-4 border-t border-gray-100 bg-white shrink-0">
          <button className="w-full bg-[#CAA128] hover:bg-[#B58F20] text-white font-semibold py-3 rounded-md transition-colors shadow-sm">
            Create Creator
          </button>
        </div>
      </div>
    </div>
  );
}

/* USE CASE

import { useState } from "react";
import AddCreatorModal from "./AddCreatorModal";

export default function CreatorProfiles() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
        <div className="flex-1 overflow-auto p-8">
          <SearchBar
            title="Creator Profiles"
            button={{
              label: "Add Creator",
              onClick: () => setIsModalOpen(true),
            }}
          />
        </div>

      <AddCreatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

*/
