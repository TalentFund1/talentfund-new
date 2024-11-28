import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { getRoleState } = useCompetencyStore();
  const [roleToggledSkills, setRoleToggledSkills] = useState<Record<string, Set<string>>>(() => {
    try {
      const savedSkills = localStorage.getItem('roleToggledSkills');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        const result: Record<string, Set<string>> = {};
        Object.entries(parsed).forEach(([roleId, skills]) => {
          result[roleId] = new Set(skills as string[]);
        });
        console.log('Loading role-specific toggled skills from localStorage:', result);
        return result;
      }
    } catch (error) {
      console.error('Error loading role-specific toggled skills from localStorage:', error);
    }
    return {};
  });

  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    return matches?.[1] || "123";
  });

  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    if (matches?.[1]) {
      setCurrentRoleId(matches[1]);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (currentRoleId) {
      const roleState = getRoleState(currentRoleId);
      if (roleState && Object.keys(roleState).length > 0) {
        setRoleToggledSkills(prev => ({
          ...prev,
          [currentRoleId]: new Set(Object.keys(roleState))
        }));
      }
    }
  }, [currentRoleId, getRoleState]);

  useEffect(() => {
    try {
      const serialized = Object.fromEntries(
        Object.entries(roleToggledSkills).map(([roleId, skills]) => [
          roleId,
          Array.from(skills)
        ])
      );
      console.log('Persisting role-specific toggled skills to localStorage:', serialized);
      localStorage.setItem('roleToggledSkills', JSON.stringify(serialized));
    } catch (error) {
      console.error('Error saving role-specific toggled skills to localStorage:', error);
    }
  }, [roleToggledSkills]);

  const toggledSkills = roleToggledSkills[currentRoleId] || new Set();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', { roleId: currentRoleId, skills: Array.from(newSkills) });
    setRoleToggledSkills(prev => ({
      ...prev,
      [currentRoleId]: newSkills
    }));
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