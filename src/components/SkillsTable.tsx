import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { SkillsTableRow } from "./skills/table/SkillsTableRow";

const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "Advanced",
    growth: "12%"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Advanced",
    growth: "19%"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "Advanced",
    growth: "12%"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Intermediate",
    growth: "19%"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Intermediate",
    growth: "10%"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "Intermediate",
    growth: "0%"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Beginner",
    growth: "11%"
  }
];

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const renderSkeletonRow = () => (
    <TableRow>
      <TableCell className="w-[200px] border-x border-border">
        <Skeleton className="h-4 w-3/4" />
      </TableCell>
      <TableCell className="border-r border-border">
        <Skeleton className="h-4 w-1/2" />
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border">
        <Skeleton className="h-6 w-6 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border">
        <Skeleton className="h-6 w-6 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border">
        <Skeleton className="h-6 w-6 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center border-r border-border">
        <Skeleton className="h-6 w-16 mx-auto rounded-full" />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6 bg-white rounded-lg">
      <SkillsTableHeader selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="hover:bg-transparent border-y border-border">
              <TableHead className="w-[200px] border-x border-border">Skill Title</TableHead>
              <TableHead className="w-[250px] border-r border-border">Subcategory</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-r border-border w-[100px]">Beginner</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-r border-border w-[100px]">Intermediate</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-r border-border w-[100px]">Advanced</TableHead>
              <TableHead className="w-[150px] text-center border-r border-border">
                <div className="flex items-center justify-center gap-1">
                  Projected Growth
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
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
              skills.map((skill) => (
                <SkillsTableRow key={skill.title} skill={skill} />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SkillsTableFooter />
    </div>
  );
};
