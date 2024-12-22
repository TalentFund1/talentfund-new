import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { UnifiedSkill, EmployeeSkillState } from "@/types/skillTypes";
import { useSkillsMatrixStore } from "../../benchmark/skills-matrix/SkillsMatrixState";

export const processEmployeeSkills = (employeeSkills: UnifiedSkill[]): EmployeeSkillState[] => {
  const { currentStates } = useSkillsMatrixStore.getState();

  return employeeSkills.map(skill => {
    const category = getSkillCategory(skill.title);
    const level = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const requirement = currentStates[skill.title]?.requirement || 'unknown';

    return {
      skillId: skill.id,
      level,
      requirement,
      category
    };
  });
};

export const calculateBenchmarkPercentage = (employeeId: string, roleId: string, baseRole: string, currentStates: any, toggledSkills: Set<string>, getSkillCompetencyState: any) => {
  // Implementation for calculating benchmark percentage
  // ...
};
