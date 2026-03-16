import UniversalTable from "../../tables/UniversalTable";
import { Eye, Pencil, Trash2 } from "lucide-react";
import HandleBadge from "../../bagdeUI/HandleBadge";
import api from "../../../lib/axios.js";
import { useState, useEffect } from "react";

const COLUMNS = [
  {
    key: "creator_name",
    label: "Creator Name",
    align: "left",
  },
  {
    key: "socials",
    label: "Handles",
    align: "left",
    // socials = platform names, socials_url = handle values (parallel arrays)
    render: (socials, row) => (
      <div className="flex flex-wrap gap-1">
        {(socials ?? []).map((platform, i) => (
          <HandleBadge
            key={i}
            handle={`${platform}: ${row.socials_url?.[i] ?? ""}`}
          />
        ))}
      </div>
    ),
  },
  {
    key: "website_count",
    label: "Assigned Websites",
    align: "center",
  },
  {
    key: "poser_account_count",
    label: "Total Infringements",
    align: "center",
  },
  {
    key: "created_at",
    label: "Date Added",
    align: "left",
    render: (val) =>
      val
        ? new Date(val).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
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

const CreatorsTableSection = ({ userID, refreshKey }) => {
  const [creators, setCreators] = useState([]);

  const fetchCreators = async () => {
    try {
      const res = await api.get(`/get-creators/user/${userID}`);

      if (res.data && res.data.success) {
        setCreators(res.data.creators);
      }
    } catch (error) {
      console.error("Error fetching creators:", error);
    }
  };

  useEffect(() => {
    if (userID) fetchCreators();
  }, [userID, refreshKey]); // re-fetches when a new creator is added

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <UniversalTable columns={COLUMNS} data={creators} actions={ACTIONS} />
    </div>
  );
};

export default CreatorsTableSection;
