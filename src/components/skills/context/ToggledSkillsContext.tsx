import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => new Set());
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
    return matches?.[1] || "123";
  });

  // Initialize toggle states for current role
  useEffect(() => {
    if (currentRoleId) {
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        try {
          const savedState = localStorage.getItem(`roleToggledSkills-${currentRoleId}`);
          if (savedState) {
            const parsedState = JSON.parse(savedState);
            setToggledSkills(new Set(parsedState));
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
            setToggledSkills(new Set(allSkills.map(skill => skill.title)));
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
          setToggledSkills(new Set(allSkills.map(skill => skill.title)));
        }
      }
    }
  }, [currentRoleId]);

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
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Persist toggle states to localStorage
  useEffect(() => {
    if (currentRoleId && toggledSkills.size > 0) {
      try {
        const skillsArray = Array.from(toggledSkills);
        localStorage.setItem(`roleToggledSkills-${currentRoleId}`, JSON.stringify(skillsArray));
        console.log('Persisted toggle states for role:', {
          roleId: currentRoleId,
          skillCount: skillsArray.length
        });
      } catch (error) {
        console.error('Error persisting toggle states:', error);
      }
    }
  }, [toggledSkills, currentRoleId]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      skillCount: newSkills.size
    });
    setToggledSkills(newSkills);
  };

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills: handleSetToggledSkills 
    }}>
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