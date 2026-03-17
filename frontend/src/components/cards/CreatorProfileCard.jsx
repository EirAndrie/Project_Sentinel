import { LayoutGrid, UserCheck, FolderOpen, Pencil } from "lucide-react";
import MetricCard from "./MetricCard.jsx";

const CreatorProfileCard = ({ creator, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center flex flex-col items-center relative">
      {/* Edit Toggle Button */}
      {onEdit && (
        <button
          onClick={() => onEdit(creator)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Edit Profile"
        >
          <Pencil size={18} />
        </button>
      )}

      {/* Avatar */}
      <div className="relative mb-5 w-full flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
          <img
            src={creator.creator_image}
            alt="Creator"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150"; // Fallback
            }}
          />
        </div>
      </div>

      {/* Name */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {creator.creator_name}
      </h2>

      {/* Handles */}
      <div className="flex flex-col gap-2 w-full">
        {creator.socials?.map((platform, idx) => (
          <span
            key={idx}
            className="inline-block bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1.5 rounded-lg w-full text-left"
          >
            {platform}:{" "}
            <span className="font-mono text-slate-800">
              {creator.socials_url?.[idx] || "N/A"}
            </span>
          </span>
        ))}
      </div>

      {/* Divider */}
      <hr className="w-full border-slate-100 my-6" />

      {/* Vertical Metrics */}
      <div className="flex flex-col gap-3 w-full text-left">
        <MetricCard
          icon={LayoutGrid}
          value={creator.website_count}
          label="Total Assigned Websites"
        />
        <MetricCard
          icon={UserCheck}
          value={creator.poser_account_count}
          label="Poser Accounts"
        />
        <MetricCard icon={FolderOpen} value="34" label="Open" />
      </div>
    </div>
  );
};

export default CreatorProfileCard;
