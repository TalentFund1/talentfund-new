import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, HelpCircle, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SkillLevelCell } from "./SkillLevelCell";

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
  {
    title: "Natural Language Understanding",
    subcategory: "Natural Language Processing (NLP)",
    level: "unspecified",
    growth: "15%"
  },
  {
    title: "Computer Vision",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "unspecified",
    growth: "18%"
  },
  {
    title: "Kubernetes",
    subcategory: "Software Development Tools",
    level: "unspecified",
    growth: "14%"
  }
];

export const SkillsMatrix = () => {
  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skills" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
            <SelectItem value="certification">Certification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-blue-200">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-200 bg-[#F7F9FF]">
              <TableHead className="w-[180px] border-r border-blue-200 py-2">Skill Title</TableHead>
              <TableHead className="w-[220px] border-r border-blue-200 py-2">Subcategory</TableHead>
              <TableHead className="w-[120px] text-center border-r border-blue-200 py-2">Company Skill</TableHead>
              <TableHead className="w-[120px] text-center border-r border-blue-200 py-2">Skill Level</TableHead>
              <TableHead className="w-[150px] text-center border-r border-blue-200 py-2">Confidence Score</TableHead>
              <TableHead className="w-[150px] text-center border-r border-blue-200 py-2">
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
              <TableHead className="w-[120px] text-center py-2">Appears In</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.title} className="hover:bg-muted/50 border-b border-gray-200">
                <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
                <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
                <TableCell className="text-center border-r border-blue-200 py-2">
                  <div className="flex justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </TableCell>
                <SkillLevelCell initialLevel={skill.level} />
                <TableCell className="text-center border-r border-blue-200 py-2">
                  {Math.random() > 0.5 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      High
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">n/a</span>
                  )}
                </TableCell>
                <TableCell className="text-center border-r border-blue-200 py-2">
                  <span className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-full text-sm ${
                    skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                  }`}>
                    ↗ {skill.growth}
                  </span>
                </TableCell>
                <TableCell className="text-center py-2">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium">J</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium">B</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium">O</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
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
