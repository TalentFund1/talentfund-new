import React, { createContext, useContext, useState } from 'react';

interface BenchmarkSearchContextType {
  benchmarkSearchSkills: string[];
  setBenchmarkSearchSkills: (skills: string[] | ((prev: string[]) => string[])) => void;
}

const BenchmarkSearchContext = createContext<BenchmarkSearchContextType | undefined>(undefined);

export function BenchmarkSearchProvider({ children }: { children: React.ReactNode }) {
  const [benchmarkSearchSkills, setBenchmarkSearchSkills] = useState<string[]>([]);

  return (
    <BenchmarkSearchContext.Provider value={{ benchmarkSearchSkills, setBenchmarkSearchSkills }}>
      {children}
    </BenchmarkSearchContext.Provider>
  );
}

export function useBenchmarkSearch() {
  const context = useContext(BenchmarkSearchContext);
  if (context === undefined) {
    throw new Error('useBenchmarkSearch must be used within a BenchmarkSearchProvider');
  }
  return context;
}