import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent border-b border-border">
      <TableHead className="w-[25%] bg-background/40 font-medium text-foreground">Skill Title</TableHead>
      <TableHead className="w-[30%] bg-background/40 font-medium text-foreground">Subcategory</TableHead>
      <TableHead className="w-[10%] text-center bg-background/40 font-medium text-foreground">Beginner</TableHead>
      <TableHead className="w-[10%] text-center bg-background/40 font-medium text-foreground">Intermediate</TableHead>
      <TableHead className="w-[10%] text-center bg-background/40 font-medium text-foreground">Advanced</TableHead>
      <TableHead className="w-[15%] text-center bg-background/40 font-medium text-foreground">Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);