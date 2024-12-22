import { createContext, useContext, useState, ReactNode } from 'react';
import { getAllSkills } from '../data/skills/allSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    // Initialize with all universal skills
    const universalSkills = getAllSkills().map(skill => skill.title);
    console.log('Initializing with universal skills:', universalSkills);
    return new Set(universalSkills);
  });

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills:', {
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    setToggledSkills(newSkills);
  };

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills: handleSetToggledSkills 
    }}>
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