import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const MarketDataTable = () => {
  const data = [
    {
      location: "New York, NY",
      profiles: "2,868",
      uniqueJobs: "452",
      medianCompensation: "$140,674",
      totalDiversity: "1,682",
      percentDiversity: "58%",
      postingIntensity: "2:1",
      medianPostingDuration: "52 days"
    },
    {
      location: "Los Angeles, CA",
      profiles: "1,527",
      uniqueJobs: "342",
      medianCompensation: "$144,543",
      totalDiversity: "787",
      percentDiversity: "31%",
      postingIntensity: "4:1",
      medianPostingDuration: "12 days"
    },
    // ... more data rows
  ];

  return (
    <div className="rounded-lg border border-blue-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r border-blue-200">Location</TableHead>
            <TableHead className="border-r border-blue-200">Number of Profiles</TableHead>
            <TableHead className="border-r border-blue-200">Number of Unique Jobs</TableHead>
            <TableHead className="border-r border-blue-200">Median Compensation</TableHead>
            <TableHead className="border-r border-blue-200">Total Diversity</TableHead>
            <TableHead className="border-r border-blue-200">Percent Diversity</TableHead>
            <TableHead className="border-r border-blue-200">Posting Intensity</TableHead>
            <TableHead className="border-r border-blue-200">Median Posting Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="border-r border-blue-200">{row.location}</TableCell>
              <TableCell className="border-r border-blue-200">{row.profiles}</TableCell>
              <TableCell className="border-r border-blue-200">{row.uniqueJobs}</TableCell>
              <TableCell className="border-r border-blue-200">{row.medianCompensation}</TableCell>
              <TableCell className="border-r border-blue-200">{row.totalDiversity}</TableCell>
              <TableCell className="border-r border-blue-200">{row.percentDiversity}</TableCell>
              <TableCell className="border-r border-blue-200">{row.postingIntensity}</TableCell>
              <TableCell className="border-r border-blue-200">{row.medianPostingDuration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};