import { RefreshCw } from "lucide-react";
import ActiveScrapeJobsCard from "../../cards/ActiveScrapeJobsCard.jsx";

const ActiveScrapeJobsSection = () => {
  // Dummy Data for UI Scaffold
  const scrapeJobs = [
    {
      id: 1,
      title: "leakedcontent.net",
      status: "running",
      user: "Elena Voss",
      progress: 68,
      found: 14,
    },
    {
      id: 2,
      title: "contentfarm.io",
      status: "queued",
      user: "Aria Kim",
      progress: 0,
      found: 0,
    },
    {
      id: 3,
      title: "piratebay.example.com",
      status: "failed",
      user: "Elena Voss",
      progress: 100,
      found: 0,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900">Active Scrape Jobs</h2>
      </div>
      {scrapeJobs.map((job) => (
        <ActiveScrapeJobsCard key={job.id} scrapeJobs={job} />
      ))}
    </div>
  );
};

export default ActiveScrapeJobsSection;
