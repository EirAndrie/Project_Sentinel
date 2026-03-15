import React from "react";
// File Imports
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
// Section Component Imports
import StatusCardSection from "../sections/dashboardSection/StatsSection.jsx";
import RecentDetectionSection from "../sections/dashboardSection/RecentDetectionSection.jsx";
import ActiveScrapeJobsSection from "../sections/dashboardSection/ActiveScrapeJobsSection.jsx";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={"Dashboard"} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Top Stat Cards */}
          <StatusCardSection />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Detections Table */}
            <RecentDetectionSection />
            {/* Active Scrape Jobs */}
            <ActiveScrapeJobsSection />
          </div>
        </div>
      </main>
    </div>
  );
}
