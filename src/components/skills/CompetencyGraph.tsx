import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { SkillCell } from "./competency/SkillCell";
import { CategorySelect } from "./competency/CategorySelect";
import { skillsByCategory } from "./competency/skillsData";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });

  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">(track);
  const [skillsData, setSkillsData] = useState(skillsByCategory);

  useEffect(() => {
    setCurrentTrack(track);
  }, [track]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const getSkillsForCategory = () => {
    const categoryData = skillsData[selectedCategory as keyof typeof skillsData];
    return currentTrack === "Professional" ? categoryData.professional : categoryData.managerial;
  };

  const handleSkillUpdate = (skillName: string, level: string, field: 'level' | 'required', newValue: string) => {
    setSkillsData(prevData => {
      const newData = { ...prevData };
      const categoryData = newData[selectedCategory as keyof typeof skillsData];
      const trackData = currentTrack === "Professional" ? categoryData.professional : categoryData.managerial;
      
      Object.keys(trackData).forEach(levelKey => {
        const skills = trackData[levelKey];
        const skillIndex = skills.findIndex(s => s.name === skillName && s.level === level);
        if (skillIndex !== -1) {
          skills[skillIndex] = {
            ...skills[skillIndex],
            [field]: newValue
          };
        }
      });

      return newData;
    });
  };

  const skills = getSkillsForCategory();
  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  const uniqueSkills = Array.from(
    new Set(
      Object.values(skills)
        .flat()
        .map((skill) => skill.name)
    )
  );

  const getSkillDetails = (skillName: string, level: string) => {
    const skillLevel = skills[level];
    return skillLevel?.find((s) => s.name === skillName) || { level: "-", required: "-" };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
        <Separator className="my-4" />
        <div className="mb-6">
          <CategorySelect 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory}
          />
        </div>
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
                {levels.map((level, index) => {
                  const details = getSkillDetails(skillName, level);
                  return (
                    <TableCell 
                      key={level}
                      className={`text-center p-2 align-middle ${index !== levels.length - 1 ? 'border-r' : ''} border-border`}
                    >
                      {details.level !== "-" ? (
                        <div className="flex flex-col items-center gap-2">
                          <Select 
                            defaultValue={details.level.toLowerCase()}
                            onValueChange={(value) => handleSkillUpdate(skillName, details.level, 'level', value)}
                          >
                            <SelectTrigger className="w-[140px] bg-white border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="unspecified">Unspecified</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select 
                            defaultValue={details.required.toLowerCase()}
                            onValueChange={(value) => handleSkillUpdate(skillName, details.level, 'required', value)}
                          >
                            <SelectTrigger className="w-[140px] bg-white border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="required">Required</SelectItem>
                              <SelectItem value="preferred">Preferred</SelectItem>
                              <SelectItem value="unspecified">Unspecified</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/30">-</span>
                      )}
                    </TableCell>
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