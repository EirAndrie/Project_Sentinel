const Badge = ({ children, type }) => {
  const styles = {
    image: "bg-purple-50 text-purple-600 border border-purple-100",
    video: "bg-blue-50 text-blue-600 border border-blue-100",
    account: "bg-red-50 text-red-600 border border-red-100",
    detected: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    confirmed: "bg-blue-50 text-blue-700 border border-blue-200",
    dmca: "bg-orange-50 text-orange-700 border border-orange-200",
    resolved: "bg-green-50 text-green-700 border border-green-200",
    running: "bg-yellow-100 text-yellow-800",
    queued: "bg-gray-100 text-gray-600",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded text-xs font-medium ${styles[type.toLowerCase()] || "bg-gray-100 text-gray-800"}`}
    >
      {children}
    </span>
  );
};

export default Badge;
