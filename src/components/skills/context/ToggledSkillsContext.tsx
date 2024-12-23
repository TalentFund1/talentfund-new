import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getAllSkills } from '../data/skills/allSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    // Initialize with all skills from the universal skills database
    const allSkills = getAllSkills();
    return new Set(allSkills.map(skill => skill.title));
  });

  console.log('ToggledSkillsProvider - Current toggled skills:', {
    count: toggledSkills.size,
    skills: Array.from(toggledSkills)
  });

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills, setToggledSkills }}>
      {children}
    </ToggledSkillsContext.Provider>
  );
};

export const useToggledSkills = () => {
  const context = useContext(ToggledSkillsContext);
  if (context === undefined) {
    throw new Error('useToggledSkills must be used within a ToggledSkillsProvider');
  }
  return context;
};