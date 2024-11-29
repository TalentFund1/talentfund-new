import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { roleSkills } from '../data/roleSkills';
import { persistToggledSkills } from '../../benchmark/skills-matrix/skillStateUtils';

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
        console.log('Loading saved toggled skills from localStorage:', result);
        return result;
      }
    } catch (error) {
      console.error('Error loading toggled skills from localStorage:', error);
    }
    return {};
  });

  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
    const roleId = matches?.[1] || "123";
    console.log('Initial role ID:', roleId);
    return roleId;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
      if (matches?.[1]) {
        console.log('URL changed, updating role ID to:', matches[1]);
        setCurrentRoleId(matches[1]);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const pushState = history.pushState;
    history.pushState = function() {
      pushState.apply(history, arguments as any);
      handleLocationChange();
    };

    const replaceState = history.replaceState;
    history.replaceState = function() {
      replaceState.apply(history, arguments as any);
      handleLocationChange();
    };
    
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, []);

  useEffect(() => {
    if (currentRoleId && !roleToggledSkills[currentRoleId]) {
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ];
        
        console.log('Initializing toggle states for role:', {
          roleId: currentRoleId,
          skillCount: allSkills.length,
          skills: allSkills.map(skill => skill.title)
        });

        const savedState = localStorage.getItem(`roleToggledSkills-${currentRoleId}`);
        if (savedState) {
          try {
            const parsedState = JSON.parse(savedState);
            setRoleToggledSkills(prev => ({
              ...prev,
              [currentRoleId]: new Set(parsedState)
            }));
          } catch (error) {
            console.error('Error parsing saved toggle state:', error);
            setRoleToggledSkills(prev => ({
              ...prev,
              [currentRoleId]: new Set(allSkills.map(skill => skill.title))
            }));
          }
        } else {
          setRoleToggledSkills(prev => ({
            ...prev,
            [currentRoleId]: new Set(allSkills.map(skill => skill.title))
          }));
        }
      }
    }
  }, [currentRoleId]);

  useEffect(() => {
    if (currentRoleId && roleToggledSkills[currentRoleId]) {
      persistToggledSkills(currentRoleId, roleToggledSkills[currentRoleId]);
    }
  }, [roleToggledSkills, currentRoleId]);

  const toggledSkills = roleToggledSkills[currentRoleId] || new Set();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
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