import { useState } from "react";
import Sidebar from "../layout/Sidebar.jsx";
import Header from "../layout/Header.jsx";
import CreatorsTableSection from "../sections/creatorProfilesSection/CreatorsTableSection.jsx";
import SearchBar from "../actions/SearchBar.jsx";
import CreatorProfilingModal from "../modal/CreatorProfilingModal.jsx";

export default function CreatorProfilesPage() {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Increment to trigger table re-fetch after a creator is added
  const [refreshKey, setRefreshKey] = useState(0);
  // Get logged-in user's ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userID = user._id;

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Creator Profiles" />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Action Bar: Search & Add Button */}
          <SearchBar
            title="Creator Profiles"
            button={{
              label: "Add Creator",
              onClick: () => setIsModalOpen(true),
            }}
          />
          {/* Data Table */}
          <CreatorsTableSection userID={userID} refreshKey={refreshKey} />
        </div>
      </main>

      {/* Render Modal */}
      <CreatorProfilingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userID={userID}
        onSuccess={() => {
          setIsModalOpen(false);
          setRefreshKey((k) => k + 1); // triggers table re-fetch
        }}
      />
    </div>
  );
}
