import { createContext, useContext, useState, ReactNode } from 'react';

interface SkillsSearchContextType {
  searchedSkills: string[];
  setSearchedSkills: (skills: string[]) => void;
}

const SkillsSearchContext = createContext<SkillsSearchContextType | undefined>(undefined);

export const SkillsSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchedSkills, setSearchedSkills] = useState<string[]>([]);

  return (
    <SkillsSearchContext.Provider value={{ searchedSkills, setSearchedSkills }}>
      {children}
    </SkillsSearchContext.Provider>
  );
};

export const useSkillsSearch = () => {
  const context = useContext(SkillsSearchContext);
  if (context === undefined) {
    throw new Error('useSkillsSearch must be used within a SkillsSearchProvider');
  }
  return context;
};