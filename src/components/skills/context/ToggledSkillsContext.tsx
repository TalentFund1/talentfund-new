import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { currentStates } = useCompetencyStore();
  
  // Initialize with competency store state and persist in localStorage
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    // Try to load from localStorage first
    const savedSkills = localStorage.getItem('toggledSkills');
    if (savedSkills) {
      console.log('Loading toggled skills from localStorage:', JSON.parse(savedSkills));
      return new Set(JSON.parse(savedSkills));
    }

    // Fall back to competency store state
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length > 0) {
      const primaryRole = availableRoles[0];
      console.log('Initializing toggled skills with primary role state:', primaryRole);
      return new Set(Object.keys(currentStates[primaryRole]));
    }
    
    console.log('No states found, using empty set');
    return new Set();
  });

  // Persist toggled skills to localStorage whenever they change
  useEffect(() => {
    console.log('Persisting toggled skills to localStorage:', Array.from(toggledSkills));
    localStorage.setItem('toggledSkills', JSON.stringify(Array.from(toggledSkills)));
  }, [toggledSkills]);

  // Keep in sync with competency store's primary role while preserving existing toggles
  useEffect(() => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length > 0) {
      const primaryRole = availableRoles[0];
      const competencySkills = new Set(Object.keys(currentStates[primaryRole]));
      
      console.log('Syncing toggled skills with competency store:', {
        role: primaryRole,
        currentToggles: Array.from(toggledSkills),
        competencySkills: Array.from(competencySkills)
      });

      // Merge existing toggles with competency skills
      setToggledSkillsState(prev => {
        const merged = new Set([...prev, ...competencySkills]);
        console.log('Merged toggled skills:', Array.from(merged));
        return merged;
      });
    }
  }, [currentStates]);

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills:', Array.from(newSkills));
    setToggledSkillsState(newSkills);
  };

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
