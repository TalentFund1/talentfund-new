import { createContext, useContext, useState, ReactNode } from 'react';

interface SkillsContextType {
  savedSkills: Set<string>;
  setSavedSkills: (skills: Set<string>) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider = ({ children }: { children: ReactNode }) => {
  const [savedSkills, setSavedSkills] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <SkillsContext.Provider value={{ 
      savedSkills, 
      setSavedSkills,
      selectedCategory,
      setSelectedCategory
    }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};