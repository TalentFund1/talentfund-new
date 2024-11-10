import { createContext, useContext, useState, ReactNode } from 'react';

interface IndependentSkillsContextType {
  independentSkills: string[];
  setIndependentSkills: (skills: string[]) => void;
}

const IndependentSkillsContext = createContext<IndependentSkillsContextType | undefined>(undefined);

export const IndependentSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [independentSkills, setIndependentSkills] = useState<string[]>([]);

  return (
    <IndependentSkillsContext.Provider value={{ independentSkills, setIndependentSkills }}>
      {children}
    </IndependentSkillsContext.Provider>
  );
};

export const useIndependentSkills = () => {
  const context = useContext(IndependentSkillsContext);
  if (context === undefined) {
    throw new Error('useIndependentSkills must be used within an IndependentSkillsProvider');
  }
  return context;
};