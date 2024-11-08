import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Location } from "./types";

interface LocationsTableProps {
  locations: Location[];
}

export const LocationsTable = ({ locations }: LocationsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="font-medium text-sm text-primary py-6 w-[200px] border-r border-border">Location</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6 border-r border-border">Number of Profiles ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6 border-r border-border">Number of Unique Jobs ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6 border-r border-border">Median Compensation ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6 border-r border-border">Total Diversity ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6 border-r border-border">Percent Diversity</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6 border-r border-border">Posting Intensity</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-6">Median Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.name} className="border-b border-gray-200">
            <TableCell className="font-medium text-sm py-6 border-r border-border">{location.name}</TableCell>
            <TableCell className="text-right text-sm py-6 border-r border-border">{location.profiles.toLocaleString()}</TableCell>
            <TableCell className="text-right text-sm py-6 border-r border-border">{location.uniqueJobs}</TableCell>
            <TableCell className="text-right text-sm py-6 border-r border-border">${location.medianCompensation.toLocaleString()}</TableCell>
            <TableCell className="text-right text-sm py-6 border-r border-border">{location.totalDiversity.toLocaleString()}</TableCell>
            <TableCell className="text-right text-sm py-6 border-r border-border">{location.percentDiversity}</TableCell>
            <TableCell className="text-right text-sm py-6 border-r border-border">{location.postingIntensity}</TableCell>
            <TableCell className="text-right text-sm py-6">{location.medianDuration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};