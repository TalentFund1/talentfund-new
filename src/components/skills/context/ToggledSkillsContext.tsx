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

const STORAGE_KEY = 'toggled-skills';

const getDefaultSkills = (roleId: string): string[] => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) return [];

  return [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].map(skill => skill.title);
};

const loadToggledSkills = (roleId: string): string[] => {
  try {
    const savedSkills = localStorage.getItem(`${STORAGE_KEY}-${roleId}`);
    if (savedSkills) {
      console.log('Loading saved toggled skills for role:', roleId, JSON.parse(savedSkills));
      return JSON.parse(savedSkills);
    }
    // If no saved skills, return all skills for the role as default
    const defaultSkills = getDefaultSkills(roleId);
    console.log('No saved skills found, using default skills for role:', roleId, defaultSkills);
    return defaultSkills;
  } catch (error) {
    console.error('Error loading toggled skills:', error);
    return getDefaultSkills(roleId);
  }
};

const saveToggledSkills = (roleId: string, skills: string[]) => {
  try {
    localStorage.setItem(`${STORAGE_KEY}-${roleId}`, JSON.stringify(skills));
    console.log('Saved toggled skills for role:', roleId, skills);
  } catch (error) {
    console.error('Error saving toggled skills:', error);
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

  // Effect to reload toggled skills when role changes
  useEffect(() => {
    const currentRoleId = selectedRole || id || "123";
    const savedSkills = loadToggledSkills(currentRoleId);
    console.log('Reloading toggled skills for role change:', {
      roleId: currentRoleId,
      savedSkills
    });
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
      
      // Broadcast the change to other components
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