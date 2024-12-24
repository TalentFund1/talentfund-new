import { TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface SkillProfileTableHeaderProps {
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
  hasSkills: boolean;
}

export const SkillProfileTableHeader = ({
  onSelectAll,
  isAllSelected,
  hasSkills
}: SkillProfileTableHeaderProps) => {
  return (
    <TableRow className="hover:bg-transparent">
      <TableHead className="w-[5%] h-12">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          onChange={onSelectAll}
          checked={hasSkills && isAllSelected}
          disabled={!hasSkills}
        />
      </TableHead>
      <TableHead className="w-[22%] h-12">
        <div className="flex items-center gap-1">
          Role Name <ChevronDown className="h-4 w-4" />
        </div>
      </TableHead>
      <TableHead className="w-[18%] h-12">Function</TableHead>
      <TableHead className="w-[15%] text-center h-12">Skill Count</TableHead>
      <TableHead className="w-[15%] text-center h-12">Employees</TableHead>
      <TableHead className="w-[15%] text-center h-12">Benchmark</TableHead>
      <TableHead className="w-[10%] text-right whitespace-nowrap h-12">Last Updated</TableHead>
    </TableRow>
  );
};