import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'roleToggledSkills';

const validateSkillsData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  return true;
};

const loadSavedSkills = (roleId: string): Set<string> => {
  try {
    console.log('Loading saved skills - Step 1: Starting load for role:', roleId);
    
    if (!roleId) {
      console.warn('Invalid roleId provided to loadSavedSkills');
      return new Set();
    }

    const savedData = localStorage.getItem(STORAGE_KEY);
    console.log('Loading saved skills - Step 2: Raw data from storage:', savedData);
    
    if (!savedData) {
      console.log('No saved skills data found in storage');
      return new Set();
    }

    const parsed = JSON.parse(savedData);
    console.log('Loading saved skills - Step 3: Parsed data:', parsed);
    
    if (!validateSkillsData(parsed)) {
      console.warn('Invalid data structure in storage');
      return new Set();
    }

    const roleSkills = parsed[roleId];
    console.log('Loading saved skills - Step 4: Role specific skills:', roleSkills);
    
    if (!Array.isArray(roleSkills)) {
      console.log('No valid skills array found for role:', roleId);
      return new Set();
    }

    console.log('Successfully loaded skills for role:', roleId, roleSkills);
    return new Set(roleSkills);
  } catch (error) {
    console.error('Error in loadSavedSkills:', error);
    return new Set();
  }
};

const saveSkills = (roleId: string, skills: Set<string>): boolean => {
  try {
    console.log('Saving skills - Step 1: Starting save for role:', roleId);
    
    if (!roleId) {
      console.error('Cannot save skills: Invalid roleId');
      return false;
    }

    // Get existing data first
    const existingData = localStorage.getItem(STORAGE_KEY);
    const currentData = existingData ? JSON.parse(existingData) : {};
    
    console.log('Saving skills - Step 2: Current storage data:', currentData);

    // Prepare new data
    const skillsArray = Array.from(skills);
    const updatedData = {
      ...currentData,
      [roleId]: skillsArray
    };

    console.log('Saving skills - Step 3: Preparing to save:', {
      roleId,
      skillsCount: skillsArray.length,
      updatedData
    });

    // Validate before saving
    if (!validateSkillsData(updatedData)) {
      console.error('Invalid data structure detected before save');
      return false;
    }

    // Save to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    console.log('Saving skills - Step 4: Successfully saved skills for role:', roleId);
    return true;
  } catch (error) {
    console.error('Error in saveSkills:', error);
    return false;
  }
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    return matches?.[1] || "123";
  });

  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    return loadSavedSkills(currentRoleId);
  });

  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    const newRoleId = matches?.[1] || "123";
    
    if (newRoleId !== currentRoleId) {
      console.log('Role change detected:', { from: currentRoleId, to: newRoleId });
      setCurrentRoleId(newRoleId);
      const savedSkills = loadSavedSkills(newRoleId);
      setToggledSkillsState(savedSkills);
    }
  }, [window.location.pathname]);

  const setToggledSkills = (newSkills: Set<string>) => {
    try {
      console.log('Setting toggled skills:', {
        roleId: currentRoleId,
        previousCount: toggledSkills.size,
        newCount: newSkills.size,
        newSkills: Array.from(newSkills)
      });

      // Attempt to save first
      const saveSuccessful = saveSkills(currentRoleId, newSkills);
      
      if (!saveSuccessful) {
        console.error('Failed to save skills to storage');
        toast({
          title: "Save Error",
          description: "Failed to save skill changes. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Only update state if save was successful
      setToggledSkillsState(newSkills);

      // Determine what changed for notification
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
        description: "An error occurred while updating skills. Please try again.",
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