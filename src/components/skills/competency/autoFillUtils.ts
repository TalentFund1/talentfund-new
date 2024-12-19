import { getSkillImportance } from './utils/skillImportance';
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
  console.log(`Generating progression for ${skillName} (${track} track)`, {
    skillName,
    category,
    track,
    roleId
  });
  
  const progression: Record<string, SkillState> = {};
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);

  // Initialize all levels with unspecified/preferred
  levels.forEach(level => {
    const levelKey = level.toLowerCase();
    progression[levelKey] = {
      level: 'unspecified',
      required: 'preferred'
    };
    
    console.log(`Set default state for ${skillName} at level ${levelKey}:`, progression[levelKey]);
  });

  // For managerial track, set higher expectations for leadership skills
  if (track === "Managerial" && category === "common") {
    const importance = getSkillImportance(skillName);
    console.log(`Skill importance for ${skillName}:`, importance);

    if (importance >= 0.8) {
      // High importance skills should be advanced at higher levels
      Object.keys(progression).forEach(level => {
        if (level.startsWith('m') && parseInt(level.slice(1)) >= 5) {
          progression[level] = {
            level: 'advanced',
            required: 'required'
          };
        } else if (level.startsWith('m') && parseInt(level.slice(1)) >= 4) {
          progression[level] = {
            level: 'intermediate',
            required: 'required'
          };
        }
      });
    }
  }

  // For professional track, set technical progression
  if (track === "Professional" && category === "specialized") {
    const importance = getSkillImportance(skillName);
    console.log(`Skill importance for ${skillName}:`, importance);

    if (importance >= 0.7) {
      Object.keys(progression).forEach(level => {
        if (level.startsWith('p') && parseInt(level.slice(1)) >= 5) {
          progression[level] = {
            level: 'advanced',
            required: 'required'
          };
        } else if (level.startsWith('p') && parseInt(level.slice(1)) >= 3) {
          progression[level] = {
            level: 'intermediate',
            required: 'required'
          };
        }
      });
    }
  }

  console.log(`Final progression for ${skillName}:`, progression);
  return progression;
};