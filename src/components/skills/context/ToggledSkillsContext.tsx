import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [roleToggledSkills, setRoleToggledSkills] = useState<Record<string, Set<string>>>({});
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
    return matches?.[1] || "123";
  });

  // Update currentRoleId when URL changes
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
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, []);

  // Initialize toggle states for new roles
  useEffect(() => {
    if (currentRoleId && !roleToggledSkills[currentRoleId]) {
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        try {
          const savedState = localStorage.getItem(`roleToggledSkills-${currentRoleId}`);
          if (savedState) {
            const parsedState = JSON.parse(savedState);
            setRoleToggledSkills(prev => ({
              ...prev,
              [currentRoleId]: new Set(parsedState)
            }));
            console.log('Loaded saved toggle states for role:', {
              roleId: currentRoleId,
              skillCount: parsedState.length
            });
          } else {
            const allSkills = [
              ...currentRoleSkills.specialized,
              ...currentRoleSkills.common,
              ...currentRoleSkills.certifications
            ];
            setRoleToggledSkills(prev => ({
              ...prev,
              [currentRoleId]: new Set(allSkills.map(skill => skill.title))
            }));
            console.log('Initialized new toggle states for role:', {
              roleId: currentRoleId,
              skillCount: allSkills.length
            });
          }
        } catch (error) {
          console.error('Error initializing toggle states:', error);
          const allSkills = [
            ...currentRoleSkills.specialized,
            ...currentRoleSkills.common,
            ...currentRoleSkills.certifications
          ];
          setRoleToggledSkills(prev => ({
            ...prev,
            [currentRoleId]: new Set(allSkills.map(skill => skill.title))
          }));
        }
      }
    }
  }, [currentRoleId, roleToggledSkills]);

  // Persist toggle states to localStorage
  useEffect(() => {
    if (currentRoleId && roleToggledSkills[currentRoleId]) {
      try {
        const currentRoleSkills = Array.from(roleToggledSkills[currentRoleId]);
        localStorage.setItem(`roleToggledSkills-${currentRoleId}`, JSON.stringify(currentRoleSkills));
        console.log('Persisted toggle states for role:', {
          roleId: currentRoleId,
          skillCount: currentRoleSkills.length
        });
      } catch (error) {
        console.error('Error persisting toggle states:', error);
      }
    }
  }, [roleToggledSkills, currentRoleId]);

  const toggledSkills = roleToggledSkills[currentRoleId] || new Set();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      skillCount: newSkills.size
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