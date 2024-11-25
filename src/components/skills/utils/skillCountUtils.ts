import { roleSkills } from '../data/roleSkills';

export const getCategoryForSkill = (skill: any, roleId: string) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Critical skills are specialized skills with high growth
  if (currentRoleSkills.specialized.some(s => s.title === skill.title) && 
      parseFloat(skill.growth) >= 25) {
    return 'critical';
  }
  
  // Technical skills are specialized or common skills related to technical aspects
  if (currentRoleSkills.specialized.some(s => s.title === skill.title) ||
      (currentRoleSkills.common.some(s => s.title === skill.title) && 
       !skill.title.toLowerCase().includes('soft'))) {
    return 'technical';
  }
  
  // Necessary skills are everything else
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

  return {
    all: allSkills.length,
    critical: allSkills.filter(skill => getCategoryForSkill(skill, roleId) === 'critical').length,
    technical: allSkills.filter(skill => getCategoryForSkill(skill, roleId) === 'technical').length,
    necessary: allSkills.filter(skill => getCategoryForSkill(skill, roleId) === 'necessary').length
  };
};