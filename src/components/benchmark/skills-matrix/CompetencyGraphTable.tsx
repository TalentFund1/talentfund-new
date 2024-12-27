import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCompetencyStore } from "../competency/CompetencyState";
import { SkillCell } from "../SkillCell";
import { roleSkills } from "../../skills/data/roleSkills";
import { professionalLevels, managerialLevels } from "../data/levelData";
import { useParams } from "react-router-dom";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

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
  const { roleStates } = useCompetencyStore();
  const { id: roleId } = useParams<{ id: string }>();
  const { getSkillCompetencyState } = useCompetencyStateReader();

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

  const getLevelPriority = (level: string): number => {
    switch (level?.toLowerCase()) {
      case 'advanced': return 4;
      case 'intermediate': return 3;
      case 'beginner': return 2;
      case 'unspecified': return 1;
      default: return 0;
    }
  };

  const getRequirementPriority = (required: string): number => {
    switch (required?.toLowerCase()) {
      case 'required': return 2;
      case 'preferred': return 1;
      default: return 0;
    }
  };

  const skills = getSkillsByCategory();
  const levels = getLevelsForTrack();

  // Enhanced sorting logic
  const sortedSkills = skills
    .map(skill => {
      const competencyState = getSkillCompetencyState(skill.title, levels[0], currentRoleId);
      return {
        title: skill.title,
        level: competencyState.level || 'unspecified',
        required: competencyState.required || 'unknown'
      };
    })
    .sort((a, b) => {
      // First sort by level (advanced to unspecified)
      const levelDiff = getLevelPriority(b.level) - getLevelPriority(a.level);
      if (levelDiff !== 0) return levelDiff;

      // Then sort by requirement (required to preferred)
      const reqDiff = getRequirementPriority(b.required) - getRequirementPriority(a.required);
      if (reqDiff !== 0) return reqDiff;

      // Finally sort alphabetically
      return a.title.localeCompare(b.title);
    })
    .map(skill => skill.title);

  console.log('Sorted skills with priorities:', sortedSkills.map(skillTitle => {
    const competencyState = getSkillCompetencyState(skillTitle, levels[0], currentRoleId);
    return {
      title: skillTitle,
      level: competencyState.level,
      required: competencyState.required,
      levelPriority: getLevelPriority(competencyState.level),
      reqPriority: getRequirementPriority(competencyState.required)
    };
  }));

  return (
    <div className="rounded-lg border border-border bg-white overflow-hidden mb-8">
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
                  levelKey={level.toLowerCase()}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};