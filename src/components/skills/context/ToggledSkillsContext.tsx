import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';

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

  // Create a set of all skills - we want all skills to be toggled by default
  const skills = new Set([
    ...specializedSkills,
    ...commonSkills,
    ...certificationSkills
  ]);

  console.log('Initial skills for role:', roleId, Array.from(skills));
  return skills;
};

const getRoleIdFromPath = (pathname: string): string | null => {
  const matches = pathname.match(/\/employee\/(\d+)|\/skills\/(\d+)/);
  if (matches) {
    return matches[1] || matches[2] || null;
  }
  return null;
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { initializeStates } = useCompetencyStore();
  
  const currentRoleId = id || getRoleIdFromPath(location.pathname) || '';
  
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    console.log('Initializing skills by role, current role ID:', currentRoleId);
    
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

        // Always ensure we have skills for the current role
        if (currentRoleId && (!result[currentRoleId] || result[currentRoleId].size === 0)) {
          console.log('Initializing missing skills for current role:', currentRoleId);
          result[currentRoleId] = getInitialSkillsForRole(currentRoleId);
        }
        
        console.log('Loaded toggled skills by role:', result);
        return result;
      }
    } catch (error) {
      console.error('Error loading saved skills:', error);
    }
    
    return currentRoleId ? { [currentRoleId]: getInitialSkillsForRole(currentRoleId) } : {};
  });

  // Initialize competency states when role changes
  useEffect(() => {
    if (currentRoleId) {
      console.log('Initializing competency states for role:', currentRoleId);
      initializeStates(currentRoleId);
    }
  }, [currentRoleId, initializeStates]);

  // Initialize skills for new roles or when they're empty
  useEffect(() => {
    if (currentRoleId) {
      setSkillsByRole(prev => {
        if (!prev[currentRoleId] || prev[currentRoleId].size === 0) {
          console.log('Initializing skills for role:', currentRoleId);
          const newSkills = getInitialSkillsForRole(currentRoleId);
          return {
            ...prev,
            [currentRoleId]: newSkills
          };
        }
        return prev;
      });
    }
  }, [currentRoleId]);

  const toggledSkills = skillsByRole[currentRoleId] || new Set<string>();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', currentRoleId, Array.from(newSkills));
    setSkillsByRole(prev => ({
      ...prev,
      [currentRoleId]: newSkills
    }));
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