import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const savedSkills = localStorage.getItem('toggledSkills');
    return savedSkills ? new Set(JSON.parse(savedSkills)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('toggledSkills', JSON.stringify(Array.from(toggledSkills)));
  }, [toggledSkills]);

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