import React, { createContext, useContext } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillsMatrixSearchState {
  matrixSearchSkills: string[];
  setMatrixSearchSkills: (skills: string[]) => void;
}

const useSkillsMatrixSearchStore = create<SkillsMatrixSearchState>()(
  persist(
    (set) => ({
      matrixSearchSkills: [],
      setMatrixSearchSkills: (skills) => set({ matrixSearchSkills: skills }),
    }),
    {
      name: 'skills-matrix-search',
    }
  )
);

const SkillsMatrixSearchContext = createContext<SkillsMatrixSearchState | undefined>(undefined);

export function SkillsMatrixSearchProvider({ children }: { children: React.ReactNode }) {
  const store = useSkillsMatrixSearchStore();

  return (
    <SkillsMatrixSearchContext.Provider value={store}>
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