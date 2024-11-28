import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'roleToggledSkills';

// Separate validation function for better error handling
const validateSkillsData = (data: any): boolean => {
  if (!data || typeof data !== 'object') {
    console.log('Invalid data structure:', data);
    return false;
  }
  return true;
};

// Separate loading function
const loadSavedSkills = (roleId: string): Set<string> => {
  console.log('Loading saved skills for role:', roleId);
  
  if (!roleId) {
    console.warn('No roleId provided for loading skills');
    return new Set();
  }

  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    console.log('Raw saved data:', savedData);
    
    if (!savedData) {
      console.log('No saved skills found');
      return new Set();
    }

    const parsed = JSON.parse(savedData);
    console.log('Parsed saved data:', parsed);
    
    if (!validateSkillsData(parsed)) {
      console.warn('Invalid saved data structure');
      return new Set();
    }

    const roleSkills = parsed[roleId];
    if (!Array.isArray(roleSkills)) {
      console.log('No valid skills array for role:', roleId);
      return new Set();
    }

    console.log('Loaded skills:', roleSkills);
    return new Set(roleSkills);
  } catch (error) {
    console.error('Error loading saved skills:', error);
    return new Set();
  }
};

// Separate save function
const saveSkills = (roleId: string, skills: Set<string>): boolean => {
  console.log('Saving skills for role:', roleId);
  
  if (!roleId) {
    console.error('Cannot save: No roleId provided');
    return false;
  }

  try {
    // Get existing data
    const existingData = localStorage.getItem(STORAGE_KEY);
    const currentData = existingData ? JSON.parse(existingData) : {};
    
    // Prepare new data
    const skillsArray = Array.from(skills);
    const updatedData = {
      ...currentData,
      [roleId]: skillsArray
    };

    console.log('Saving data:', {
      roleId,
      skillsCount: skillsArray.length,
      updatedData
    });

    // Validate before saving
    if (!validateSkillsData(updatedData)) {
      console.error('Invalid data structure detected');
      return false;
    }

    // Save to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    console.log('Successfully saved skills');
    return true;
  } catch (error) {
    console.error('Error saving skills:', error);
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

  // Handle role changes
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
    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      previousCount: toggledSkills.size,
      newCount: newSkills.size
    });

    // Save first
    const saveSuccessful = saveSkills(currentRoleId, newSkills);
    
    if (!saveSuccessful) {
      console.error('Failed to save skills');
      toast({
        title: "Save Error",
        description: "Failed to save skill changes. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Only update state if save was successful
    setToggledSkillsState(newSkills);

    // Show success notification
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