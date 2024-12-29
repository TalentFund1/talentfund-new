import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllSkills } from '../data/skills/allSkills';
import { useParams } from 'react-router-dom';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    // Try to load from localStorage first
    const storageKey = `toggled-skills-${id}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      console.log('Loading toggled skills from storage:', JSON.parse(stored));
      return new Set(JSON.parse(stored));
    }
    
    // If no stored state, initialize with employee's existing skills
    if (id) {
      const employeeSkills = getEmployeeSkills(id);
      console.log('Initializing toggled skills with employee skills:', {
        employeeId: id,
        skillCount: employeeSkills.length,
        skills: employeeSkills.map(s => s.title)
      });
      return new Set(employeeSkills.map(skill => skill.title));
    }
    
    // Fallback to all skills if no employee ID
    const allSkills = getAllSkills();
    console.log('Initializing toggled skills with all skills:', allSkills.length);
    return new Set(allSkills.map(skill => skill.title));
  });

  // Persist to localStorage whenever toggledSkills changes
  useEffect(() => {
    if (id) {
      const storageKey = `toggled-skills-${id}`;
      console.log('Persisting toggled skills to storage:', {
        employeeId: id,
        skillCount: toggledSkills.size,
        skills: Array.from(toggledSkills)
      });
      localStorage.setItem(storageKey, JSON.stringify(Array.from(toggledSkills)));
    }
  }, [toggledSkills, id]);

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