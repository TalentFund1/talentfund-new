import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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

  // Get all skills for the role
  const specializedSkills = currentRoleSkills.specialized?.map(s => s.title) || [];
  const commonSkills = currentRoleSkills.common?.map(s => s.title) || [];
  const certificationSkills = currentRoleSkills.certifications?.map(s => s.title) || [];

  // Create a set of all skills
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
  const { initializeStates } = useCompetencyStore();
  
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    console.log('Initializing skills by role, selected role:', selectedRole);
    
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        const result: Record<string, Set<string>> = {};
        
        Object.entries(parsed).forEach(([roleId, skills]) => {
          if (Array.isArray(skills)) {
            result[roleId] = new Set(skills.filter(skill => 
              typeof skill === 'string' && skill.length > 0
            ));
          }
        });

        // Always ensure we have skills for the selected role
        if (selectedRole && (!result[selectedRole] || result[selectedRole].size === 0)) {
          console.log('Initializing missing skills for selected role:', selectedRole);
          result[selectedRole] = getInitialSkillsForRole(selectedRole);
        }
        
        console.log('Loaded toggled skills by role:', result);
        return result;
      }
    } catch (error) {
      console.error('Error loading saved skills:', error);
    }
    
    return selectedRole ? { [selectedRole]: getInitialSkillsForRole(selectedRole) } : {};
  });

  // Initialize competency states when role changes
  useEffect(() => {
    if (selectedRole) {
      console.log('Initializing competency states for selected role:', selectedRole);
      initializeStates(selectedRole);
    }
  }, [selectedRole, initializeStates]);

  // Initialize skills for new roles or when they're empty
  useEffect(() => {
    if (selectedRole) {
      setSkillsByRole(prev => {
        if (!prev[selectedRole] || prev[selectedRole].size === 0) {
          console.log('Initializing skills for selected role:', selectedRole);
          const newSkills = getInitialSkillsForRole(selectedRole);
          return {
            ...prev,
            [selectedRole]: newSkills
          };
        }
        return prev;
      });
    }
  }, [selectedRole]);

  const toggledSkills = skillsByRole[selectedRole] || new Set<string>();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for selected role:', selectedRole, Array.from(newSkills));
    if (selectedRole) {
      setSkillsByRole(prev => ({
        ...prev,
        [selectedRole]: newSkills
      }));
    }
  };

  useEffect(() => {
    try {
      const serializable = Object.fromEntries(
        Object.entries(skillsByRole).map(([roleId, skills]) => [
          roleId,
          Array.from(skills)
        ])
      );
      
      localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
      console.log('Saved toggled skills by role:', serializable);
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  }, [skillsByRole]);

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