import { getSkillImportance } from './utils/skillImportance';
import { generateProgressionForTrack } from './utils/progressionGenerator';
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

interface SkillState {
  level: string;
  required: string;
}

export const generateSkillProgression = (
  skillName: string,
  category: string,
  track: "Professional" | "Managerial",
  roleId: string
): Record<string, SkillState> => {
  console.log(`Generating progression for ${skillName} (${track} track)`);
  
  const progression: Record<string, SkillState> = {};
  const importance = getSkillImportance(skillName, category, track, roleId);
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);

  console.log(`Skill importance for ${skillName}: ${importance}`);

  levels.forEach((level, index) => {
    // Normalize index to a 0-1 scale for progression calculation
    const progressionPoint = index / (levels.length - 1);
    
    const { skillLevel, requirement } = generateProgressionForTrack(progressionPoint, importance, track);
    
    console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${requirement})`);
    
    progression[level.toLowerCase()] = {
      level: skillLevel,
      required: requirement
    };
  });

  return progression;
};