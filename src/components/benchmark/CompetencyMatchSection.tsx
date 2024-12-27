import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { UnifiedSkill } from "../skills/types/SkillTypes";

interface CompetencyMatchSectionProps {
  skills: ReadonlyArray<UnifiedSkill>;
  roleLevel: string;
  employeeId: string;
}

const getLevelValue = (level: string): number => {
  switch (level?.toLowerCase()) {
    case 'advanced': return 3;
    case 'intermediate': return 2;
    case 'beginner': return 1;
    case 'unspecified': return 0;
    default: return 0;
  }
};

export const CompetencyMatchSection = ({ 
  skills, 
  roleLevel,
  employeeId 
}: CompetencyMatchSectionProps) => {
  const { getSkillState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRole } = useRoleStore();

  const matchingSkills = skills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const skillState = getSkillState(skill.title, employeeId);
    const employeeSkillLevel = skillState?.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log(`Analyzing skill match:`, {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      roleId: selectedRole
    });

    // If role level is unspecified, any employee level is considered a match
    if (roleSkillLevel === 'unspecified') return true;

    const employeeLevelValue = getLevelValue(employeeSkillLevel);
    const roleLevelValue = getLevelValue(roleSkillLevel);

    // Employee level should be equal to or higher than role level
    return employeeLevelValue >= roleLevelValue;
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