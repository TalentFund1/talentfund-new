import { createContext, useContext, useState, ReactNode } from 'react';

interface BenchmarkSearchContextType {
  benchmarkSearchSkills: string[];
  setBenchmarkSearchSkills: (skills: string[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BenchmarkSearchContext = createContext<BenchmarkSearchContextType | undefined>(undefined);

export const BenchmarkSearchProvider = ({ children }: { children: ReactNode }) => {
  const [benchmarkSearchSkills, setBenchmarkSearchSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BenchmarkSearchContext.Provider value={{ 
      benchmarkSearchSkills, 
      setBenchmarkSearchSkills,
      searchTerm,
      setSearchTerm
    }}>
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