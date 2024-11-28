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
  
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    const currentRole = id || selectedRole;
    if (!currentRole) return new Set();

    // Get skills from competency store if they exist
    if (currentStates[currentRole]) {
      return new Set(Object.keys(currentStates[currentRole]));
    }

    // Otherwise use initial skills
    return getInitialSkillsForRole(currentRole);
  });

  useEffect(() => {
    const currentRole = id || selectedRole;
    if (currentRole && currentStates[currentRole]) {
      console.log('Updating toggled skills from competency store for role:', currentRole);
      setToggledSkillsState(new Set(Object.keys(currentStates[currentRole])));
    } else if (currentRole) {
      console.log('Setting initial skills for role:', currentRole);
      setToggledSkillsState(getInitialSkillsForRole(currentRole));
    }
  }, [id, selectedRole, currentStates]);

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
