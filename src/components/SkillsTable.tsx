import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SkillGrowthSheet } from "./skills/SkillGrowthSheet";

const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "advanced",
    growth: "12%",
    type: "specialized"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "19%",
    type: "specialized"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "12%",
    type: "specialized"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "19%",
    type: "specialized"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "10%",
    type: "specialized"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "intermediate",
    growth: "0%",
    type: "common"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "beginner",
    growth: "11%",
    type: "common"
  }
];

const SkillLevelIcon = ({ level }: { level: string }) => {
  switch (level) {
    case "advanced":
      return <CircleDot className="h-5 w-5 text-primary-accent mx-auto" />;
    case "intermediate":
      return <CircleDot className="h-5 w-5 text-primary-icon mx-auto" />;
    case "beginner":
      return <CircleDot className="h-5 w-5 text-[#008000] mx-auto" />;
    default:
      return null;
  }
};

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<{ title: string; growth: string } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredSkills = skills.filter(skill => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "specialized") return skill.type === "specialized";
    if (selectedFilter === "common") return skill.type === "common";
    return true;
  });

  const handleGrowthClick = (skill: { title: string; growth: string }) => {
    setSelectedSkill(skill);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-border shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
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
        </div>
        
        <div className="px-4">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Skill Title</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead className="text-center">Beginner</TableHead>
                <TableHead className="text-center">Intermediate</TableHead>
                <TableHead className="text-center">Advanced</TableHead>
                <TableHead>Projected Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSkills.map((skill) => (
                <TableRow key={skill.title}>
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>{skill.subcategory}</TableCell>
                  <TableCell className="text-center">
                    {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity ${
                        skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                      }`}
                      onClick={() => handleGrowthClick(skill)}
                    >
                      ↗ {skill.growth}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center px-6 py-4 border-t border-border">
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
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">1-4 of 4</span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="w-8 h-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedSkill && (
        <SkillGrowthSheet 
          open={sheetOpen} 
          onOpenChange={setSheetOpen}
          skill={selectedSkill}
        />
      )}
    </div>
  );
};