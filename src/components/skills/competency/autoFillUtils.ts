interface SkillLevel {
  level: 'unspecified' | 'beginner' | 'intermediate' | 'advanced';
  required: 'required' | 'preferred';
}

const getAISkillProgression = (
  skillCategory: 'specialized' | 'common' | 'certification',
  level: string
): SkillLevel => {
  const levelNum = parseInt(level.substring(1));
  
  // AI Engineer specialized skills progression
  if (skillCategory === 'specialized') {
    if (levelNum <= 2) return { level: 'beginner', required: 'required' };
    if (levelNum <= 4) return { level: 'intermediate', required: 'required' };
    return { level: 'advanced', required: 'required' };
  }
  
  // Common skills progression
  if (skillCategory === 'common') {
    if (levelNum <= 2) return { level: 'beginner', required: 'preferred' };
    if (levelNum <= 3) return { level: 'intermediate', required: 'required' };
    return { level: 'advanced', required: 'required' };
  }
  
  // AI Certifications progression
  if (skillCategory === 'certification') {
    if (levelNum <= 2) return { level: 'unspecified', required: 'preferred' };
    if (levelNum <= 4) return { level: 'intermediate', required: 'required' };
    return { level: 'advanced', required: 'required' };
  }
  
  return { level: 'unspecified', required: 'preferred' };
};

const getManagerialSkillProgression = (
  skillCategory: 'specialized' | 'common' | 'certification',
  level: string
): SkillLevel => {
  const levelNum = parseInt(level.substring(1));
  
  if (skillCategory === 'specialized') {
    if (levelNum === 3) return { level: 'intermediate', required: 'required' };
    return { level: 'advanced', required: 'required' };
  }
  
  if (skillCategory === 'common') {
    if (levelNum === 3) return { level: 'intermediate', required: 'required' };
    return { level: 'advanced', required: 'required' };
  }
  
  // Certifications for managers
  if (levelNum <= 4) return { level: 'intermediate', required: 'preferred' };
  return { level: 'advanced', required: 'required' };
};

export const getAutoFillLevel = (
  level: string, 
  skillCategory: 'specialized' | 'common' | 'certification',
  roleId: string = '123' // Default to AI Engineer
): SkillLevel => {
  console.log('Auto-filling level for:', { level, skillCategory, roleId });
  
  // Professional Track (P1-P6)
  if (level.startsWith('P')) {
    if (roleId === '123') { // AI Engineer
      return getAISkillProgression(skillCategory, level);
    }
    // Add other professional roles here if needed
  }
  
  // Managerial Track (M3-M6)
  if (level.startsWith('M')) {
    return getManagerialSkillProgression(skillCategory, level);
  }
  
  console.log('Defaulting to unspecified level');
  return { level: 'unspecified', required: 'preferred' };
};