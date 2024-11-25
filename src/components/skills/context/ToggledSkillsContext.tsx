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
  const { initializeStates } = useCompetencyStore();
  
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        const result: Record<string, Set<string>> = {};
        
        Object.entries(parsed).forEach(([roleId, skills]) => {
          if (Array.isArray(skills)) {
            result[roleId] = new Set(skills);
          }
        });

        if (selectedRole && (!result[selectedRole] || result[selectedRole].size === 0)) {
          result[selectedRole] = getInitialSkillsForRole(selectedRole);
        }
        
        return result;
      }
    } catch (error) {
      console.error('Error loading saved skills:', error);
    }
    
    return selectedRole ? { [selectedRole]: getInitialSkillsForRole(selectedRole) } : {};
  });

  useEffect(() => {
    if (selectedRole) {
      initializeStates(selectedRole);
    }
  }, [selectedRole, initializeStates]);

  useEffect(() => {
    if (selectedRole && (!skillsByRole[selectedRole] || skillsByRole[selectedRole].size === 0)) {
      setSkillsByRole(prev => ({
        ...prev,
        [selectedRole]: getInitialSkillsForRole(selectedRole)
      }));
    }
  }, [selectedRole, skillsByRole]);

  const toggledSkills = skillsByRole[selectedRole] || new Set<string>();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', selectedRole, Array.from(newSkills));
    if (selectedRole) {
      setSkillsByRole(prev => {
        const updated = {
          ...prev,
          [selectedRole]: newSkills
        };
        
        // Immediately save to localStorage
        try {
          const serializable = Object.fromEntries(
            Object.entries(updated).map(([roleId, skills]) => [
              roleId,
              Array.from(skills)
            ])
          );
          localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
        } catch (error) {
          console.error('Error saving skills:', error);
        }
        
        return updated;
      });
    }
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