import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedSkillsContextType {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}

const SelectedSkillsContext = createContext<SelectedSkillsContextType | undefined>(undefined);

export const SelectedSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <SelectedSkillsContext.Provider value={{ selectedSkills, setSelectedSkills }}>
      {children}
    </SelectedSkillsContext.Provider>
  );
};

export const useSelectedSkills = () => {
  const context = useContext(SelectedSkillsContext);
  if (context === undefined) {
    throw new Error('useSelectedSkills must be used within a SelectedSkillsProvider');
  }
  return context;
};