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
    return currentTrack === "Professional" ? categoryData?.professional : categoryData?.managerial;
  };

  const skills = getSkillsForCategory() || {};
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
        ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Computer Vision", "Natural Language Processing", "AWS", "Cloud Computing", "TensorFlow", "PyTorch"].some(
          specialization => skill.includes(specialization)
        )
      );
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(skill => 
        softSkills.includes(skill) || 
        ["JavaScript", "Python", "Java", "SQL", "Git", "Agile", "Communication"].some(common => skill.includes(common))
      );
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(skill => 
        skill.includes("Certified") || 
        skill.includes("Certification") ||
        skill.includes("Architect") ||
        ["AWS Certified", "Professional Scrum", "PMP", "CISSP", "CKA", "Solutions Architect", "Azure Solutions", "Professional Agile"].some(cert => skill.includes(cert))
      );
    }
    
    return [];
  };

  const uniqueSkills = getSkillsByCategory().sort();

  const getSkillDetails = (skillName: string, level: string) => {
    if (!skills || !skills[level]) return { level: "-", required: "-" };
    return skills[level]?.find((s: { name: string; level: string; required: string; }) => s.name === skillName) || { level: "-", required: "-" };
  };

  const handleTrackChange = (value: string) => {
    if (value === "Professional" || value === "Managerial") {
      setCurrentTrack(value);
    }
  };

  const getCategoryCount = (category: string) => {
    const skillsArray = Array.from(toggledSkills);
    
    if (category === "all") {
      return skillsArray.length;
    }
    
    if (category === "specialized") {
      return skillsArray.filter(skill => 
        technicalSkills.includes(skill) && 
        ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Computer Vision", 
         "Natural Language Processing", "AWS", "Cloud Computing", "TensorFlow", "PyTorch"]
        .some(specialization => skill.toLowerCase().includes(specialization.toLowerCase()))
      ).length;
    }
    
    if (category === "common") {
      return skillsArray.filter(skill => 
        softSkills.includes(skill) || 
        ["JavaScript", "Python", "Java", "SQL", "Git", "Agile", "Communication"]
        .some(common => skill.toLowerCase().includes(common.toLowerCase()))
      ).length;
    }
    
    if (category === "certification") {
      return skillsArray.filter(skill => 
        skill.toLowerCase().includes("certified") || 
        skill.toLowerCase().includes("certification") ||
        skill.toLowerCase().includes("architect") ||
        ["AWS Certified", "Professional Scrum", "PMP", "CISSP", "CKA", 
         "Solutions Architect", "Azure Solutions", "Professional Agile"]
        .some(cert => skill.toLowerCase().includes(cert.toLowerCase()))
      ).length;
    }
    
    return 0;
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

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { id: "all", name: "All Categories", count: getCategoryCount("all") },
          { id: "specialized", name: "Specialized Skills", count: getCategoryCount("specialized") },
          { id: "common", name: "Common Skills", count: getCategoryCount("common") },
          { id: "certification", name: "Certification", count: getCategoryCount("certification") }
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-lg p-4 transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-accent/5 border border-primary-accent'
                : 'bg-background border border-border hover:border-primary-accent/50'
            }`}
          >
            <div className="flex flex-col items-start">
              <span className={`text-sm font-semibold mb-1 ${
                selectedCategory === category.id
                  ? 'text-primary-accent'
                  : 'text-foreground group-hover:text-primary-accent'
              }`}>
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count} skills
              </span>
            </div>
          </button>
        ))}
      </div>

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
