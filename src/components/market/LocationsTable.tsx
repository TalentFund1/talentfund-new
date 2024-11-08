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
          <TableHead className="font-medium text-sm text-primary py-4">Location</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Number of Profiles ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Number of Unique Jobs ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Median Compensation ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Total Diversity ↑</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Percent Diversity</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Posting Intensity</TableHead>
          <TableHead className="text-right font-medium text-sm text-primary py-4">Median Posting Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.name} className="border-b border-border">
            <TableCell className="font-medium text-sm py-4">{location.name}</TableCell>
            <TableCell className="text-right text-sm py-4">{location.profiles.toLocaleString()}</TableCell>
            <TableCell className="text-right text-sm py-4">{location.uniqueJobs}</TableCell>
            <TableCell className="text-right text-sm py-4">${location.medianCompensation.toLocaleString()}</TableCell>
            <TableCell className="text-right text-sm py-4">{location.totalDiversity.toLocaleString()}</TableCell>
            <TableCell className="text-right text-sm py-4">{location.percentDiversity}</TableCell>
            <TableCell className="text-right text-sm py-4">{location.postingIntensity}</TableCell>
            <TableCell className="text-right text-sm py-4">{location.medianDuration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};