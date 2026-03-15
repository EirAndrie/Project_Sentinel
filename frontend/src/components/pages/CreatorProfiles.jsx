import { useState } from "react";
import Sidebar from "../layout/Sidebar.jsx";
import Header from "../layout/Header.jsx";
import CreatorsTableSection from "../sections/creatorProfilesSection/CreatorsTableSection.jsx";
import SearchBar from "../actions/SearchBar.jsx";
import CreatorProfilingModal from "../modal/CreatorProfilingModal.jsx";

export default function CreatorProfiles() {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <CreatorsTableSection />
        </div>
      </main>

      {/* Render Modal */}
      <CreatorProfilingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
