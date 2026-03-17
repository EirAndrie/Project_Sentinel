import { ExternalLink, Scan } from "lucide-react";
import StatusBadge from "../bagdeUI/StatusBadge.jsx";

const WebsiteCards = ({ site }) => {
  // Derive status from scraping_enabled field
  const status = site.scraping_enabled ? "Running" : "Idle";

  // Format last_seen date
  const lastSeen = site.last_seen
    ? new Date(site.last_seen).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 flex flex-col hover:border-slate-300 transition-colors">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-mono text-[15px] font-bold text-slate-900 truncate pr-4">
          {site.website_name}
        </h3>
        <StatusBadge status={status} />
      </div>

      {/* Card Stats */}
      <div className="flex items-center justify-between bg-slate-50/50 rounded-xl p-4 mb-6 border border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Base URL
          </span>
          <span className="text-xs font-medium text-slate-700 truncate max-w-[140px]">
            {site.base_url}
          </span>
        </div>
        <div className="h-8 w-px bg-slate-200 mx-4"></div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Last Seen
          </span>
          <span className="text-sm font-bold text-slate-900">{lastSeen}</span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex space-x-3 mt-auto">
        <button className="flex-1 flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Profile</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 bg-[#C29B27] border border-[#C29B27] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#A88622] transition-colors shadow-sm">
          <Scan className="w-3.5 h-3.5" />
          <span>Scrape Now</span>
        </button>
      </div>
    </div>
  );
};

export default WebsiteCards;
