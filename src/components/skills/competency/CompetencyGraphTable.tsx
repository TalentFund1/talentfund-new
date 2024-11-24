import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { SkillCell } from "./SkillCell";
import { roleSkills } from "../data/roleSkills";
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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
  const getLevelsForTrack = () => {
    return track === "Managerial" ? Object.keys(managerialLevels) : Object.keys(professionalLevels);
  };

  const getLevelDescription = (level: string): string => {
    const descriptions: { [key: string]: string } = {
      'P1': 'Entry Level - Beginning professional role, learning fundamentals',
      'P2': 'Developing - Building experience and growing technical skills',
      'P3': 'Career - Established professional with solid expertise',
      'P4': 'Senior - Advanced expertise and leadership capabilities',
      'P5': 'Expert - Deep domain knowledge and strategic impact',
      'P6': 'Principal - Highest level of technical leadership',
      'M3': 'Manager - Team leadership and operational management',
      'M4': 'Senior Manager - Department leadership and strategic planning',
      'M5': 'Director - Organizational leadership and vision setting',
      'M6': 'Senior Director - Executive leadership and enterprise strategy'
    };
    return descriptions[level] || level;
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

  const countAdvancedLevels = (skillName: string, levels: string[]) => {
    let advancedCount = 0;
    levels.forEach(level => {
      const skillState = useCompetencyStore.getState().currentStates[currentRoleId]?.[skillName]?.[level.toLowerCase()];
      if (skillState?.level?.toLowerCase() === 'advanced') {
        advancedCount++;
      }
    });
    return advancedCount;
  };

  const skills = getSkillsByCategory();
  const levels = getLevelsForTrack();

  // Sort skills based on the number of advanced levels
  const sortedSkills = skills
    .map(skill => ({
      ...skill,
      advancedCount: countAdvancedLevels(skill.title, levels)
    }))
    .sort((a, b) => {
      // Sort by advanced count first
      const advancedDiff = b.advancedCount - a.advancedCount;
      if (advancedDiff !== 0) return advancedDiff;
      
      // If advanced counts are equal, sort alphabetically
      return a.title.localeCompare(b.title);
    })
    .map(skill => skill.title);

  return (
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
                <div className="font-semibold flex items-center justify-center gap-1">
                  <span>{level.toUpperCase()}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center" className="max-w-[200px] p-2">
                        <p className="text-sm">{getLevelDescription(level)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
  );
};
