const MetricCard = ({ icon: Icon, value, label }) => (
  <div className="bg-slate-50/80 rounded-xl p-4 flex items-center border border-slate-100 transition-colors hover:bg-slate-100/80 w-full">
    <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center mr-4 shrink-0">
      <Icon className="w-5 h-5 text-[#C29B27]" />
    </div>
    <div>
      <div className="text-xl font-bold text-gray-900 leading-tight">
        {value}
      </div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  </div>
);

export default MetricCard;
