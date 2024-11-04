import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SkillTableHeader = () => (
  <TableHeader>
    <TableRow className="hover:bg-transparent border-b border-border">
      <TableHead className="w-[25%] bg-background/40 font-medium text-foreground sticky top-0">Skill Title</TableHead>
      <TableHead className="w-[30%] bg-background/40 font-medium text-foreground sticky top-0">Subcategory</TableHead>
      <TableHead className="w-[10%] text-center bg-background/40 font-medium text-foreground sticky top-0">
        <div className="flex flex-col items-center">
          <span className="text-[#008000] font-semibold">Beginner</span>
          <div className="w-2 h-2 rounded-full bg-[#008000] mt-1" />
        </div>
      </TableHead>
      <TableHead className="w-[10%] text-center bg-background/40 font-medium text-foreground sticky top-0">
        <div className="flex flex-col items-center">
          <span className="text-primary-icon font-semibold">Intermediate</span>
          <div className="w-2 h-2 rounded-full bg-primary-icon mt-1" />
        </div>
      </TableHead>
      <TableHead className="w-[10%] text-center bg-background/40 font-medium text-foreground sticky top-0">
        <div className="flex flex-col items-center">
          <span className="text-primary-accent font-semibold">Advanced</span>
          <div className="w-2 h-2 rounded-full bg-primary-accent mt-1" />
        </div>
      </TableHead>
      <TableHead className="w-[15%] text-center bg-background/40 font-medium text-foreground sticky top-0">Projected Growth</TableHead>
    </TableRow>
  </TableHeader>
);