import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

export const SkillTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-[30%]">
          <div className="flex items-center gap-1">
            Skill Title <ChevronDown className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="w-[30%]">Subcategory</TableHead>
        <TableHead className="w-[13.33%] text-center">Beginner</TableHead>
        <TableHead className="w-[13.33%] text-center">Intermediate</TableHead>
        <TableHead className="w-[13.33%] text-center">Advanced</TableHead>
      </TableRow>
    </TableHeader>
  );
};