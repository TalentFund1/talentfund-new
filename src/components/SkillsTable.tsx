import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { SkillLevelIcon } from "./skills/SkillLevelIcon";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex justify-between items-center px-6 py-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skills" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
            <SelectItem value="certification">Certification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="hover:bg-transparent border-y border-border">
              <TableHead className="w-[200px] border-x border-border">Skill Title</TableHead>
              <TableHead className="w-[250px] border-r border-border">Subcategory</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-r border-border">Beginner</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-r border-border">Intermediate</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-r border-border">Advanced</TableHead>
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
              skills.map((skill, index) => (
                <TableRow 
                  key={skill.title} 
                  className="group transition-colors hover:bg-muted/50 even:bg-muted/5"
                >
                  <TableCell className="font-medium border-x border-border group-hover:bg-transparent">
                    {skill.title}
                  </TableCell>
                  <TableCell className="border-r border-border group-hover:bg-transparent">
                    {skill.subcategory}
                  </TableCell>
                  <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border group-hover:bg-transparent">
                    {skill.level === "Beginner" && <SkillLevelIcon level="beginner" />}
                  </TableCell>
                  <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border group-hover:bg-transparent">
                    {skill.level === "Intermediate" && <SkillLevelIcon level="intermediate" />}
                  </TableCell>
                  <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border group-hover:bg-transparent">
                    {skill.level === "Advanced" && <SkillLevelIcon level="advanced" />}
                  </TableCell>
                  <TableCell className="text-center border-r border-border group-hover:bg-transparent">
                    <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm ${
                      skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                    }`}>
                      ↗ {skill.growth}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center p-4 border-t border-border">
        <Select defaultValue="10">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10 rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground">1-7 of 7</span>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};