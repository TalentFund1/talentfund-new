import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
    if (!savedData) {
      console.log('No saved skills found for role:', roleId);
      return new Set();
    }

    const parsed = JSON.parse(savedData);
    if (!parsed || !parsed[roleId]) {
      console.log('No saved skills found for specific role:', roleId);
      return new Set();
    }

    console.log('Successfully loaded saved skills for role:', roleId, parsed[roleId]);
    return new Set(parsed[roleId]);
  } catch (error) {
    console.error('Error loading saved skills:', error);
    return new Set();
  }
};

const saveSkills = (roleId: string, skills: Set<string>): void => {
  if (!roleId) {
    console.error('Cannot save skills: Invalid roleId');
    return;
  }

  try {
    // First get existing data
    const savedData = localStorage.getItem(STORAGE_KEY);
    const existingData = savedData ? JSON.parse(savedData) : {};
    
    // Update with new skills
    const updatedData = {
      ...existingData,
      [roleId]: Array.from(skills)
    };
    
    // Save back to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    console.log('Successfully saved skills for role:', roleId, Array.from(skills));
  } catch (error) {
    console.error('Error saving skills:', error);
  }
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Initialize roleId state
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    return matches?.[1] || "123";
  });

  // Initialize toggledSkills with saved data
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    return loadSavedSkills(currentRoleId);
  });

  // Handle URL/role changes
  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    const newRoleId = matches?.[1] || "123";
    
    if (newRoleId !== currentRoleId) {
      console.log('Role ID changed:', { from: currentRoleId, to: newRoleId });
      setCurrentRoleId(newRoleId);
      
      // Load skills for new role
      const savedSkills = loadSavedSkills(newRoleId);
      setToggledSkillsState(savedSkills);
    }
  }, [window.location.pathname]);

  const setToggledSkills = (newSkills: Set<string>) => {
    try {
      console.log('Setting toggled skills:', {
        roleId: currentRoleId,
        previousCount: toggledSkills.size,
        newCount: newSkills.size
      });

      // First save to ensure persistence
      saveSkills(currentRoleId, newSkills);
      
      // Then update state
      setToggledSkillsState(newSkills);

      // Compare changes for toast notification
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
    } catch (error) {
      console.error('Error in setToggledSkills:', error);
      toast({
        title: "Error",
        description: "Failed to update skills. Please try again.",
        variant: "destructive"
      });
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