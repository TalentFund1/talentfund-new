import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SkillCell } from "./competency/SkillCell";
import { CategoryCards } from "./competency/CategoryCards";
import { skillsByCategory } from "./competency/skillsData";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { technicalSkills, softSkills } from "../skillsData";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });

  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">(track);

  useEffect(() => {
    setCurrentTrack(track);
  }, [track]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return currentTrack === "Professional" ? categoryData.professional : categoryData.managerial;
  };

  const skills = getSkillsForCategory();
  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  // Filter and categorize skills
  const getSkillsByCategory = () => {
    const skillsArray = Array.from(toggledSkills);
    
    if (selectedCategory === "all") {
      return skillsArray;
    }
    
    if (selectedCategory === "specialized") {
      return skillsArray.filter(skill => 
        technicalSkills.includes(skill) && 
        ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Computer Vision", "Natural Language Processing"].some(
          specialization => skill.includes(specialization)
        )
      );
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(skill => 
        softSkills.includes(skill) || 
        ["JavaScript", "Python", "Java", "SQL"].some(common => skill.includes(common))
      );
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(skill => 
        skill.includes("Certified") || 
        skill.includes("Certificate") || 
        skill.includes("Certification")
      );
    }
    
    return [];
  };

  const uniqueSkills = getSkillsByCategory().sort();

  const getSkillDetails = (skillName: string, level: string) => {
    const skillLevel = skills[level];
    return skillLevel?.find((s) => s.name === skillName) || { level: "-", required: "-" };
  };

  const handleTrackChange = (value: string) => {
    if (value === "Professional" || value === "Managerial") {
      setCurrentTrack(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
      
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

      <CategoryCards 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
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
            {uniqueSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    details={getSkillDetails(skillName, level)}
                    isLastColumn={index === levels.length - 1}
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