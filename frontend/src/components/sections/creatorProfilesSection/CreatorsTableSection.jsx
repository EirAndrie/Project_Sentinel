import UniversalTable from "../../tables/UniversalTable";
import { Eye, Pencil, Trash2 } from "lucide-react";
import HandleBadge from "../../bagdeUI/HandleBadge";

// DUMMY DATA FOR UI SCAFFOLDING
const COLUMNS = [
  {
    key: "name",
    label: "Creator Name",
    align: "left",
  },
  {
    key: "handles",
    label: "Handles",
    align: "left",
    render: (handles) => (
      <div className="flex flex-wrap gap-1">
        {handles.map((h, i) => (
          <HandleBadge key={i} handle={h} />
        ))}
      </div>
    ),
  },
  {
    key: "sites",
    label: "Assigned Websites",
    align: "left",
  },
  {
    key: "infringements",
    label: "Total Infringements",
    align: "right",
  },
  {
    key: "lastScraped",
    label: "Last Scraped",
    align: "left",
  },
];

const CREATORS = [
  {
    name: "Elena Voss",
    handles: ["Instagram: @elenavoss", "TikTok: @elenavossofficial"],
    sites: "3 sites",
    infringements: "847",
    lastScraped: "Mar 14 16:22",
  },
  {
    name: "Marcus Chen",
    handles: ["YouTube: @marcuschen", "Twitter: @mchen_official"],
    sites: "2 sites",
    infringements: "312",
    lastScraped: "Mar 13 22:45",
  },
  {
    name: "Sophia Ramirez",
    handles: ["OnlyFans: @sophiar", "Instagram: @sophia.ramirez"],
    sites: "2 sites",
    infringements: "1,203",
    lastScraped: "Mar 14 14:10",
  },
  {
    name: "Jake Morrison",
    handles: ["Twitch: @jakemorrison"],
    sites: "1 sites",
    infringements: "56",
    lastScraped: "Mar 13 04:00",
  },
  {
    name: "Aria Kim",
    handles: [
      "Instagram: @ariakim",
      "TikTok: @ariakimmusic",
      "YouTube: @AriaKimOfficial",
    ],
    sites: "3 sites",
    infringements: "534",
    lastScraped: "Mar 14 17:00",
  },
];

const ACTIONS = [
  {
    icon: Eye,
    title: "View",
    onClick: (row) => console.log("view", row),
  },
  {
    icon: Pencil,
    title: "Edit",
    onClick: (row) => console.log("edit", row),
  },
  {
    icon: Trash2,
    title: "Delete",
    onClick: (row) => console.log("delete", row),
    className: "text-red-400 hover:text-red-600",
  },
];

const CreatorsTableSection = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <UniversalTable columns={COLUMNS} data={CREATORS} actions={ACTIONS} />
    </div>
  );
};

export default CreatorsTableSection;
