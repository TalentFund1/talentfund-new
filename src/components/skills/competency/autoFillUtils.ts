interface SkillLevel {
  level: 'unspecified' | 'beginner' | 'intermediate' | 'advanced';
  required: 'required' | 'preferred';
}

export const getAutoFillLevel = (
  level: string, 
  skillCategory: 'specialized' | 'common' | 'certification'
): SkillLevel => {
  // Professional Track (P1-P6)
  if (level.startsWith('P')) {
    const levelNum = parseInt(level.substring(1));
    
    if (skillCategory === 'specialized') {
      if (levelNum <= 2) return { level: 'beginner', required: 'preferred' };
      if (levelNum <= 3) return { level: 'intermediate', required: 'required' };
      return { level: 'advanced', required: 'required' };
    }
    
    if (skillCategory === 'common') {
      if (levelNum <= 2) return { level: 'beginner', required: 'preferred' };
      if (levelNum <= 4) return { level: 'intermediate', required: 'required' };
      return { level: 'advanced', required: 'required' };
    }
    
    // Certification skills
    if (levelNum <= 3) return { level: 'unspecified', required: 'preferred' };
    if (levelNum <= 5) return { level: 'intermediate', required: 'required' };
    return { level: 'advanced', required: 'required' };
  }
  
  // Managerial Track (M3-M6)
  if (level.startsWith('M')) {
    const levelNum = parseInt(level.substring(1));
    
    if (skillCategory === 'specialized') {
      if (levelNum === 3) return { level: 'intermediate', required: 'required' };
      return { level: 'advanced', required: 'required' };
    }
    
    if (skillCategory === 'common') {
      if (levelNum === 3) return { level: 'intermediate', required: 'required' };
      if (levelNum === 4) return { level: 'advanced', required: 'required' };
      return { level: 'advanced', required: 'required' };
    }
    
    // Certification skills
    if (levelNum <= 4) return { level: 'intermediate', required: 'preferred' };
    return { level: 'advanced', required: 'required' };
  }
  
  return { level: 'unspecified', required: 'preferred' };
};