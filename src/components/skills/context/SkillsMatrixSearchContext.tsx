import React, { createContext, useContext, useState } from 'react';

interface SkillsMatrixSearchContextType {
  matrixSearchSkills: string[];
  setMatrixSearchSkills: (skills: string[] | ((prev: string[]) => string[])) => void;
}

const SkillsMatrixSearchContext = createContext<SkillsMatrixSearchContextType | undefined>(undefined);

export function SkillsMatrixSearchProvider({ children }: { children: React.ReactNode }) {
  const [matrixSearchSkills, setMatrixSearchSkills] = useState<string[]>([]);

  return (
    <SkillsMatrixSearchContext.Provider value={{ matrixSearchSkills, setMatrixSearchSkills }}>
      {children}
    </SkillsMatrixSearchContext.Provider>
  );
}

export function useSkillsMatrixSearch() {
  const context = useContext(SkillsMatrixSearchContext);
  if (context === undefined) {
    throw new Error('useSkillsMatrixSearch must be used within a SkillsMatrixSearchProvider');
  }
  return context;
}