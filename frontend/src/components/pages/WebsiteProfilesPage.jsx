import React from "react";
import { Search, Eye, Scan } from "lucide-react";
import SideBar from "../layout/Sidebar.jsx";
import Header from "../layout/Header.jsx";
import SearchBar from "../actions/SearchBar.jsx";
import useAllWebsiteProfile from "../hooks/useAllWebsiteProfile.js";
import StatusBadge from "../bagdeUI/StatusBadge.jsx";

const CreatorBadge = ({ name }) => (
  <span className="inline-block bg-gray-50 border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
    {name}
  </span>
);

export default function WebsiteProfiles() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { websiteProfiles, loading } = useAllWebsiteProfile(user._id);

  // Group by domain if multiple creators somehow share it, but for now map directly
  // since the schema currently enforces unique base_url = 1 creator.
  const websites = websiteProfiles.map((site) => {
    return {
      domain: site.base_url,
      creators: [site.assigned_creator],
      infringements: "0", // Placeholder for future feature
      lastScraped: new Date(site.last_seen).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: site.scraping_enabled ? "Running" : "Done",
    };
  });

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Website Profiles" user="Agent Li" />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Search Bar */}
          <SearchBar />

          {/* Data Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="text-gray-500 border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Domain</th>
                    <th className="px-6 py-4 font-medium">Assigned Creators</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Infringements
                    </th>
                    <th className="px-6 py-4 font-medium">Last Scraped</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {websites.map((site, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5 font-bold font-mono text-gray-900">
                        {site.domain}
                      </td>
                      <td className="px-6 py-5 whitespace-normal min-w-[300px]">
                        <div className="flex flex-wrap gap-1">
                          {site.creators.map((creator, cIdx) => (
                            <CreatorBadge key={cIdx} name={creator} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono font-medium text-gray-900 text-right">
                        {site.infringements}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-gray-500">
                        {site.lastScraped}
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={site.status} />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <button
                            className="text-gray-400 hover:text-gray-700 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="flex items-center text-gray-700 font-medium text-xs hover:text-black transition-colors">
                            <Scan className="w-4 h-4 mr-1.5" />
                            Scrape
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
