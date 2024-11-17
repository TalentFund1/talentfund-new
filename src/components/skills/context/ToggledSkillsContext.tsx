import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const currentRoleId = id || '123';

  // Initialize state from localStorage with better error handling
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      console.log('Initial load - saved skills from localStorage:', savedSkills);
      
      if (!savedSkills) {
        console.log('No saved skills found in localStorage, initializing empty state');
        return {};
      }

      const parsed = JSON.parse(savedSkills);
      const result: Record<string, Set<string>> = {};
      
      Object.entries(parsed).forEach(([roleId, skills]) => {
        if (Array.isArray(skills)) {
          const filteredSkills = skills.filter(skill => typeof skill === 'string' && skill.length > 0);
          console.log(`Restoring ${filteredSkills.length} skills for role ${roleId}`);
          result[roleId] = new Set(filteredSkills);
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error loading initial skills state:', error);
      return {};
    }
  });

  const toggledSkills = skillsByRole[currentRoleId] || new Set<string>();

  const saveToLocalStorage = (updatedSkills: Record<string, Set<string>>) => {
    try {
      const serializable = Object.fromEntries(
        Object.entries(updatedSkills).map(([roleId, skills]) => [
          roleId,
          Array.from(skills)
        ])
      );
      
      console.log('Saving updated skills to localStorage:', serializable);
      localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
    } catch (error) {
      console.error('Error saving skills to localStorage:', error);
    }
  };

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log(`Setting ${Array.from(newSkills).length} toggled skills for role ${currentRoleId}`);
    
    setSkillsByRole(prev => {
      const updated = {
        ...prev,
        [currentRoleId]: newSkills
      };

      // Immediately save to localStorage
      saveToLocalStorage(updated);
      return updated;
    });
  };

  // Load skills when role changes
  useEffect(() => {
    console.log(`Role changed to ${currentRoleId}, reloading skills`);
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        const newSkillsByRole: Record<string, Set<string>> = {};
        
        Object.entries(parsed).forEach(([roleId, skills]) => {
          if (Array.isArray(skills)) {
            const filteredSkills = skills.filter(skill => typeof skill === 'string' && skill.length > 0);
            console.log(`Loaded ${filteredSkills.length} skills for role ${roleId}`);
            newSkillsByRole[roleId] = new Set(filteredSkills);
          }
        });
        
        setSkillsByRole(newSkillsByRole);
      }
    } catch (error) {
      console.error('Error loading skills on role change:', error);
    }
  }, [currentRoleId]);

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