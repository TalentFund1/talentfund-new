import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const BenchmarkSkillsMatrixTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-[#F7F9FF] border-b border-[#CCDBFF]">
        <TableHead className="w-[180px] border-r border-[#CCDBFF] py-3 font-medium">Skill Title</TableHead>
        <TableHead className="w-[220px] border-r border-[#CCDBFF] py-3 font-medium">Subcategory</TableHead>
        <TableHead className="w-[150px] text-center border-r border-[#CCDBFF] py-3 font-medium">Role Skills</TableHead>
        <TableHead className="w-[150px] text-center border-r border-[#CCDBFF] py-3 font-medium">Role Target</TableHead>
        <TableHead className="w-[120px] text-center border-r border-[#CCDBFF] py-3 font-medium">
          <div className="flex items-center justify-center gap-1">
            Confidence Score
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-left">Confidence Score:</h4>
                    <p className="text-sm text-left font-normal">
                      Indicates the level of confidence in the skill assessment based on available data and validation
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>
        <TableHead className="w-[120px] text-center border-r border-[#CCDBFF] py-3 font-medium">
          <div className="flex items-center justify-center gap-1">
            Projected Growth
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-left">Projected Growth:</h4>
                    <p className="text-sm text-left font-normal">
                      Projected growth in demand for this skill over the next year
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>
        <TableHead className="w-[100px] text-center py-3 font-medium">
          <div className="flex items-center justify-center gap-1">
            Appears In
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-left">Appears In:</h4>
                    <p className="text-sm text-left font-normal">
                      Shows where this skill appears in different contexts
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};