import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCompetencyStore } from "./CompetencyState";
import { SkillCell } from "./SkillCell";
import { roleSkills } from "../data/roleSkills";
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";
import { generateSkillProgression } from "./autoFillUtils";
import { useToast } from "@/components/ui/use-toast";

interface CompetencyGraphTableProps {
  currentRoleId: string;
  track: "Professional" | "Managerial";
  selectedCategory: string;
  toggledSkills: Set<string>;
}

export const CompetencyGraphTable = ({
  currentRoleId,
  track,
  selectedCategory,
  toggledSkills
}: CompetencyGraphTableProps) => {
  const { toast } = useToast();
  const { setSkillState } = useCompetencyStore();

  const getLevelsForTrack = () => {
    return track === "Managerial" ? Object.keys(managerialLevels) : Object.keys(professionalLevels);
  };

  const getSkillsByCategory = () => {
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills] || roleSkills["123"];
    
    const filterSkillsByCategory = (category: 'specialized' | 'common' | 'certifications') => {
      return currentRoleSkills[category]?.filter(skill => toggledSkills.has(skill.title)) || [];
    };
    
    if (selectedCategory === "all") {
      return [
        ...filterSkillsByCategory('specialized'),
        ...filterSkillsByCategory('common'),
        ...filterSkillsByCategory('certifications')
      ];
    }
    
    if (selectedCategory === "specialized") {
      return filterSkillsByCategory('specialized');
    }
    
    if (selectedCategory === "common") {
      return filterSkillsByCategory('common');
    }
    
    if (selectedCategory === "certification") {
      return filterSkillsByCategory('certifications');
    }
    
    return [];
  };

  const handleGenerateWithAI = () => {
    console.log("Generating skill progressions with AI...");
    const skills = getSkillsByCategory();
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills] || roleSkills["123"];

    skills.forEach(skill => {
      let category = "common";
      if (currentRoleSkills.specialized.some(s => s.title === skill.title)) {
        category = "specialized";
      } else if (currentRoleSkills.certifications.some(s => s.title === skill.title)) {
        category = "certification";
      }

      const progression = generateSkillProgression(skill.title, category, track, currentRoleId);
      
      Object.entries(progression).forEach(([level, state]) => {
        setSkillState(skill.title, state.level, level, state.requirement, currentRoleId);
      });
    });

    toast({
      title: "Skills Generated",
      description: "Skill levels have been automatically generated based on industry standards.",
    });
  };

  const getSkillDetails = (skillName: string, level: string) => {
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills] || roleSkills["123"];
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];
    
    const skill = allSkills.find(s => s.title === skillName);
    if (!skill) return { level: "-", required: "-" };
    
    return {
      level: skill.level || "-",
      required: "required"
    };
  };

  const countSkillLevels = (skillName: string, levels: string[], targetLevel: string) => {
    let count = 0;
    levels.forEach(level => {
      const skillState = useCompetencyStore.getState().currentStates[currentRoleId]?.[skillName]?.[level.toLowerCase()];
      if (skillState?.level?.toLowerCase() === targetLevel.toLowerCase()) {
        count++;
      }
    });
    return count;
  };

  const skills = getSkillsByCategory();
  const levels = getLevelsForTrack();

  const sortedSkills = skills
    .map(skill => ({
      ...skill,
      advancedCount: countSkillLevels(skill.title, levels, 'advanced'),
      intermediateCount: countSkillLevels(skill.title, levels, 'intermediate'),
      beginnerCount: countSkillLevels(skill.title, levels, 'beginner'),
      unspecifiedCount: countSkillLevels(skill.title, levels, 'unspecified')
    }))
    .sort((a, b) => {
      const advancedDiff = b.advancedCount - a.advancedCount;
      if (advancedDiff !== 0) return advancedDiff;
      
      const intermediateDiff = b.intermediateCount - a.intermediateCount;
      if (intermediateDiff !== 0) return intermediateDiff;
      
      const beginnerDiff = b.beginnerCount - a.beginnerCount;
      if (beginnerDiff !== 0) return beginnerDiff;
      
      const unspecifiedDiff = a.unspecifiedCount - b.unspecifiedCount;
      if (unspecifiedDiff !== 0) return unspecifiedDiff;
      
      return a.title.localeCompare(b.title);
    })
    .map(skill => skill.title);

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleGenerateWithAI}
        className="bg-primary hover:bg-primary/90 ml-auto block"
      >
        Generate with AI
      </Button>
      
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
                  <div className="font-semibold">{level.toUpperCase()}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    skillName={skillName}
                    details={getSkillDetails(skillName, level)}
                    isLastColumn={index === levels.length - 1}
                    levelKey={level}
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
