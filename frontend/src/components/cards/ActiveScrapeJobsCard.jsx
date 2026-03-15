import Badge from "../bagdeUI/Badge.jsx";

const ActiveScrapeJobsCard = ({ scrapeJobs }) => {
  return (
    <div className="p-6">
      <div className="border border-gray-200 rounded-md p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-sm font-bold font-mono text-gray-900">
              {scrapeJobs.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{scrapeJobs.user}</p>
          </div>
          <Badge type={scrapeJobs.status}>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
              {scrapeJobs.status}
            </span>
          </Badge>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{scrapeJobs.progress}%</span>
          <span>{scrapeJobs.found} found</span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-yellow-500 h-1.5 rounded-full"
            style={{ width: `${scrapeJobs.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveScrapeJobsCard;
