import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillsTableRow } from "./SkillsTableRow";
import { SimpleSkill } from "../types/SkillTypes";

interface SkillsTableContentProps {
  skills: SimpleSkill[];
  isLoading: boolean;
}

export const SkillsTableContent = ({ skills, isLoading }: SkillsTableContentProps) => {
  const renderSkeletonRow = () => (
    <TableRow>
      <TableCell className="w-[200px] border-x border-blue-200/60">
        <Skeleton className="h-4 w-3/4" />
      </TableCell>
      <TableCell className="border-r border-blue-200/60">
        <Skeleton className="h-4 w-1/2" />
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/30 border-r border-blue-200/60">
        <Skeleton className="h-6 w-6 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/30 border-r border-blue-200/60">
        <Skeleton className="h-6 w-6 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/30 border-r border-blue-200/60">
        <Skeleton className="h-6 w-6 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60">
        <Skeleton className="h-6 w-16 mx-auto rounded-full" />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="relative overflow-x-auto rounded-lg border border-blue-200/60">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="hover:bg-transparent border-y border-blue-200/60">
            <TableHead className="w-[200px] border-x border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Skill Title
            </TableHead>
            <TableHead className="w-[200px] border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Subcategory
            </TableHead>
            <TableHead className="text-center bg-[#F7F9FF]/50 border-r border-blue-200/60 w-[100px] py-4 text-sm font-semibold">
              Beginner
            </TableHead>
            <TableHead className="text-center bg-[#F7F9FF]/50 border-r border-blue-200/60 w-[100px] py-4 text-sm font-semibold">
              Intermediate
            </TableHead>
            <TableHead className="text-center bg-[#F7F9FF]/50 border-r border-blue-200/60 w-[100px] py-4 text-sm font-semibold">
              Advanced
            </TableHead>
            <TableHead className="w-[150px] text-center border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              <div className="flex items-center justify-center gap-1.5">
                Projected Growth
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-left">Salary with Skill:</h4>
                        <p className="text-sm text-left font-normal">
                          Salary with Skill reflects the Nationwide Median Advertised Salary for the past year based on the selected Job Title and the Skill
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => renderSkeletonRow())
          ) : skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                No skills found
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill, index) => (
              <SkillsTableRow key={skill.title} skill={skill} isEven={index % 2 === 0} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};