import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      console.log('Loading saved skills from localStorage:', savedSkills);
      
      if (!savedSkills) {
        console.log('No saved skills found in localStorage');
        return {};
      }
      
      const parsed = JSON.parse(savedSkills);
      const result: Record<string, Set<string>> = {};
      
      // Convert the parsed arrays back to Sets
      Object.entries(parsed).forEach(([roleId, skills]) => {
        if (Array.isArray(skills)) {
          result[roleId] = new Set(skills.filter(skill => 
            typeof skill === 'string' && skill.length > 0
          ));
        }
      });
      
      console.log('Loaded skills by role:', result);
      return result;
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return {};
    }
  });

  // Get the current role's toggled skills
  const currentRoleId = id || '123';
  const toggledSkills = skillsByRole[currentRoleId] || new Set<string>();

  // Update skills for the current role
  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role', currentRoleId, Array.from(newSkills));
    
    setSkillsByRole(prev => {
      const updated = {
        ...prev,
        [currentRoleId]: newSkills
      };

      try {
        // Convert Sets to arrays for JSON serialization
        const serializable = Object.fromEntries(
          Object.entries(updated).map(([roleId, skills]) => [
            roleId,
            Array.from(skills)
          ])
        );
        
        console.log('Saving skills to localStorage:', serializable);
        localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
      } catch (error) {
        console.error('Error saving skills:', error);
      }

      return updated;
    });
  };

  // Load skills from localStorage when role changes
  useEffect(() => {
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        const newSkillsByRole: Record<string, Set<string>> = {};
        
        Object.entries(parsed).forEach(([roleId, skills]) => {
          if (Array.isArray(skills)) {
            newSkillsByRole[roleId] = new Set(skills.filter(skill => 
              typeof skill === 'string' && skill.length > 0
            ));
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