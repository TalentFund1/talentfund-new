import { getSkillImportance } from './utils/skillImportance';
import { generateProgressionForTrack } from './utils/progressionGenerator';
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

const getLevelForTrack = (level: string): number => {
  const values: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] ?? 1;
};

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
    const progressionPoint = index / (levels.length - 1);
    const { level: skillLevel, required } = generateProgressionForTrack(progressionPoint, importance, track);
    
    console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${required})`);
    
    progression[level.toLowerCase()] = {
      level: skillLevel,
      required
    };
  });

  return progression;
};
