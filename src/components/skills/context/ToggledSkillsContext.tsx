import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { getRoleState, initializeState } = useCompetencyStore();
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

  const { id: urlRoleId } = useParams<{ id: string }>();
  const [currentRoleId, setCurrentRoleId] = useState<string>(urlRoleId || "123");

  useEffect(() => {
    if (urlRoleId) {
      setCurrentRoleId(urlRoleId);
      console.log('Current role ID updated:', urlRoleId);
    }
  }, [urlRoleId]);

  useEffect(() => {
    if (currentRoleId) {
      // Initialize competency state for current role
      initializeState(currentRoleId);
      
      // Get existing role state
      const roleState = getRoleState(currentRoleId);
      console.log('Loading role state for:', currentRoleId, roleState);
      
      // If there's no saved toggle state for this role, initialize it from roleState
      if (!roleToggledSkills[currentRoleId] && roleState && Object.keys(roleState).length > 0) {
        setRoleToggledSkills(prev => ({
          ...prev,
          [currentRoleId]: new Set(Object.keys(roleState))
        }));
      }
    }
  }, [currentRoleId, getRoleState, initializeState, roleToggledSkills]);

  // Save to localStorage whenever roleToggledSkills changes
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
    console.log('Setting toggled skills for role:', { 
      roleId: currentRoleId, 
      skills: Array.from(newSkills),
      previousSkills: Array.from(toggledSkills)
    });
    
    setRoleToggledSkills(prev => {
      const updated = {
        ...prev,
        [currentRoleId]: newSkills
      };
      
      // Immediately persist to localStorage
      try {
        const serialized = Object.fromEntries(
          Object.entries(updated).map(([roleId, skills]) => [
            roleId,
            Array.from(skills)
          ])
        );
        localStorage.setItem('roleToggledSkills', JSON.stringify(serialized));
      } catch (error) {
        console.error('Error immediately persisting toggled skills:', error);
      }
      
      return updated;
    });
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