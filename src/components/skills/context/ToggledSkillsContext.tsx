import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    const savedSkills = localStorage.getItem('toggledSkillsByRole');
    if (!savedSkills) return {};
    
    try {
      const parsed = JSON.parse(savedSkills);
      const result: Record<string, Set<string>> = {};
      
      Object.entries(parsed).forEach(([roleId, skills]) => {
        if (Array.isArray(skills)) {
          result[roleId] = new Set(skills.filter(skill => 
            typeof skill === 'string' && skill.length > 0
          ));
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return {};
    }
  });

  useEffect(() => {
    if (id === "123") { // AI Engineer ID
      const aiEngineerSkills = roleSkills["123"];
      const allSkills = [
        ...aiEngineerSkills.specialized.map(skill => skill.title),
        ...aiEngineerSkills.common.map(skill => skill.title),
        ...aiEngineerSkills.certifications.map(skill => skill.title)
      ];
      
      console.log('Auto-populating AI Engineer skills:', allSkills);
      
      setSkillsByRole(prev => ({
        ...prev,
        [id]: new Set(allSkills)
      }));
    }
  }, [id]);

  // Get the current role's toggled skills
  const toggledSkills = skillsByRole[id || '123'] || new Set<string>();

  // Update skills for the current role
  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Updating toggled skills for role:', id, Array.from(newSkills));
    setSkillsByRole(prev => ({
      ...prev,
      [id || '123']: newSkills
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
      console.log('Saved skills to localStorage:', serializable);
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