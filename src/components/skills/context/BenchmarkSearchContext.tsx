import { createContext, useContext, useState, ReactNode } from 'react';

interface BenchmarkSearchContextType {
  benchmarkSearchSkills: string[];
  setBenchmarkSearchSkills: (skills: string[]) => void;
}

const BenchmarkSearchContext = createContext<BenchmarkSearchContextType | undefined>(undefined);

export const BenchmarkSearchProvider = ({ children }: { children: ReactNode }) => {
  const [benchmarkSearchSkills, setBenchmarkSearchSkills] = useState<string[]>([]);

  return (
    <BenchmarkSearchContext.Provider value={{ benchmarkSearchSkills, setBenchmarkSearchSkills }}>
      {children}
    </BenchmarkSearchContext.Provider>
  );
};

export const useBenchmarkSearch = () => {
  const context = useContext(BenchmarkSearchContext);
  if (context === undefined) {
    throw new Error('useBenchmarkSearch must be used within a BenchmarkSearchProvider');
  }
  return context;
};