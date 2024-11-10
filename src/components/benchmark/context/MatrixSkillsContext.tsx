import { createContext, useContext, useState, ReactNode } from 'react';

interface MatrixSkillsContextType {
  matrixSkills: string[];
  setMatrixSkills: (skills: string[]) => void;
}

const MatrixSkillsContext = createContext<MatrixSkillsContextType | undefined>(undefined);

export const MatrixSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [matrixSkills, setMatrixSkills] = useState<string[]>([]);

  return (
    <MatrixSkillsContext.Provider value={{ matrixSkills, setMatrixSkills }}>
      {children}
    </MatrixSkillsContext.Provider>
  );
};

export const useMatrixSkills = () => {
  const context = useContext(MatrixSkillsContext);
  if (context === undefined) {
    throw new Error('useMatrixSkills must be used within a MatrixSkillsProvider');
  }
  return context;
};