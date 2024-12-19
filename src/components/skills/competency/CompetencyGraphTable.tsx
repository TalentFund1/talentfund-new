import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { SkillCell } from "./SkillCell";
import { roleSkills } from "../data/roleSkills";
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";
import { useParams } from "react-router-dom";

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

  const countSkillLevels = (skillName: string, levels: string[], targetLevel: string) => {
    let count = 0;
    const roleState = roleStates[roleId || "123"];
    
    if (roleState && roleState[skillName]) {
      levels.forEach(level => {
        const skillState = roleState[skillName][level.toLowerCase()];
        if (skillState && skillState.level?.toLowerCase() === targetLevel.toLowerCase()) {
          count++;
        }
      });
    }
    return count;
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

  const skills = getSkillsByCategory();
  const levels = getLevelsForTrack();

  // Calculate level counts for all skills first
  const skillsWithCounts = skills.map(skill => {
    const advancedCount = countSkillLevels(skill.title, levels, 'advanced');
    const intermediateCount = countSkillLevels(skill.title, levels, 'intermediate');
    const beginnerCount = countSkillLevels(skill.title, levels, 'beginner');
    
    return {
      skill,
      counts: {
        advanced: advancedCount,
        intermediate: intermediateCount,
        beginner: beginnerCount,
        total: advancedCount + intermediateCount + beginnerCount
      }
    };
  });

  console.log('Skills with counts before sorting:', skillsWithCounts.map(({ skill, counts }) => ({
    title: skill.title,
    ...counts
  })));

  // Sort skills based on level counts
  const sortedSkills = skillsWithCounts
    .sort((a, b) => {
      // First compare by number of advanced levels
      if (a.counts.advanced !== b.counts.advanced) {
        return b.counts.advanced - a.counts.advanced;
      }
      
      // Then by number of intermediate levels
      if (a.counts.intermediate !== b.counts.intermediate) {
        return b.counts.intermediate - a.counts.intermediate;
      }
      
      // Then by number of beginner levels
      if (a.counts.beginner !== b.counts.beginner) {
        return b.counts.beginner - a.counts.beginner;
      }
      
      // Finally sort alphabetically
      return a.skill.title.localeCompare(b.skill.title);
    })
    .map(({ skill }) => skill);

  console.log('Sorted skills with counts:', sortedSkills.map(skill => ({
    title: skill.title,
    advanced: countSkillLevels(skill.title, levels, 'advanced'),
    intermediate: countSkillLevels(skill.title, levels, 'intermediate'),
    beginner: countSkillLevels(skill.title, levels, 'beginner')
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
          {sortedSkills.map((skill) => (
            <TableRow key={skill.title} className="hover:bg-background/30 transition-colors">
              <TableCell className="font-medium border-r border-border">
                {skill.title}
              </TableCell>
              {levels.map((level, index) => (
                <SkillCell 
                  key={level}
                  skillName={skill.title}
                  details={getSkillDetails(skill.title, level)}
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