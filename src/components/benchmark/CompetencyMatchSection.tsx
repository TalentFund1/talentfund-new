import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

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

  const matchingSkills = skills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log(`Comparing skill: ${skill.title}`);
    console.log(`Role Skill Level: ${roleSkillLevel}`);
    console.log(`Employee Skill Level: ${employeeSkillLevel}`);
    console.log(`Required: ${roleSkillState.required}`);

    // Compare skill levels using priority numbers
    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    console.log(`Employee Priority: ${employeePriority}`);
    console.log(`Role Priority: ${rolePriority}`);
    console.log(`Is Match: ${employeePriority >= rolePriority}\n`);

    // Employee skill level should be equal to or higher than role requirement
    return employeePriority >= rolePriority && 
           roleSkillState.required.toLowerCase() === 'required';
  });

  if (matchingSkills.length === 0) return null;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Competency Match</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {matchingSkills.length}
        </span>
      </div>
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
    </Card>
  );
};