import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useRoleStore } from '../../benchmark/RoleBenchmark';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getInitialSkillsForRole = (roleId: string): Set<string> => {
  console.log('Getting initial skills for role:', roleId);
  
  if (!roleId) {
    console.log('No role ID provided');
    return new Set();
  }
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.log('No role skills found for role:', roleId);
    return new Set();
  }

  const specializedSkills = currentRoleSkills.specialized?.map(s => s.title) || [];
  const commonSkills = currentRoleSkills.common?.map(s => s.title) || [];
  const certificationSkills = currentRoleSkills.certifications?.map(s => s.title) || [];

  const skills = new Set([
    ...specializedSkills,
    ...commonSkills,
    ...certificationSkills
  ]);

  console.log('Initial skills for role:', roleId, Array.from(skills));
  return skills;
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { selectedRole } = useRoleStore();
  const { currentStates } = useCompetencyStore();
  const { id } = useParams<{ id: string }>();
  
  // Initialize with competency store state
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    // Always use the first available role's state from competency store
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length > 0) {
      const firstRole = availableRoles[0];
      console.log('Initializing with first available role state:', firstRole);
      return new Set(Object.keys(currentStates[firstRole]));
    }
    
    // Fallback to initial skills only if no states exist
    const defaultRole = "123";
    console.log('No states found, using default role:', defaultRole);
    return getInitialSkillsForRole(defaultRole);
  });

  // Keep in sync with competency store's first role
  useEffect(() => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length > 0) {
      const firstRole = availableRoles[0];
      console.log('Syncing with first role state:', {
        role: firstRole,
        skills: Object.keys(currentStates[firstRole])
      });
      setToggledSkillsState(new Set(Object.keys(currentStates[firstRole])));
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
