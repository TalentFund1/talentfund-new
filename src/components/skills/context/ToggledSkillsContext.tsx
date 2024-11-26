import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useRoleStore } from '../../benchmark/RoleBenchmark';
import { useToast } from '@/components/ui/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
  toggleSkill: (skill: string) => void;
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
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
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

  useEffect(() => {
    if (selectedRole) {
      console.log('Initializing competency states for selected role:', selectedRole);
      initializeStates(selectedRole);
    }
  }, [selectedRole, initializeStates]);

  useEffect(() => {
    const currentRole = id || selectedRole;
    if (currentRole) {
      setSkillsByRole(prev => {
        if (!prev[currentRole] || prev[currentRole].size === 0) {
          console.log('Initializing skills for role:', currentRole);
          const newSkills = getInitialSkillsForRole(currentRole);
          return {
            ...prev,
            [currentRole]: newSkills
          };
        }
        return prev;
      });
    }
  }, [id, selectedRole]);

  const currentRole = id || selectedRole;
  const toggledSkills = currentRole ? (skillsByRole[currentRole] || new Set<string>()) : new Set<string>();

  const setToggledSkills = useCallback((newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', currentRole, Array.from(newSkills));
    if (currentRole) {
      setSkillsByRole(prev => {
        const updated = {
          ...prev,
          [currentRole]: newSkills
        };
        
        try {
          const serializable = Object.fromEntries(
            Object.entries(updated).map(([roleId, skills]) => [
              roleId,
              Array.from(skills)
            ])
          );
          localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
          console.log('Saved toggled skills by role:', serializable);
        } catch (error) {
          console.error('Error saving skills:', error);
        }
        return updated;
      });

      // Force a re-render of components using the context
      setTimeout(() => {
        initializeStates(currentRole);
      }, 0);
    }
  }, [currentRole, initializeStates]);

  const toggleSkill = useCallback((skill: string) => {
    if (!currentRole) return;
    
    console.log('Toggling skill:', skill, 'for role:', currentRole);
    setSkillsByRole(prev => {
      const currentSkills = prev[currentRole] || new Set<string>();
      const newSkills = new Set(currentSkills);
      
      if (newSkills.has(skill)) {
        newSkills.delete(skill);
        toast({
          title: "Skill Removed",
          description: `${skill} has been removed from your skills.`,
        });
      } else {
        newSkills.add(skill);
        toast({
          title: "Skill Added",
          description: `${skill} has been added to your skills.`,
        });
      }

      const updated = {
        ...prev,
        [currentRole]: newSkills
      };

      try {
        const serializable = Object.fromEntries(
          Object.entries(updated).map(([roleId, skills]) => [
            roleId,
            Array.from(skills)
          ])
        );
        localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
        console.log('Saved toggled skills by role:', serializable);
      } catch (error) {
        console.error('Error saving skills:', error);
      }

      // Force a re-render of components using the context
      setTimeout(() => {
        initializeStates(currentRole);
      }, 0);

      return updated;
    });
  }, [currentRole, initializeStates, toast]);

  const contextValue = {
    toggledSkills,
    setToggledSkills,
    toggleSkill
  };

  return (
    <ToggledSkillsContext.Provider value={contextValue}>
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