import StatCard from "../../stats/StatCard.jsx";
import { AlertTriangle, CheckCircle2, Send, Zap } from "lucide-react";

const StatusCardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total Infringements Detected"
        value="2,952"
        change="+124 this week"
        icon={AlertTriangle}
      />
      <StatCard
        title="Confirmed This Week"
        value="89"
        change="+12% vs last week"
        icon={CheckCircle2}
      />
      <StatCard
        title="DMCA Sent"
        value="1,847"
        change="+34 this week"
        icon={Send}
      />
      <StatCard
        title="Active Scrape Jobs"
        value={
          <div className="flex items-end space-x-2">
            <span>2</span>
            <span className="w-2 h-2 bg-yellow-400 rounded-full mb-2"></span>
          </div>
        }
        change="2 running"
        icon={Zap}
      />
    </div>
  );
};

export default StatusCardSection;
