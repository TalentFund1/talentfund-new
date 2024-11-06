import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SkillLevelIcon } from "../skills/SkillLevelIcon";

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
            <SelectItem value="all">All Skills</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] border-r border-border">Skill Title</TableHead>
              <TableHead className="w-[250px]">Subcategory</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-x border-border">Beginner</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-x border-border">Intermediate</TableHead>
              <TableHead className="text-center bg-[#F7F9FF] border-x border-border">Advanced</TableHead>
              <TableHead className="w-[150px] text-center">Projected Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.title}>
                <TableCell className="font-medium border-r border-border">{skill.title}</TableCell>
                <TableCell>{skill.subcategory}</TableCell>
                <TableCell className="text-center bg-[#F7F9FF]/50 border-x border-border">
                  {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
                </TableCell>
                <TableCell className="text-center bg-[#F7F9FF]/50 border-x border-border">
                  {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
                </TableCell>
                <TableCell className="text-center bg-[#F7F9FF]/50 border-x border-border">
                  {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
                </TableCell>
                <TableCell className="text-center">
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
        
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-2">1-7 of 7</span>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8 ml-1">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
