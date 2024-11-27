import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { getBaseRole } from "../EmployeeTable";

export const calculateBenchmarkPercentage = (
  employeeId: string, 
  roleId: string, 
  level: string,
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
) => {
  console.log('Starting benchmark calculation:', { 
    employeeId, 
    roleId, 
    level,
    toggledSkillsCount: toggledSkills.size
  });
  
  const employeeSkills = getEmployeeSkills(employeeId);
  console.log('Employee skills loaded:', employeeSkills.map(s => s.title));

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Only consider toggled skills for the benchmark
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  console.log('Toggled role skills:', {
    total: totalToggledSkills,
    skills: toggledRoleSkills.map(s => s.title)
  });

  if (totalToggledSkills === 0) {
    console.log('No toggled skills found, returning 0%');
    return 0;
  }

  // 1. Basic Skill Match (33.33% weight)
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    console.log(`Checking skill match: ${roleSkill.title} - ${hasSkill ? 'Found' : 'Not found'}`);
    return hasSkill;
  });

  // 2. Competency Level Match (33.33% weight)
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, level.toLowerCase());
    if (!roleSkillState) {
      console.log('No competency state found for skill:', skill.title);
      // For manager roles, consider it a match if they have the skill
      return getBaseRole(level).toLowerCase().includes('m');
    }

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

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

    const isMatch = employeePriority >= rolePriority;
    console.log(`Competency match for ${skill.title}: ${isMatch ? 'Yes' : 'No'} (${employeeSkillLevel} >= ${roleSkillLevel})`);
    return isMatch;
  });

  // 3. Skill Goal Match (33.33% weight)
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) {
      console.log('No skill state found for skill:', skill.title);
      // For manager roles, consider it a match if they have the skill
      return getBaseRole(level).toLowerCase().includes('m');
    }
    const isMatch = skillState.requirement === 'required' || 
                   skillState.requirement === 'skill_goal';
    console.log(`Skill goal match for ${skill.title}: ${isMatch ? 'Yes' : 'No'} (${skillState.requirement})`);
    return isMatch;
  });

  // Calculate individual percentages
  const skillMatchPercentage = (matchingSkills.length / totalToggledSkills) * 100;
  const competencyMatchPercentage = (competencyMatchingSkills.length / totalToggledSkills) * 100;
  const skillGoalMatchPercentage = (skillGoalMatchingSkills.length / totalToggledSkills) * 100;

  // Calculate weighted average (equal weights)
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  console.log('Final benchmark calculation results:', {
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