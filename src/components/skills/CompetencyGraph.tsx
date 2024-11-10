import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SkillCell } from "./competency/SkillCell";
import { CategoryCards } from "./competency/CategoryCards";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { skillsByCategory } from "./competency/skillsData";
import { useToast } from "@/components/ui/use-toast";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

type Skill = {
  name: string;
  level: string;
  required: string;
};

type SkillLevels = {
  [key: string]: Skill[];
};

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });

  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">(track);
  const [skillChanges, setSkillChanges] = useState<Record<string, { level: string; required: string }>>({});
  const { selectedSkills } = useSelectedSkills();
  const { toast } = useToast();

  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  useEffect(() => {
    const savedChanges = localStorage.getItem('skillChanges');
    if (savedChanges) {
      setSkillChanges(JSON.parse(savedChanges));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('skillChanges', JSON.stringify(skillChanges));
    toast({
      title: "Changes saved",
      description: "Your skill level changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    const savedChanges = localStorage.getItem('skillChanges');
    if (savedChanges) {
      setSkillChanges(JSON.parse(savedChanges));
    } else {
      setSkillChanges({});
    }
    toast({
      title: "Changes cancelled",
      description: "Your skill level changes have been reverted.",
    });
  };

  const handleSkillChange = (skillName: string, level: string, required: string) => {
    setSkillChanges(prev => ({
      ...prev,
      [skillName]: { level, required }
    }));
  };

  const getFilteredSkills = () => {
    const categorySkills = skillsByCategory[selectedCategory as keyof typeof skillsByCategory]?.[currentTrack.toLowerCase()] as SkillLevels | undefined;
    if (!categorySkills) return [];

    const skills = new Set<string>();
    Object.values(categorySkills).forEach((levelSkills: Skill[]) => {
      levelSkills.forEach(skill => skills.add(skill.name));
    });
    return Array.from(skills);
  };

  const filteredSkills = getFilteredSkills();

  const getSkillLevelForTrack = (level: string, skillName: string) => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory]?.[currentTrack.toLowerCase()] as SkillLevels | undefined;
    const levelData = categoryData?.[level];
    const skillData = levelData?.find(skill => skill.name === skillName);
    
    return skillData || { level: "unspecified", required: "unspecified" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Track:</div>
          <Select 
            value={currentTrack} 
            onValueChange={(value: "Professional" | "Managerial") => setCurrentTrack(value)}
          >
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

      <CategoryCards 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        currentTrack={currentTrack}
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
            {filteredSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => {
                  const skillChange = skillChanges[skillName];
                  const details = skillChange || getSkillLevelForTrack(level, skillName);
                  
                  return (
                    <SkillCell 
                      key={level}
                      details={details}
                      isLastColumn={index === levels.length - 1}
                      onSave={(newLevel, newRequired) => handleSkillChange(skillName, newLevel, newRequired)}
                      onCancel={handleCancel}
                    />
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};