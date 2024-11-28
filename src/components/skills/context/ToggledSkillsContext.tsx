import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { currentStates } = useCompetencyStore();
  
  // Initialize with competency store state
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    // Always use the first available role's state from competency store
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length > 0) {
      const primaryRole = availableRoles[0];
      console.log('Initializing toggled skills with primary role state:', primaryRole);
      return new Set(Object.keys(currentStates[primaryRole]));
    }
    
    console.log('No states found in competency store, using empty set');
    return new Set();
  });

  // Keep in sync with competency store's primary role
  useEffect(() => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length > 0) {
      const primaryRole = availableRoles[0];
      console.log('Syncing toggled skills with primary role:', {
        role: primaryRole,
        skills: Object.keys(currentStates[primaryRole])
      });
      setToggledSkillsState(new Set(Object.keys(currentStates[primaryRole])));
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
