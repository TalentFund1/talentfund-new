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
    const savedSkills = localStorage.getItem('toggledSkillsByRole');
    console.log('Loading saved skills from localStorage:', savedSkills);
    
    if (!savedSkills) return {};
    
    try {
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
  const toggledSkills = skillsByRole[id || '123'] || new Set<string>();

  // Update skills for the current role
  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role', id || '123', Array.from(newSkills));
    setSkillsByRole(prev => {
      const updated = {
        ...prev,
        [id || '123']: newSkills
      };
      
      // Save to localStorage immediately after state update
      try {
        const serializable = Object.fromEntries(
          Object.entries(updated).map(([roleId, skills]) => [
            roleId,
            Array.from(skills)
          ])
        );
        localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
        console.log('Successfully saved skills to localStorage:', serializable);
      } catch (error) {
        console.error('Error saving skills:', error);
      }
      
      return updated;
    });
  };

  // Load saved skills when role changes
  useEffect(() => {
    const savedSkills = localStorage.getItem('toggledSkillsByRole');
    if (savedSkills) {
      try {
        const parsed = JSON.parse(savedSkills);
        const currentRoleSkills = parsed[id || '123'];
        if (Array.isArray(currentRoleSkills)) {
          setSkillsByRole(prev => ({
            ...prev,
            [id || '123']: new Set(currentRoleSkills)
          }));
        }
      } catch (error) {
        console.error('Error loading saved skills for role:', error);
      }
    }
  }, [id]);

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