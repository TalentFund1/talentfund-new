import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent border-b border-border">
      <TableHead className="w-[200px] bg-[#F7F9FF] border-x border-border font-semibold">Skill Title</TableHead>
      <TableHead className="w-[250px] border-r border-border">Subcategory</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-r border-border">Beginner</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-r border-border">Intermediate</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-r border-border">Advanced</TableHead>
      <TableHead className="w-[150px] text-center border-r border-border">Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);