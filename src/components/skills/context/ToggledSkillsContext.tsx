import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getInitialSkillsForRole = (roleId: string): Set<string> => {
  if (!roleId) return new Set();
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) return new Set();

  return new Set([
    ...(currentRoleSkills.specialized?.map(s => s.title) || []),
    ...(currentRoleSkills.common?.map(s => s.title) || []),
    ...(currentRoleSkills.certifications?.map(s => s.title) || [])
  ]);
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const currentRoleId = id || '';
  
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
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

        // If we have a currentRoleId but no skills for it, initialize them
        if (currentRoleId && !result[currentRoleId]) {
          result[currentRoleId] = getInitialSkillsForRole(currentRoleId);
        }
        
        console.log('Loaded toggled skills by role:', result);
        return result;
      }
    } catch (error) {
      console.error('Error loading saved skills:', error);
    }
    
    // If no saved skills or error, initialize with current role
    return currentRoleId ? { [currentRoleId]: getInitialSkillsForRole(currentRoleId) } : {};
  });

  // Initialize skills for new roles
  useEffect(() => {
    if (currentRoleId && !skillsByRole[currentRoleId]) {
      setSkillsByRole(prev => ({
        ...prev,
        [currentRoleId]: getInitialSkillsForRole(currentRoleId)
      }));
    }
  }, [currentRoleId]);

  // Get the current role's toggled skills
  const toggledSkills = skillsByRole[currentRoleId] || new Set<string>();

  // Update skills for the current role
  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', currentRoleId, Array.from(newSkills));
    setSkillsByRole(prev => ({
      ...prev,
      [currentRoleId]: newSkills
    }));
  };

  // Save to localStorage whenever skillsByRole changes
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