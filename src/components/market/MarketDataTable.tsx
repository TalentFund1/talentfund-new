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
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Number of Profiles</TableHead>
            <TableHead>Number of Unique Jobs</TableHead>
            <TableHead>Median Compensation</TableHead>
            <TableHead>Total Diversity</TableHead>
            <TableHead>Percent Diversity</TableHead>
            <TableHead>Posting Intensity</TableHead>
            <TableHead>Median Posting Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.profiles}</TableCell>
              <TableCell>{row.uniqueJobs}</TableCell>
              <TableCell>{row.medianCompensation}</TableCell>
              <TableCell>{row.totalDiversity}</TableCell>
              <TableCell>{row.percentDiversity}</TableCell>
              <TableCell>{row.postingIntensity}</TableCell>
              <TableCell>{row.medianPostingDuration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};