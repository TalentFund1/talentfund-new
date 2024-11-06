import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export const SkillTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-[25%]">
          <div className="flex items-center gap-1">
            Skill Title <ChevronDown className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="w-[25%]">Subcategory</TableHead>
        <TableHead className="w-[12.5%] text-center">Beginner</TableHead>
        <TableHead className="w-[12.5%] text-center">Intermediate</TableHead>
        <TableHead className="w-[12.5%] text-center">Advanced</TableHead>
        <TableHead className="w-[12.5%] text-center">
          <div className="flex items-center justify-center gap-1">
            <span>Projected Growth</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Projected growth indicates the expected increase in demand for this skill over the next 12 months based on market analysis and industry trends.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};