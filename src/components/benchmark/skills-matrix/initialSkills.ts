import { roleSkills } from "../../skills/data/roleSkills";

export const initialSkills = {
  "123": roleSkills["123"],
  "124": roleSkills["124"],
  "125": roleSkills["125"],
  "126": roleSkills["126"]
};

export const getEmployeeSkills = (employeeId: string) => {
  const skills = initialSkills[employeeId as keyof typeof initialSkills] || initialSkills["123"];
  
  // Combine all skills into a single array with proper structure
  return [
    ...(skills.specialized || []),
    ...(skills.common || []),
    ...(skills.certifications || [])
  ].map(skill => ({
    title: skill.title,
    subcategory: skill.subcategory,
    level: skill.level || 'unspecified',
    growth: skill.growth,
    confidence: 'high',
    requirement: 'required' // Add default requirement
  }));
};