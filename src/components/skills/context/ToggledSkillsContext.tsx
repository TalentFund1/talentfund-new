import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useToast } from '@/components/ui/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'roleToggledSkills';

const loadSavedSkills = (roleId: string): Set<string> => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed && parsed[roleId]) {
        console.log('Loading saved skills for role:', roleId, parsed[roleId]);
        return new Set(parsed[roleId]);
      }
    }
  } catch (error) {
    console.error('Error loading saved skills:', error);
  }
  return new Set();
};

const saveSkills = (roleId: string, skills: Set<string>): void => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const existingData = savedData ? JSON.parse(savedData) : {};
    
    const updatedData = {
      ...existingData,
      [roleId]: Array.from(skills)
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    console.log('Successfully saved skills for role:', roleId, Array.from(skills));
  } catch (error) {
    console.error('Error saving skills:', error);
  }
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { getRoleState } = useCompetencyStore();
  const { toast } = useToast();
  
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    return matches?.[1] || "123";
  });

  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => 
    loadSavedSkills(currentRoleId)
  );

  // Update currentRoleId when URL changes
  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    if (matches?.[1] && matches[1] !== currentRoleId) {
      setCurrentRoleId(matches[1]);
      const savedSkills = loadSavedSkills(matches[1]);
      setToggledSkillsState(savedSkills);
    }
  }, [window.location.pathname]);

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      previousSkills: Array.from(toggledSkills),
      newSkills: Array.from(newSkills)
    });

    // Save first to ensure persistence
    saveSkills(currentRoleId, newSkills);
    
    // Then update state
    setToggledSkillsState(newSkills);

    // Show toast notification
    const prevSkillsArray = Array.from(toggledSkills);
    const newSkillsArray = Array.from(newSkills);
    
    if (newSkillsArray.length > prevSkillsArray.length) {
      const addedSkill = newSkillsArray.find(skill => !prevSkillsArray.includes(skill));
      if (addedSkill) {
        toast({
          title: "Skill Added",
          description: `${addedSkill} has been added to your skills.`
        });
      }
    } else if (newSkillsArray.length < prevSkillsArray.length) {
      const removedSkill = prevSkillsArray.find(skill => !newSkillsArray.includes(skill));
      if (removedSkill) {
        toast({
          title: "Skill Removed",
          description: `${removedSkill} has been removed from your skills.`
        });
      }
    }
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