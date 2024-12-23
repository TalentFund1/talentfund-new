import { RoleSkillState } from "../../../types/skillTypes";
import { getSkillByTitle } from "../data/skills/skillDefinitions";

export const generateSkillProgression = (
  skillTitle: string,
  category: string,
  track: string,
  roleId: string
): Record<string, RoleSkillState> => {
  console.log('Generating progression for:', { skillTitle, category, track, roleId });
  
  const skillData = getSkillByTitle(skillTitle);
  const weight = skillData?.weight || 'necessary';
  const progression: Record<string, RoleSkillState> = {};

  // Get level keys based on track
  const levelKeys = track === "Managerial" 
    ? ['m3', 'm4', 'm5', 'm6'] 
    : ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

  levelKeys.forEach((level, index) => {
    const progressionPoint = index / (levelKeys.length - 1); // 0 to 1

    let skillLevel: string;
    let requirement: 'required' | 'preferred';

    // Determine level and requirement based on weight and progression point
    if (weight === 'critical') {
      if (progressionPoint < 0.3) {
        skillLevel = 'beginner';
        requirement = 'required';
      } else if (progressionPoint < 0.6) {
        skillLevel = 'intermediate';
        requirement = 'required';
      } else {
        skillLevel = 'advanced';
        requirement = 'required';
      }
    } else if (weight === 'technical') {
      if (progressionPoint < 0.2) {
        skillLevel = 'unspecified';
        requirement = 'preferred';
      } else if (progressionPoint < 0.5) {
        skillLevel = 'beginner';
        requirement = 'preferred';
      } else if (progressionPoint < 0.8) {
        skillLevel = 'intermediate';
        requirement = 'required';
      } else {
        skillLevel = 'advanced';
        requirement = 'required';
      }
    } else { // necessary
      if (progressionPoint < 0.3) {
        skillLevel = 'unspecified';
        requirement = 'preferred';
      } else if (progressionPoint < 0.6) {
        skillLevel = 'beginner';
        requirement = 'preferred';
      } else if (progressionPoint < 0.8) {
        skillLevel = 'intermediate';
        requirement = 'preferred';
      } else {
        skillLevel = 'advanced';
        requirement = 'preferred';
      }
    }

    // For managerial track, adjust early levels to be higher
    if (track === "Managerial" && progressionPoint < 0.3) {
      if (skillLevel === 'unspecified') skillLevel = 'beginner';
      if (skillLevel === 'beginner') skillLevel = 'intermediate';
    }

    progression[level] = {
      id: skillTitle,
      skillId: skillTitle,
      roleId: roleId,
      level: skillLevel,
      requirement
    };
  });

  console.log('Generated progression:', progression);
  return progression;
};