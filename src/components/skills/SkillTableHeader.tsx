import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, StarHalf, CircleDashed } from "lucide-react";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      <TableHead className="w-[200px] border-r border-border">Skill Title</TableHead>
      <TableHead className="w-[250px]">Subcategory</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-border">
        <div className="flex flex-col items-center gap-1">
          Beginner
          <CircleDashed className="h-4 w-4 text-[#008000] opacity-50" />
        </div>
      </TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-border">
        <div className="flex flex-col items-center gap-1">
          Intermediate
          <StarHalf className="h-4 w-4 text-primary-icon opacity-50" fill="currentColor" />
        </div>
      </TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-border">
        <div className="flex flex-col items-center gap-1">
          Advanced
          <Star className="h-4 w-4 text-primary-accent opacity-50" fill="currentColor" />
        </div>
      </TableHead>
      <TableHead className="w-[150px] text-center">Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);