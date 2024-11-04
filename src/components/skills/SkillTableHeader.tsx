import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      <TableHead className="w-[250px] bg-[#F7F9FF] border-x border-border font-semibold">Skill Title</TableHead>
      <TableHead className="w-[250px]">Subcategory</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-border">Beginner</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-border">Intermediate</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-border">Advanced</TableHead>
      <TableHead className="w-[150px] text-center bg-[#F7F9FF] border-x border-border">Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);