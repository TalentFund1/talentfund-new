import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { roleSkills } from '../data/roleSkills';
import { useLocation } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getRoleIdFromPath = (path: string): string => {
  const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
  return matches?.[1] || "123";
};

const loadToggledSkills = (roleId: string): Set<string> => {
  try {
    const savedState = localStorage.getItem(`roleToggledSkills-${roleId}`);
    if (savedState) {
      const parsedSkills = JSON.parse(savedState);
      if (Array.isArray(parsedSkills)) {
        console.log('Loading toggled skills for role:', {
          roleId,
          skillCount: parsedSkills.length,
          skills: parsedSkills
        });
        return new Set(parsedSkills);
      }
    }
  } catch (error) {
    console.error('Error loading toggled skills:', error);
  }
  return new Set();
};

const initializeDefaultSkills = (roleId: string): Set<string> => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('No skills found for role:', roleId);
    return new Set();
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].map(skill => skill.title);

  console.log('Initializing default skills for role:', {
    roleId,
    skillCount: allSkills.length,
    skills: allSkills
  });

  return new Set(allSkills);
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { getRoleState } = useCompetencyStore();
  const [currentRoleId, setCurrentRoleId] = useState(() => getRoleIdFromPath(location.pathname));
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const roleId = getRoleIdFromPath(location.pathname);
    const savedSkills = loadToggledSkills(roleId);
    return savedSkills.size > 0 ? savedSkills : initializeDefaultSkills(roleId);
  });

  useEffect(() => {
    const newRoleId = getRoleIdFromPath(location.pathname);
    if (newRoleId !== currentRoleId) {
      console.log('Role ID changed:', { from: currentRoleId, to: newRoleId });
      setCurrentRoleId(newRoleId);
      
      const savedSkills = loadToggledSkills(newRoleId);
      const skillsToUse = savedSkills.size > 0 ? savedSkills : initializeDefaultSkills(newRoleId);
      
      console.log('Updating toggled skills for new role:', {
        roleId: newRoleId,
        skillCount: skillsToUse.size
      });
      
      setToggledSkills(skillsToUse);
    }
  }, [location.pathname, currentRoleId]);

  useEffect(() => {
    if (currentRoleId) {
      const skillsArray = Array.from(toggledSkills);
      localStorage.setItem(`roleToggledSkills-${currentRoleId}`, JSON.stringify(skillsArray));
      console.log('Persisted skills for role:', {
        roleId: currentRoleId,
        skillCount: skillsArray.length
      });
    }
  }, [toggledSkills, currentRoleId]);

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills 
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