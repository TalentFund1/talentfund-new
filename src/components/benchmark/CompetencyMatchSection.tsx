import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";

interface CompetencyMatchSectionProps {
  skills: any[];
  roleLevel: string;
}

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const CompetencyMatchSection = ({ skills, roleLevel }: CompetencyMatchSectionProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole } = useRoleStore();

  const matchingSkills = skills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log(`Analyzing skill: ${skill.title}`);
    console.log(`Role Skill Level: ${roleSkillLevel}`);
    console.log(`Employee Skill Level: ${employeeSkillLevel}`);

    // Get priority numbers for comparison
    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    console.log(`Employee Priority: ${employeePriority}`);
    console.log(`Role Priority: ${rolePriority}`);

    // Match if either:
    // 1. Levels are exactly equal
    // 2. Employee level is higher than role requirement
    const isMatch = employeePriority >= rolePriority;
    
    console.log(`Is Match: ${isMatch}\n`);

    return isMatch;
  });

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Competency Match</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {matchingSkills.length}
        </span>
      </div>
      {matchingSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {matchingSkills.map((skill) => (
            <Badge 
              key={skill.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
            >
              {skill.title}
              <div className={`h-2 w-2 rounded-full bg-primary-accent`} />
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};