const UniversalTable = ({ columns = [], data = [], actions = [] }) => {
  const alignClass = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-gray-500 border-b border-gray-200 bg-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-4 font-medium ${alignClass[col.align] ?? "text-left"} ${col.headerClassName ?? ""}`}
              >
                {col.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-6 py-5 ${alignClass[col.align] ?? "text-left"} ${col.className ?? ""}`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}

              {actions.length > 0 && (
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center space-x-3">
                    {actions.map((action, actionIdx) => (
                      <button
                        key={actionIdx}
                        onClick={() => action.onClick(row)}
                        title={action.title}
                        className={`transition-colors ${action.className ?? "text-gray-400 hover:text-gray-700"}`}
                      >
                        <action.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversalTable;

/* USE CASES 

import { Eye, Pencil, Trash2 } from "lucide-react";
import HandleBadge from "./HandleBadge";

const columns = [
  {
    key: "name",
    label: "Creator Name",
    className: "font-semibold text-gray-900",
  },
  {
    key: "handles",
    label: "Handles",
    headerClassName: "min-w-[300px]",
    render: (handles) => (
      <div className="flex flex-wrap gap-1">
        {handles.map((h, i) => <HandleBadge key={i} handle={h} />)}
      </div>
    ),
  },
  {
    key: "sites",
    label: "Assigned Websites",
    className: "text-gray-500 text-xs",
  },
  {
    key: "infringements",
    label: "Total Infringements",
    align: "right",
    className: "font-mono font-medium text-gray-900",
  },
  {
    key: "lastScraped",
    label: "Last Scraped",
    className: "font-mono text-xs text-gray-500",
  },
];

const actions = [
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

<UniversalTable columns={columns} data={creators} actions={actions} />

*/
