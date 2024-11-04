import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      <TableHead className="w-[200px] border-y border-border font-semibold">Skill Title</TableHead>
      <TableHead className="w-[250px] border-y border-border">Subcategory</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-y border-border">Beginner</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-y border-border">Intermediate</TableHead>
      <TableHead className="text-center bg-[#F7F9FF] border-x border-y border-border">Advanced</TableHead>
      <TableHead className="w-[150px] text-center border-y border-border">Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);