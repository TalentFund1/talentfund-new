import { SkillCompetencyState } from '../types';

export const normalizeLevel = (level: string = "", track: string = "Professional"): string => {
  if (!level) {
    return track === "Managerial" ? "m3" : "p4";
  }
  
  if (track === "Professional") {
    const professionalMatch = level.toLowerCase().match(/p[1-6]/);
    if (professionalMatch) {
      return professionalMatch[0];
    }
    
    const numberMatch = level.match(/[1-6]/);
    if (numberMatch) {
      return `p${numberMatch[0]}`;
    }
    
    return level.toLowerCase().startsWith('p') ? level.toLowerCase() : 'p4';
  }
  
  if (track === "Managerial") {
    const managerialMatch = level.toLowerCase().match(/m[3-6]/);
    if (managerialMatch) {
      return managerialMatch[0];
    }
    
    const numberMatch = level.match(/[3-6]/);
    if (numberMatch) {
      return `m${numberMatch[0]}`;
    }
    
    return level.toLowerCase().startsWith('m') ? level.toLowerCase() : 'm3';
  }
  
  return level.toLowerCase().trim();
};

export const determineRequirement = (levelKey: string, track: string): string => {
  if (track === "Professional") {
    const level = parseInt(levelKey.replace(/[^\d]/g, ''));
    return level >= 4 ? "required" : "preferred";
  }
  if (track === "Managerial") {
    const level = parseInt(levelKey.replace(/[^\d]/g, ''));
    return level >= 5 ? "required" : "preferred";
  }
  return "preferred";
};

export const getDefaultState = (track: string, roleLevel: string): SkillCompetencyState => {
  const normalizedLevel = normalizeLevel(roleLevel, track);
  return {
    level: normalizedLevel,
    required: determineRequirement(normalizedLevel, track)
  };
};