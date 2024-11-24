import { useCompetencyStore } from "./CompetencyState";

export const countAdvancedLevels = (skillName: string, levels: string[]) => {
  let advancedCount = 0;
  levels.forEach(level => {
    const skillState = useCompetencyStore.getState().currentStates[skillName]?.[level.toLowerCase()];
    if (skillState?.level && typeof skillState.level === 'string' && skillState.level.toLowerCase() === 'advanced') {
      advancedCount++;
    }
  });
  return advancedCount;
};