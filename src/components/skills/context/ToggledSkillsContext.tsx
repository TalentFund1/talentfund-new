import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getAllSkills } from '../data/skillDatabaseService';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'toggled-skills';

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const savedSkills = localStorage.getItem(STORAGE_KEY);
      if (savedSkills) {
        console.log('Loading saved toggled skills from localStorage:', JSON.parse(savedSkills));
        return new Set(JSON.parse(savedSkills));
      }
      
      const allSkills = getAllSkills();
      console.log('Initializing toggled skills with all skills:', allSkills.length);
      return new Set(allSkills.map(skill => skill.title));
    } catch (error) {
      console.error('Error loading toggled skills:', error);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      console.log('Saving toggled skills to localStorage:', Array.from(toggledSkills));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(toggledSkills)));
    } catch (error) {
      console.error('Error saving toggled skills:', error);
    }
  }, [toggledSkills]);

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills 
    }}>
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