import { roleSkills } from "../data/roleSkills";

export const filterSkillsByCategory = (skills: any[], category: string, roleId: string) => {
  if (category === "all") {
    return skills;
  }

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) return skills;

  return skills.filter(skill => {
    const subcategory = skill.subcategory?.toLowerCase();
    const title = skill.title?.toLowerCase();

    switch (category) {
      case "critical":
        return title.includes('machine learning') ||
               title.includes('deep learning') ||
               subcategory === 'ai & ml' ||
               subcategory === 'ai applications';
      case "technical":
        return subcategory === 'programming languages' ||
               subcategory === 'ml frameworks' ||
               subcategory === 'cloud certification';
      case "necessary":
        return subcategory === 'communication' ||
               title.includes('writing') ||
               subcategory === 'development tools';
      default:
        return true;
    }
  });
};