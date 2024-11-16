import { TableHead, TableRow } from "@/components/ui/table";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillsMatrixTableHeaderProps {
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTableHeader = ({ 
  showCompanySkill = true,
  isRoleBenchmark = false 
}: SkillsMatrixTableHeaderProps) => {
  return (
    <TableRow>
      <TableHead className="w-[200px] font-medium">Skill Title</TableHead>
      <TableHead className="w-[250px] font-medium">Subcategory</TableHead>
      {showCompanySkill && (
        <TableHead className="w-[100px] text-center font-medium">Company Skill</TableHead>
      )}
      {isRoleBenchmark && (
        <TableHead className="w-[150px] text-center font-medium">
          Role Skills
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="inline-block w-4 h-4 ml-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Required skill level for this role</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
      )}
      <TableHead className="w-[150px] text-center font-medium">
        Skill Level
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="inline-block w-4 h-4 ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Current skill level</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableHead>
      <TableHead className="w-[120px] text-center font-medium">Confidence</TableHead>
      <TableHead className="w-[120px] text-center font-medium">Growth</TableHead>
      <TableHead className="w-[100px] text-center font-medium">Appears in</TableHead>
    </TableRow>
  );
};