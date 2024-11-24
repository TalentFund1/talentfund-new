import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";

export const calculateBenchmarkPercentage = (
  employeeId: string, 
  roleId: string, 
  level: string,
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
) => {
  console.log('Calculating benchmark:', { employeeId, roleId, level });
  
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Only consider toggled skills for the benchmark
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  if (totalToggledSkills === 0) {
    console.log('No toggled skills found, returning 0%');
    return 0;
  }

  // 1. Basic Skill Match (33.33% weight)
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  // 2. Competency Level Match (33.33% weight)
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, level.toLowerCase());
    if (!roleSkillState) {
      console.log('No competency state found for skill:', skill.title);
      return false; // Changed from true to false to match role benchmark behavior
    }

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      required: roleSkillState.required
    });

    // Only count if the skill is required
    if (roleSkillState.required !== 'required') {
      return false;
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

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    return employeePriority >= rolePriority;
  });

  // 3. Skill Goal Match (33.33% weight)
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) {
      console.log('No skill state found for skill:', skill.title);
      return false; // Changed from true to false to match role benchmark behavior
    }
    return skillState.requirement === 'required' || 
           skillState.requirement === 'skill_goal';
  });

  // Calculate individual percentages
  const skillMatchPercentage = (matchingSkills.length / totalToggledSkills) * 100;
  const competencyMatchPercentage = (competencyMatchingSkills.length / totalToggledSkills) * 100;
  const skillGoalMatchPercentage = (skillGoalMatchingSkills.length / totalToggledSkills) * 100;

  // Calculate weighted average (equal weights)
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  console.log('Benchmark calculation results:', {
    employeeId,
    roleId,
    level,
    totalSkills: totalToggledSkills,
    matchingSkills: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    skillMatchPercentage,
    competencyMatchPercentage,
    skillGoalMatchPercentage,
    averagePercentage
  });

  return averagePercentage;
};