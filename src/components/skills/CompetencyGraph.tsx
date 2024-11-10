import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { skillsByCategory } from "./competency/skillsData";
import { CategorySection } from "./competency/CategorySection";
import { categorizeSkills, isSpecializedSkill, isCommonSkill, isCertificationSkill } from "./competency/skillCategories";
import { SkillCell } from "./competency/SkillCell";
import { CompetencyHeader } from "./competency/CompetencyHeader";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

const getSkillDetails = (skillName: string, level: string) => {
  return {
    level: "unspecified",
    required: "preferred"
  };
};

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">(track);

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return currentTrack === "Professional" ? categoryData?.professional : categoryData?.managerial;
  };

  const skills = getSkillsForCategory() || {};
  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  const getSkillsByCategory = () => {
    const skillsArray = Array.from(toggledSkills);
    
    if (selectedCategory === "all") {
      return skillsArray;
    }
    
    if (selectedCategory === "specialized") {
      return skillsArray.filter(isSpecializedSkill);
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(isCommonSkill);
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(isCertificationSkill);
    }
    
    return [];
  };

  const handleTrackChange = (value: string) => {
    if (value === "Professional" || value === "Managerial") {
      setCurrentTrack(value);
    }
  };

  return (
    <div className="space-y-6">
      <CompetencyHeader />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Track:</div>
          <Select value={currentTrack} onValueChange={handleTrackChange}>
            <SelectTrigger className="w-[180px] bg-white border-border">
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Managerial">Managerial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-4" />
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground">AI Engineer</h3>
      </div>

      <CategorySection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        skillCounts={categorizeSkills(Array.from(toggledSkills))}
      />

      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] font-semibold bg-background/80 border-r border-border">
                Skill
              </TableHead>
              {levels.map((level, index) => (
                <TableHead 
                  key={level} 
                  className={`text-center bg-background/80 ${index !== levels.length - 1 ? 'border-r' : ''} border-border`}
                >
                  <div className="font-semibold">{level}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {getSkillsByCategory().sort().map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    skillName={skillName}
                    level={level}
                    details={getSkillDetails(skillName, level)}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
