import { roleSkills } from "../skills/data/roleSkills";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { RoleState } from "../skills/competency/state/types";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  level: string,
  currentStates: Record<string, RoleState>,
  getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => { level: string; required: string } | null
) => {
  const employeeSkills = getEmployeeSkills(employeeId);
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  const employeeLevel = level.toLowerCase();

  if (!roleData) {
    console.warn('No role data found for roleId:', roleId);
    return 0;
  }

  const allRoleSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ];

  if (allRoleSkills.length === 0) {
    console.warn('No skills found for role:', roleId);
    return 0;
  }

  let totalWeight = 0;
  let matchedWeight = 0;

  allRoleSkills.forEach(roleSkill => {
    const competencyState = getSkillCompetencyState(roleSkill.title, employeeLevel, roleId);
    if (!competencyState) return;

    const weight = roleSkill.weight === 'critical' ? 3 : 
                  roleSkill.weight === 'technical' ? 2 : 1;

    totalWeight += weight;

    const employeeSkill = employeeSkills.find(skill => skill.title === roleSkill.title);
    if (!employeeSkill) return;

    const employeeSkillLevel = employeeSkill.level?.toLowerCase() || 'unspecified';
    const requiredLevel = competencyState.level.toLowerCase();

    const levelMatch = getLevelMatch(employeeSkillLevel, requiredLevel);
    matchedWeight += weight * levelMatch;
  });

  if (totalWeight === 0) return 0;

  const percentage = (matchedWeight / totalWeight) * 100;
  return Math.min(100, Math.max(0, percentage));
};

const getLevelMatch = (employeeLevel: string, requiredLevel: string): number => {
  const levels = ['beginner', 'intermediate', 'advanced'];
  const employeeLevelIndex = levels.indexOf(employeeLevel);
  const requiredLevelIndex = levels.indexOf(requiredLevel);

  if (employeeLevelIndex === -1 || requiredLevelIndex === -1) return 0;

  if (employeeLevelIndex >= requiredLevelIndex) {
    return 1;
  } else {
    return 0.5;
  }
};