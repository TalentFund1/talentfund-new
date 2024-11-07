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

const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "advanced",
    growth: "12%"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "19%"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "12%"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "19%"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "10%"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "intermediate",
    growth: "0%"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "beginner",
    growth: "11%"
  },
  // Adding 10 new skills
  {
    title: "TensorFlow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "15%"
  },
  {
    title: "PyTorch",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "18%"
  },
  {
    title: "Natural Language Processing",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "20%"
  },
  {
    title: "Computer Vision",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "16%"
  },
  {
    title: "Kubernetes",
    subcategory: "Software Development Tools",
    level: "beginner",
    growth: "14%"
  },
  {
    title: "Neural Networks",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "17%"
  },
  {
    title: "Data Science",
    subcategory: "Data Analytics",
    level: "intermediate",
    growth: "13%"
  },
  {
    title: "Scikit-learn",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "11%"
  },
  {
    title: "Git",
    subcategory: "Software Development Tools",
    level: "advanced",
    growth: "8%"
  },
  {
    title: "REST APIs",
    subcategory: "Web Services",
    level: "intermediate",
    growth: "9%"
  }
];

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="space-y-6 bg-white rounded-lg">
      <div className="flex justify-between items-center px-6 py-4">
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

      <Table>
        <TableHeader>
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
          {skills.map((skill) => (
            <TableRow key={skill.title} className="border-b border-border">
              <TableCell className="font-medium border-x border-border">{skill.title}</TableCell>
              <TableCell className="border-r border-border">{skill.subcategory}</TableCell>
              <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border">
                {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
              </TableCell>
              <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border">
                {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
              </TableCell>
              <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border">
                {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
              </TableCell>
              <TableCell className="text-center border-r border-border">
                <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm ${
                  skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                }`}>
                  ↗ {skill.growth}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4">
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
