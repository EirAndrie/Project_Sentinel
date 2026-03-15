import { LayoutDashboard, Users, Globe, Network, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

// Navigation Items
const NAV_ITEMS = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/main-dashboard",
  },
  {
    key: "creator-profiles",
    icon: Users,
    label: "Creator Profiles",
    path: "/creator-profiles",
  },
  {
    key: "website-profiles",
    icon: Globe,
    label: "Website Profiles",
    path: "/websites",
  },
  {
    key: "scrape-jobs",
    icon: Network,
    label: "Scrape Jobs",
    path: "/scrape-jobs",
  },
  { key: "reports", icon: FileText, label: "Reports", path: "/reports" },
];

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-6 py-3 cursor-pointer ${
      active
        ? "bg-yellow-50 border-l-4 border-yellow-500 text-gray-900 font-medium"
        : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
    }`}
  >
    <Icon
      className={`w-5 h-5 mr-3 ${active ? "text-gray-900" : "text-gray-400"}`}
    />
    <span className="text-sm">{label}</span>
  </div>
);

// Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey =
    NAV_ITEMS.find((item) => item.path === location.pathname)?.key ??
    "dashboard";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center mr-3 font-bold text-gray-900 text-sm">
            S
          </div>
          <span className="font-bold text-gray-900 tracking-wide">
            SENTINEL
          </span>
        </div>

        <div className="py-4">
          {NAV_ITEMS.map(({ key, icon, label, path }) => (
            <SidebarItem
              key={key}
              icon={icon}
              label={label}
              active={activeKey === key}
              onClick={() => navigate(path)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
