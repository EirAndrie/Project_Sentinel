import Badge from "../bagdeUI/Badge";

const RecentDetectionsTable = ({ detections }) => {
  return (
    <div>
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900">Recent Detections</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Creator</th>
              <th className="px-6 py-3 font-medium">Infringing URL</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Website</th>
              <th className="px-6 py-3 font-medium">Found At</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {detections.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 text-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.creator}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                  {item.url}
                </td>
                <td className="px-6 py-4">
                  <Badge type={item.type}>{item.type}</Badge>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{item.website}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">{item.date}</td>
                <td className="px-6 py-4">
                  <Badge
                    type={item.status === "DMCA Sent" ? "dmca" : item.status}
                  >
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDetectionsTable;
