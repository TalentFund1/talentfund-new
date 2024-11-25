import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useRoleIdResolver } from '../../../hooks/useRoleIdResolver';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getInitialSkillsForRole = (roleId: string): Set<string> => {
  console.log('Getting initial skills for role:', roleId);
  
  if (!roleId) {
    console.log('No role ID provided for initial skills');
    return new Set();
  }
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.log('No role skills found for role:', roleId);
    return new Set();
  }

  const specializedSkills = currentRoleSkills.specialized?.map(s => s.title) || [];
  const commonSkills = currentRoleSkills.common?.map(s => s.title) || [];
  const certificationSkills = currentRoleSkills.certifications?.map(s => s.title) || [];

  const skills = new Set([
    ...specializedSkills,
    ...commonSkills,
    ...certificationSkills
  ]);

  console.log('Initial skills for role:', {
    roleId,
    skillsCount: skills.size,
    skills: Array.from(skills)
  });
  return skills;
};

const loadSavedSkills = (roleId: string) => {
  console.log('Loading saved skills for role:', roleId);
  try {
    const savedSkills = localStorage.getItem(`toggled-skills-${roleId}`);
    if (savedSkills) {
      const skills = JSON.parse(savedSkills);
      if (Array.isArray(skills)) {
        const skillSet = new Set(skills.filter(skill => 
          typeof skill === 'string' && skill.length > 0
        ));
        console.log('Loaded saved skills:', {
          roleId,
          skillsCount: skillSet.size,
          skills: Array.from(skillSet)
        });
        return skillSet;
      }
    }
  } catch (error) {
    console.error('Error loading saved skills:', error);
  }
  return new Set();
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const effectiveRoleId = useRoleIdResolver();
  const { initializeStates } = useCompetencyStore();
  
  const [skillsByRole, setSkillsByRole] = useState<Set<string>>(() => {
    const savedSkills = loadSavedSkills(effectiveRoleId);
    if (savedSkills.size === 0) {
      const initialSkills = getInitialSkillsForRole(effectiveRoleId);
      console.log('No saved skills found, using initial skills:', {
        roleId: effectiveRoleId,
        skillsCount: initialSkills.size
      });
      return initialSkills;
    }
    return savedSkills;
  });

  // Initialize competency states when role changes
  useEffect(() => {
    console.log('Role changed, initializing states for:', effectiveRoleId);
    initializeStates(effectiveRoleId);
    
    // Load or initialize skills for the new role
    const savedSkills = loadSavedSkills(effectiveRoleId);
    if (savedSkills.size === 0) {
      const newSkills = getInitialSkillsForRole(effectiveRoleId);
      console.log('Initializing skills for new role:', {
        roleId: effectiveRoleId,
        skillsCount: newSkills.size
      });
      setSkillsByRole(newSkills);
    } else {
      setSkillsByRole(savedSkills);
    }
  }, [effectiveRoleId, initializeStates]);

  // Save skills to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        `toggled-skills-${effectiveRoleId}`,
        JSON.stringify(Array.from(skillsByRole))
      );
      console.log('Saved skills to localStorage:', {
        roleId: effectiveRoleId,
        skillsCount: skillsByRole.size,
        skills: Array.from(skillsByRole)
      });
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  }, [skillsByRole, effectiveRoleId]);

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills:', {
      roleId: effectiveRoleId,
      skillsCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    setSkillsByRole(newSkills);
  };

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills: skillsByRole, setToggledSkills }}>
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