import { roleSkills } from '../data/roleSkills';

export const getCategoryForSkill = (skill: any, roleId: string) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Critical skills are those marked as critical weight
  if (skill.weight === 'critical') {
    console.log(`${skill.title} categorized as critical based on weight`);
    return 'critical';
  }
  
  // Technical skills are those marked as technical weight
  if (skill.weight === 'technical') {
    console.log(`${skill.title} categorized as technical based on weight`);
    return 'technical';
  }
  
  // Necessary skills are everything else
  console.log(`${skill.title} categorized as necessary`);
  return 'necessary';
};

export const calculateSkillCounts = (roleId: string) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get all skills for the role
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const counts = {
    all: allSkills.length,
    critical: allSkills.filter(skill => getCategoryForSkill(skill, roleId) === 'critical').length,
    technical: allSkills.filter(skill => getCategoryForSkill(skill, roleId) === 'technical').length,
    necessary: allSkills.filter(skill => getCategoryForSkill(skill, roleId) === 'necessary').length
  };

  console.log('Calculated skill counts:', counts);
  return counts;
};