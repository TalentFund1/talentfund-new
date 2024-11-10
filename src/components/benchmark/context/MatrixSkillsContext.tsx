import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MatrixSkillsContextType {
  matrixSkills: string[];
  setMatrixSkills: (skills: string[]) => void;
}

const MatrixSkillsContext = createContext<MatrixSkillsContextType | undefined>(undefined);

export const MatrixSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [matrixSkills, setMatrixSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('matrixSkills');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('matrixSkills', JSON.stringify(matrixSkills));
  }, [matrixSkills]);

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