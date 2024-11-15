import React, { createContext, useContext, useState } from 'react';

interface SkillsSummaryContextType {
  summarySelectedSkills: string[];
  setSummarySelectedSkills: (skills: string[]) => void;
}

const SkillsSummaryContext = createContext<SkillsSummaryContextType | undefined>(undefined);

export function SkillsSummaryProvider({ children }: { children: React.ReactNode }) {
  const [summarySelectedSkills, setSummarySelectedSkills] = useState<string[]>([]);

  return (
    <SkillsSummaryContext.Provider value={{ summarySelectedSkills, setSummarySelectedSkills }}>
      {children}
    </SkillsSummaryContext.Provider>
  );
}

export function useSkillsSummary() {
  const context = useContext(SkillsSummaryContext);
  if (context === undefined) {
    throw new Error('useSkillsSummary must be used within a SkillsSummaryProvider');
  }
  return context;
}