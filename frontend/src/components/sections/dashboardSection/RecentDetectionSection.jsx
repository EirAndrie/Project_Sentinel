import { useState, useEffect } from "react";
import RecentDetectionsTable from "../../tables/RecentDetectionsTable";

const RecentDetectionSection = () => {
  // Dummy Data for UI Scaffolding
  const recentDetections = [
    {
      creator: "Elena Voss",
      url: "https://leakedcontent.net/ele...",
      type: "Image",
      website: "leakedcontent.net",
      date: "Mar 14 15:12",
      status: "Detected",
    },
    {
      creator: "Sophia Ramirez",
      url: "https://mirrorsite.biz/users/...",
      type: "Video",
      website: "mirrorsite.biz",
      date: "Mar 14 14:45",
      status: "Confirmed",
    },
    {
      creator: "Marcus Chen",
      url: "https://tubeclone.xyz/watch?v...",
      type: "Video",
      website: "tubeclone.xyz",
      date: "Mar 14 06:30",
      status: "DMCA Sent",
    },
    {
      creator: "Elena Voss",
      url: "https://piratebay.example.com...",
      type: "Account",
      website: "piratebay.example.com",
      date: "Mar 14 02:00",
      status: "Detected",
    },
    {
      creator: "Aria Kim",
      url: "https://contentfarm.io/aria-k...",
      type: "Image",
      website: "contentfarm.io",
      date: "Mar 13 23:20",
      status: "Resolved",
    },
    {
      creator: "Sophia Ramirez",
      url: "https://leakedcontent.net/sop...",
      type: "Image",
      website: "leakedcontent.net",
      date: "Mar 14 16:30",
      status: "Detected",
    },
    {
      creator: "Jake Morrison",
      url: "https://tubeclone.xyz/watch?v...",
      type: "Video",
      website: "tubeclone.xyz",
      date: "Mar 12 19:00",
      status: "Confirmed",
    },
    {
      creator: "Aria Kim",
      url: "https://piratebay.example.com...",
      type: "Video",
      website: "piratebay.example.com",
      date: "Mar 14 10:15",
      status: "DMCA Sent",
    },
  ];

  return (
    <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <RecentDetectionsTable detections={recentDetections} />
    </div>
  );
};

export default RecentDetectionSection;
