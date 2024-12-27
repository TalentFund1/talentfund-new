import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

interface CompetencyMatch2Props {
  employeeId: string;
  selectedRole: string;
  roleLevel: string;
}

const getLevelValue = (level: string): number => {
  const values: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] || 1;
};

export const CompetencyMatch2 = ({ employeeId, selectedRole, roleLevel }: CompetencyMatch2Props) => {
  const [matchCount, setMatchCount] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = useEmployeeSkillsStore((state) => state.getEmployeeSkills(employeeId));

  useEffect(() => {
    if (!employeeSkills || !selectedRole) return;

    const matches = employeeSkills.filter(skill => {
      if (!toggledSkills.has(skill.title)) return false;

      const employeeLevel = skill.level || 'unspecified';
      const roleSkillState = getSkillCompetencyState(skill.title, roleLevel, selectedRole);
      const roleLevel = roleSkillState?.level || 'unspecified';

      const employeeLevelValue = getLevelValue(employeeLevel);
      const roleLevelValue = getLevelValue(roleLevel);

      console.log('CompetencyMatch2 - Comparing levels:', {
        skill: skill.title,
        employeeLevel,
        roleLevel,
        employeeLevelValue,
        roleLevelValue,
        isMatch: employeeLevelValue >= roleLevelValue
      });

      return employeeLevelValue >= roleLevelValue;
    });

    const toggledCount = Array.from(toggledSkills).filter(skillTitle => 
      employeeSkills.some(s => s.title === skillTitle)
    ).length;

    console.log('CompetencyMatch2 - Calculation results:', {
      matches: matches.length,
      totalToggled: toggledCount,
      matchingSkills: matches.map(s => s.title)
    });

    setMatchCount(matches.length);
    setTotalSkills(toggledCount);
  }, [employeeSkills, selectedRole, roleLevel, toggledSkills, getSkillCompetencyState]);

  const percentage = totalSkills > 0 ? (matchCount / totalSkills) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Competency Match 2</span>
        <span className="text-sm text-muted-foreground">{matchCount} out of {totalSkills}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};