import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      <TableHead>Skill Title</TableHead>
      <TableHead>Subcategory</TableHead>
      <TableHead className="text-center">Beginner</TableHead>
      <TableHead className="text-center">Intermediate</TableHead>
      <TableHead className="text-center">Advanced</TableHead>
      <TableHead>Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);