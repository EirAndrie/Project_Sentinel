import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import SideBar from "../layout/Sidebar.jsx";
import Header from "../layout/Header.jsx";
import CreatorProfileSection from "../sections/creatorProfilesSection/CreatorProfileSection.jsx";
import CreatorAssignedWebsiteSection from "../sections/creatorProfilesSection/CreatorAssignedWebsiteSection.jsx";
import useCreatorWebsites from "../hooks/useCreatorWebsites.js";
import CreatorProfilingModal from "../modal/CreatorProfilingModal.jsx";
import api from "../../lib/axios.js";

export default function ViewCreatorProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  // We manage the creator in local state so it can update seamlessly without a full reload
  const [creator, setCreator] = useState(location.state);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { websites } = useCreatorWebsites({ creatorID: creator?._id });

  // Need the user ID for the modal
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userID = user._id;

  const handleEditSuccess = async () => {
    // Assuming backend returns the updated creator, or we could refetch it.
    // To ensure consistency, let's close the modal and we can reload or fetch if needed.
    // Since we don't have a single GET hook here yet, the simplest way to reflect
    // changes robustly is to stay on the page and reload, or use an API call.
    // For now, reload window to get fresh data from the table via navigation,
    // or we fetch the updated data from the backend.
    try {
      const res = await api.get(`/get-creator/profile/${creator._id}`);
      if (res.data && res.data.success) {
        setCreator(res.data.creator);
        // Also update location state so a refresh doesn't revert
        navigate(location.pathname, { state: res.data.creator, replace: true });
      }
    } catch (err) {
      console.error("Failed to refresh creator after update", err);
    }

    setIsEditModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#FFFF] font-sans">
      {/* Sidebar - App Navigation */}
      <SideBar />

      {/* Main Content View */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <Header
          title={creator?.creator_name ?? "Creator Profile"}
          user="Agent Li"
        />

        {/* Scrollable Layout (Split Column) */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT COLUMN: Profile Info & Metrics */}
            <CreatorProfileSection
              creator={creator}
              onEdit={() => setIsEditModalOpen(true)}
            />

            {/* RIGHT COLUMN: Tabs & Website Grid */}
            <div className="flex-1 flex flex-col">
              {/* Premium Segmented Control Tabs */}
              <div className="mb-6">
                <div className="inline-flex bg-slate-200/50 p-1.5 rounded-xl">
                  <button className="px-5 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-all rounded-lg">
                    Infringement Results
                  </button>
                  <button className="px-5 py-2 text-sm font-bold text-slate-900 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] rounded-lg transition-all">
                    Assigned Websites
                  </button>
                </div>
              </div>
              {/* Website Cards Grid */}
              <CreatorAssignedWebsiteSection websites={websites} />
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <CreatorProfilingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        userID={userID}
        initialData={creator}
      />
    </div>
  );
}
