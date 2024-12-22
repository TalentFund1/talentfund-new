import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getAllSkills } from '../data/skills/allSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'toggled-skills';

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      // Try to load from localStorage first
      const savedSkills = localStorage.getItem(STORAGE_KEY);
      if (savedSkills) {
        console.log('Loading saved toggled skills from localStorage:', JSON.parse(savedSkills));
        return new Set(JSON.parse(savedSkills));
      }
      
      // If no saved skills, initialize with all skills
      const allSkills = getAllSkills();
      console.log('Initializing toggled skills with all skills:', allSkills.length);
      return new Set(allSkills.map(skill => skill.title));
    } catch (error) {
      console.error('Error loading toggled skills:', error);
      return new Set();
    }
  });

  // Save to localStorage whenever toggledSkills changes
  useEffect(() => {
    try {
      console.log('Saving toggled skills to localStorage:', Array.from(toggledSkills));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(toggledSkills)));
    } catch (error) {
      console.error('Error saving toggled skills:', error);
    }
  }, [toggledSkills]);

  const handleSetToggledSkills = (skills: Set<string>) => {
    console.log('Updating toggled skills:', {
      previousCount: toggledSkills.size,
      newCount: skills.size,
      added: Array.from(skills).filter(s => !toggledSkills.has(s)),
      removed: Array.from(toggledSkills).filter(s => !skills.has(s))
    });
    setToggledSkills(skills);
  };

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills: handleSetToggledSkills 
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