import { useCompetencyStore } from "./CompetencyState";

export const countAdvancedLevels = (skillName: string, levels: string[]) => {
  let advancedCount = 0;
  levels.forEach(level => {
    const skillState = useCompetencyStore.getState().currentStates[skillName]?.[level.toLowerCase()];
    if (skillState?.level && skillState.level.toLowerCase() === 'advanced') {
      advancedCount++;
    }
  });
  return advancedCount;
};

export const sortSkillsByAdvancedCount = (skills: { title: string }[], levels: string[]) => {
  return skills
    .map(skill => ({
      ...skill,
      advancedCount: countAdvancedLevels(skill.title, levels)
    }))
    .sort((a, b) => {
      const advancedDiff = b.advancedCount - a.advancedCount;
      if (advancedDiff !== 0) return advancedDiff;
      return a.title.localeCompare(b.title);
    })
    .map(skill => skill.title);
};