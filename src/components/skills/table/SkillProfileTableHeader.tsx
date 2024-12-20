import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

interface SkillProfileTableHeaderProps {
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allSelected: boolean;
  hasRows: boolean;
}

export const SkillProfileTableHeader = ({ onSelectAll, allSelected, hasRows }: SkillProfileTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-[5%] h-12">
          <input 
            type="checkbox" 
            className="rounded border-gray-300"
            onChange={onSelectAll}
            checked={allSelected && hasRows}
          />
        </TableHead>
        <TableHead className="w-[22%] h-12">
          <div className="flex items-center gap-1">
            Role Name <ChevronDown className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="w-[18%] h-12">Function</TableHead>
        <TableHead className="w-[15%] text-center h-12">Employees</TableHead>
        <TableHead className="w-[15%] text-center h-12">Benchmark</TableHead>
        <TableHead className="w-[10%] text-right whitespace-nowrap h-12">Last Updated</TableHead>
      </TableRow>
    </TableHeader>
  );
};