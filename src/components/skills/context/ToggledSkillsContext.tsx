import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getStorageKey = (roleId: string) => `toggled-skills-${roleId}-v2`;

const loadToggledSkills = (roleId: string): string[] => {
  try {
    if (!roleId) {
      console.error('Cannot load toggled skills: No role ID provided');
      return [];
    }

    const savedState = localStorage.getItem(getStorageKey(roleId));
    if (savedState) {
      const parsedSkills = JSON.parse(savedState);
      if (Array.isArray(parsedSkills)) {
        console.log('Loaded saved toggle state:', {
          roleId,
          skillCount: parsedSkills.length,
          skills: parsedSkills
        });
        return parsedSkills;
      }
    }

    // If no saved state, initialize with all skills for the role
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    if (roleData) {
      const allSkills = [
        ...roleData.specialized,
        ...roleData.common,
        ...roleData.certifications
      ].map(skill => skill.title);
      
      console.log('Initializing with all role skills:', {
        roleId,
        skillCount: allSkills.length,
        skills: allSkills
      });
      
      return allSkills;
    }
  } catch (error) {
    console.error('Error loading toggled skills:', error);
  }
  return [];
};

const saveToggledSkills = (roleId: string, skills: string[]) => {
  try {
    if (!roleId) {
      console.error('Cannot save toggled skills: No role ID provided');
      return;
    }
    
    const storageKey = getStorageKey(roleId);
    localStorage.setItem(storageKey, JSON.stringify(skills));
    
    console.log('Saved toggled skills:', {
      roleId,
      skillCount: skills.length,
      skills,
      storageKey
    });
  } catch (error) {
    console.error('Error saving toggled skills:', error);
    throw error;
  }
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const currentRoleId = selectedRole || id || "123";
    const savedSkills = loadToggledSkills(currentRoleId);
    console.log('Initial load of toggled skills:', {
      roleId: currentRoleId,
      savedSkills
    });
    return new Set(savedSkills);
  });

  // Effect to handle role changes
  useEffect(() => {
    const currentRoleId = selectedRole || id || "123";
    console.log('Role changed, loading skills for:', currentRoleId);
    
    const savedSkills = loadToggledSkills(currentRoleId);
    setToggledSkills(new Set(savedSkills));
  }, [selectedRole, id]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const currentRoleId = selectedRole || id || "123";
    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    try {
      const skillsArray = Array.from(newSkills);
      saveToggledSkills(currentRoleId, skillsArray);
      
      window.dispatchEvent(new CustomEvent('toggledSkillsChanged', {
        detail: { role: currentRoleId, skills: skillsArray }
      }));

      console.log('Successfully saved toggled skills:', {
        roleId: currentRoleId,
        skills: skillsArray
      });
    } catch (error) {
      console.error('Error saving toggled skills:', error);
      toast({
        title: "Error Saving Skills",
        description: "There was an error saving your skill selection.",
        variant: "destructive",
      });
    }
  };

  // Listen for changes from other components
  useEffect(() => {
    const currentRoleId = selectedRole || id || "123";
    const handleSkillsChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.role === currentRoleId) {
        console.log('Received toggled skills update:', customEvent.detail);
        setToggledSkills(new Set(customEvent.detail.skills));
      }
    };

    window.addEventListener('toggledSkillsChanged', handleSkillsChanged);
    return () => window.removeEventListener('toggledSkillsChanged', handleSkillsChanged);
  }, [selectedRole, id]);

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills, setToggledSkills: handleSetToggledSkills }}>
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