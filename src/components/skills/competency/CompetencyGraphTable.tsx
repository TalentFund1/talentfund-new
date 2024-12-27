import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { SkillCell } from "./SkillCell";
import { roleSkills } from "../data/roleSkills";
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";
import { useParams } from "react-router-dom";
import { skillComparisonService } from '../../../services/benchmarking/services/SkillComparisonService';

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

  const countSkillLevels = (skillName: string, levels: string[], targetLevel: string) => {
    let count = 0;
    const roleState = roleStates[roleId || "123"];
    
    if (roleState && roleState[skillName]) {
      levels.forEach(level => {
        const skillState = roleState[skillName][level.toLowerCase()];
        if (skillState && typeof skillState.level === 'string') {
          // Use skillComparisonService for numerical comparison
          const currentLevelValue = skillComparisonService['getLevelValue'](skillState.level);
          const targetLevelValue = skillComparisonService['getLevelValue'](targetLevel);
          if (currentLevelValue === targetLevelValue) {
            count++;
          }
        }
      });
    }
    return count;
  };

  const skills = getSkillsByCategory();
  const levels = getLevelsForTrack();

  const sortedSkills = skills
    .map(skill => ({
      title: skill.title,
      advancedCount: countSkillLevels(skill.title, levels, 'advanced'),
      intermediateCount: countSkillLevels(skill.title, levels, 'intermediate'),
      beginnerCount: countSkillLevels(skill.title, levels, 'beginner'),
      unspecifiedCount: countSkillLevels(skill.title, levels, 'unspecified')
    }))
    .sort((a, b) => {
      // Use numerical sorting based on level values
      const aTotal = (a.advancedCount * 3) + (a.intermediateCount * 2) + (a.beginnerCount * 1);
      const bTotal = (b.advancedCount * 3) + (b.intermediateCount * 2) + (b.beginnerCount * 1);
      return bTotal - aTotal;
    });

  console.log('Sorted skills with counts:', skills.map(skill => ({
    title: skill.title,
    advanced: countSkillLevels(skill.title, levels, 'advanced'),
    intermediate: countSkillLevels(skill.title, levels, 'intermediate'),
    beginner: countSkillLevels(skill.title, levels, 'beginner'),
    unspecified: countSkillLevels(skill.title, levels, 'unspecified')
  })));

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
          {sortedSkills.map(skillData => (
            <TableRow key={skillData.title} className="hover:bg-background/30 transition-colors">
              <TableCell className="font-medium border-r border-border">
                {skillData.title}
              </TableCell>
              {levels.map((level, index) => (
                <SkillCell 
                  key={level}
                  skillName={skillData.title}
                  details={getSkillDetails(skillData.title, level)}
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