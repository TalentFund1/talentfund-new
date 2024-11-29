import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { getRoleState } = useCompetencyStore();
  const [roleToggledSkills, setRoleToggledSkills] = useState<Record<string, Set<string>>>(() => {
    try {
      const result: Record<string, Set<string>> = {};
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('roleToggledSkills-')) {
          const roleId = key.replace('roleToggledSkills-', '');
          const savedState = localStorage.getItem(key);
          if (savedState) {
            try {
              const parsedSkills = JSON.parse(savedState);
              if (Array.isArray(parsedSkills)) {
                result[roleId] = new Set(parsedSkills);
                console.log('Initial load - Restored toggle state for role:', {
                  roleId,
                  skillCount: parsedSkills.length,
                  skills: parsedSkills
                });
              }
            } catch (error) {
              console.error('Error parsing saved state for role:', roleId, error);
            }
          }
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error loading toggled skills from localStorage:', error);
      return {};
    }
  });

  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
    const roleId = matches?.[1] || "123";
    console.log('Initial role ID from URL:', roleId);
    return roleId;
  });

  // Update currentRoleId when URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
      if (matches?.[1]) {
        const newRoleId = matches[1];
        console.log('URL changed, updating role ID:', newRoleId);
        setCurrentRoleId(newRoleId);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Handle programmatic navigation
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
    if (!currentRoleId) return;

    console.log('Checking role initialization:', {
      currentRoleId,
      hasExistingState: !!roleToggledSkills[currentRoleId]
    });

    if (!roleToggledSkills[currentRoleId]) {
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ];
        
        // Try to load role-specific saved state
        const savedState = localStorage.getItem(`roleToggledSkills-${currentRoleId}`);
        if (savedState) {
          try {
            const parsedState = JSON.parse(savedState);
            if (Array.isArray(parsedState)) {
              setRoleToggledSkills(prev => {
                const newState = {
                  ...prev,
                  [currentRoleId]: new Set(parsedState)
                };
                console.log('Loaded saved toggle state for role:', {
                  roleId: currentRoleId,
                  skillCount: parsedState.length,
                  skills: parsedState
                });
                return newState;
              });
            }
          } catch (error) {
            console.error('Error parsing saved toggle state:', error);
            initializeDefaultSkills(allSkills);
          }
        } else {
          initializeDefaultSkills(allSkills);
        }
      }
    }
  }, [currentRoleId]);

  const initializeDefaultSkills = (allSkills: any[]) => {
    console.log('Initializing default skills for role:', {
      roleId: currentRoleId,
      skillCount: allSkills.length,
      skills: allSkills.map(skill => skill.title)
    });
    
    setRoleToggledSkills(prev => ({
      ...prev,
      [currentRoleId]: new Set(allSkills.map(skill => skill.title))
    }));
  };

  // Persist toggle states to localStorage
  useEffect(() => {
    if (currentRoleId && roleToggledSkills[currentRoleId]) {
      try {
        const currentRoleSkills = Array.from(roleToggledSkills[currentRoleId]);
        localStorage.setItem(`roleToggledSkills-${currentRoleId}`, JSON.stringify(currentRoleSkills));
        
        console.log('Persisted toggled skills for role:', {
          roleId: currentRoleId,
          skillCount: currentRoleSkills.length,
          skills: currentRoleSkills
        });
      } catch (error) {
        console.error('Error saving toggled skills to localStorage:', error);
      }
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