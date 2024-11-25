import { roleSkills } from '../data/roleSkills';

export interface SkillUsage {
  name: string;
  category: string;
  subcategory: string;
  proficiency: number;
  usageCount: number;
}

export const categorizeSkill = (skill: string, growth: string = "0%") => {
  const growthNumber = parseInt(growth.replace('%', ''));
  
  // Critical skills are those with high growth or frequently used
  if (growthNumber >= 25) {
    return "Critical Skills";
  }
  
  // Technical skills are those related to technical categories
  const technicalCategories = [
    "AI & Machine Learning",
    "Programming Languages",
    "Software Development",
    "Data Engineering",
    "DevOps"
  ];
  
  if (technicalCategories.some(cat => skill.toLowerCase().includes(cat.toLowerCase()))) {
    return "Technical Skills";
  }
  
  // All other skills are necessary skills
  return "Necessary Skills";
};

export const countSkillUsage = (toggledSkills: Set<string>) => {
  const skillUsage: Record<string, number> = {};
  const skillDetails: Record<string, { subcategory: string; proficiency: number }> = {};

  // Count skill usage across all role profiles
  Object.values(roleSkills).forEach(roleSkill => {
    const allSkills = [
      ...roleSkill.specialized,
      ...roleSkill.common,
      ...roleSkill.certifications
    ];

    allSkills.forEach(skill => {
      if (toggledSkills.has(skill.title)) {
        skillUsage[skill.title] = (skillUsage[skill.title] || 0) + 1;
        skillDetails[skill.title] = {
          subcategory: skill.subcategory,
          proficiency: parseInt(skill.growth.replace('%', ''))
        };
      }
    });
  });

  // Transform into array with categories
  const skillsData: SkillUsage[] = Object.entries(skillUsage).map(([name, count]) => ({
    name,
    category: categorizeSkill(name, `${skillDetails[name]?.proficiency}%`),
    subcategory: skillDetails[name]?.subcategory || "Other",
    proficiency: skillDetails[name]?.proficiency || 0,
    usageCount: count
  }));

  // Sort by usage count (descending)
  return skillsData.sort((a, b) => b.usageCount - a.usageCount);
};