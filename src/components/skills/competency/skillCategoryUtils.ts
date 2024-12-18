import { roleSkills } from '../data/roleSkills';
import { specializedSkills, commonSkills, certificationSkills } from '../data/utils/categories/skillLists';

export const isSpecializedSkill = (skill: string, profileId: string): boolean => {
  // First check predefined specialized skills list
  if (specializedSkills.includes(skill)) {
    console.log(`${skill} found in specialized skills list`);
    return true;
  }

  // Then check role-specific specialized skills
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];
  const isRoleSpecialized = currentRoleSkills?.specialized.some(spec => 
    spec.title.toLowerCase() === skill.toLowerCase()
  );

  if (isRoleSpecialized) {
    console.log(`${skill} found in role specialized skills`);
    return true;
  }

  return false;
};

export const isCommonSkill = (skill: string, profileId: string): boolean => {
  // First check predefined common skills list
  if (commonSkills.includes(skill)) {
    console.log(`${skill} found in common skills list`);
    return true;
  }

  // Then check role-specific common skills
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];
  const isRoleCommon = currentRoleSkills?.common.some(common => 
    common.title.toLowerCase() === skill.toLowerCase()
  );

  if (isRoleCommon) {
    console.log(`${skill} found in role common skills`);
    return true;
  }

  return false;
};

export const isCertificationSkill = (skill: string, profileId: string): boolean => {
  // First check predefined certification skills list
  if (certificationSkills.includes(skill)) {
    console.log(`${skill} found in certification skills list`);
    return true;
  }

  // Then check role-specific certification skills
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];
  const isRoleCertification = currentRoleSkills?.certifications.some(cert => 
    cert.title.toLowerCase() === skill.toLowerCase()
  );

  if (isRoleCertification) {
    console.log(`${skill} found in role certification skills`);
    return true;
  }

  return false;
};

export const getSkillCategory = (skill: string, profileId: string): 'specialized' | 'common' | 'certification' => {
  console.log('Determining category for skill:', skill, 'in profile:', profileId);

  if (isSpecializedSkill(skill, profileId)) {
    return 'specialized';
  }
  if (isCertificationSkill(skill, profileId)) {
    return 'certification';
  }
  if (isCommonSkill(skill, profileId)) {
    return 'common';
  }

  // If no specific category is found, check skill name patterns
  const skillLower = skill.toLowerCase();
  if (skillLower.includes('certification') || 
      skillLower.includes('certified') ||
      skillLower.includes('certificate')) {
    console.log(`${skill} categorized as certification based on name`);
    return 'certification';
  }

  if (skillLower.includes('aws') ||
      skillLower.includes('cloud') ||
      skillLower.includes('ai') ||
      skillLower.includes('ml') ||
      skillLower.includes('architecture') ||
      skillLower.includes('design')) {
    console.log(`${skill} categorized as specialized based on keywords`);
    return 'specialized';
  }

  // Default to common if no other category matches
  console.log(`${skill} defaulting to common category`);
  return 'common';
};