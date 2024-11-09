import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle, ArrowUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SkillsMatrixTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent border-b border-gray-200 bg-[#F7F9FF]">
        <TableHead className="w-[180px] border-r border-blue-200 py-2">Skill Title</TableHead>
        <TableHead className="w-[220px] border-r border-blue-200 py-2">Subcategory</TableHead>
        <TableHead className="w-[120px] text-center border-r border-blue-200 py-2">Company Skill</TableHead>
        <TableHead className="w-[150px] text-center border-r border-blue-200 py-2">Skill Level</TableHead>
        <TableHead className="w-[120px] text-center border-r border-blue-200 py-2">
          <div className="flex items-center justify-center gap-1">
            Confidence Score
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-[300px] p-4" />
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>
        <TableHead className="w-[120px] text-center border-r border-blue-200 py-2">
          <div className="flex items-center justify-center gap-1 text-sm">
            Projected Growth
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-[300px] p-4" />
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>
        <TableHead className="w-[100px] text-center py-2">
          <div className="flex items-center justify-center gap-1 text-sm">
            Appears In
            <ArrowUp className="h-4 w-4" />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};