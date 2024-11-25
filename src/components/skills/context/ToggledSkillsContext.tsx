import { createContext, useContext, useState, useEffect } from 'react';
import { roleSkills } from '../data/roleSkills';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType>({
  toggledSkills: new Set(),
  setToggledSkills: () => {},
});

export const ToggledSkillsProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(new Set());
  const { id } = useParams<{ id: string }>();

  // Initialize toggled skills based on role
  useEffect(() => {
    if (id) {
      const currentRoleSkills = roleSkills[id as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ].map(skill => skill.title);
        
        console.log('Initializing toggled skills for role:', id, allSkills);
        setToggledSkills(new Set(allSkills));
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
  if (!context) {
    throw new Error('useToggledSkills must be used within a ToggledSkillsProvider');
  }
  return context;
};