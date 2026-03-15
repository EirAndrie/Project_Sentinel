const StatCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </span>
      <Icon className="w-4 h-4 text-gray-400" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-xs text-gray-500 mt-1">{change}</p>
    </div>
  </div>
);

export default StatCard;
