import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllSkills } from '../data/skills/allSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'toggled-skills';

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      console.log('Loading toggled skills from storage:', JSON.parse(stored));
      return new Set(JSON.parse(stored));
    }
    
    // Initialize with all skills if no stored state
    const allSkills = getAllSkills();
    console.log('Initializing toggled skills with all skills:', allSkills.length);
    return new Set(allSkills.map(skill => skill.title));
  });

  // Persist to localStorage whenever toggledSkills changes
  useEffect(() => {
    console.log('Persisting toggled skills to storage:', Array.from(toggledSkills));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(toggledSkills)));
  }, [toggledSkills]);

  console.log('ToggledSkillsProvider - Current toggled skills:', {
    count: toggledSkills.size,
    skills: Array.from(toggledSkills)
  });

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills, setToggledSkills }}>
      {children}
    </ToggledSkillsContext.Provider>
  );
};

export const useToggledSkills = () => {
  const context = useContext(ToggledSkillsContext);
  if (context === undefined) {
    throw new Error('useToggledSkills must be used within a ToggledSkillsProvider');
  }
  return context;
};