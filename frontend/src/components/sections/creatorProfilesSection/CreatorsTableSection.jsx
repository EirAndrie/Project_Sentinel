import UniversalTable from "../../tables/UniversalTable";
import { Eye, Pencil, Trash2 } from "lucide-react";
import HandleBadge from "../../bagdeUI/HandleBadge";
import useAllCreatorProfile from "../../hooks/useAllCreatorProfile.js";
import { useNavigate } from "react-router";
import useDeleteCreatorProfile from "../../hooks/useDeleteCreatorProfile.js";

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

const CreatorsTableSection = ({ userID, refreshKey, onRefresh }) => {
  const navigate = useNavigate();
  const { deleteCreator, loading: isDeleting } = useDeleteCreatorProfile();

  // Used to fetch all creators refer to useAllCreatorProfile.js hook for more info
  const { creators, loading, error } = useAllCreatorProfile({
    userID,
    refreshKey,
  });

  // Function to handle creator deletion
  const handleDelete = async (row) => {
    if (
      window.confirm(`Are you sure you want to delete "${row.creator_name}"?`)
    ) {
      const result = await deleteCreator(row._id);
      // If deletion is successful, refresh the table data
      if (result.success) {
        if (onRefresh) onRefresh();
      } else {
        alert(result.message || "Failed to delete creator.");
      }
    }
  };

  // Actions need navigate and handlers, so we build them inside the component
  const actions = [
    {
      icon: Eye,
      title: "View",
      onClick: (row) =>
        navigate(`/view-creator-profile/${row._id}`, { state: row }),
    },
    {
      icon: Trash2,
      title: "Delete",
      onClick: handleDelete,
      className: "text-red-400 hover:text-red-600",
      disabled: isDeleting,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <UniversalTable columns={COLUMNS} data={creators} actions={actions} />
    </div>
  );
};

export default CreatorsTableSection;
