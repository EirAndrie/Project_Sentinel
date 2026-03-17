const StatusBadge = ({ status }) => {
  if (!status) return null;

  const styles = {
    running: "bg-amber-50 text-amber-700 border-amber-200",
    done: "bg-emerald-50 text-emerald-700 border-emerald-200",
    failed: "bg-rose-50 text-rose-700 border-rose-200",
    idle: "bg-slate-50 text-slate-600 border-slate-200",
  };

  const isRunning = status.toLowerCase() === "running";

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border flex items-center ${styles[status.toLowerCase()] || "bg-gray-100"}`}
    >
      {isRunning && (
        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5 animate-pulse"></span>
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
