export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const normalizeLevel = (level: string = "", roleId: string = "", track: string = "Professional"): string => {
  if (!level) {
    return track === "Managerial" ? "m5" : "p4";
  }
  
  // Handle professional track levels (P1-P6)
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
  
  // Handle managerial track levels (M3-M6)
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