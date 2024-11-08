import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CompensationTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-secondary hover:bg-secondary">
        <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Role Name</TableHead>
        <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Level</TableHead>
        <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Currency</TableHead>
        <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Salary Range</TableHead>
        <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">10th</TableHead>
        <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">25th</TableHead>
        <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">50th</TableHead>
        <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">75th</TableHead>
        <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 bg-[#F7F9FF]/50">90th</TableHead>
      </TableRow>
    </TableHeader>
  );
};