import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';
import { loadToggledSkills, saveToggledSkills } from './utils/storageUtils';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { selectedRole } = useRoleStore();
  const { id } = useParams();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const roleId = selectedRole || "";
    const savedSkills = loadToggledSkills(roleId);
    console.log('Initial load of toggled skills:', {
      roleId,
      savedSkills,
      source: 'useState initializer'
    });

    // If no saved skills exist, initialize with all skills toggled
    if (!savedSkills || savedSkills.length === 0) {
      const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const allSkills = [
          ...currentRoleSkills.specialized.map(s => s.title),
          ...currentRoleSkills.common.map(s => s.title),
          ...currentRoleSkills.certifications.map(s => s.title)
        ];
        console.log('Initializing with all skills toggled:', allSkills);
        return new Set(allSkills);
      }
    }
    
    return new Set(savedSkills);
  });

  // Effect to reload toggled skills when role changes
  useEffect(() => {
    const roleId = selectedRole || "";
    if (!roleId) {
      console.warn('No role ID available for loading toggled skills');
      return;
    }

    console.log('Role changed, reloading toggled skills for:', {
      roleId,
      selectedRole
    });
    
    const savedSkills = loadToggledSkills(roleId);
    
    // Only load saved skills if they exist
    if (savedSkills && savedSkills.length > 0) {
      console.log('Reloaded toggled skills:', {
        roleId,
        skillCount: savedSkills.length,
        skills: savedSkills
      });
      setToggledSkills(new Set(savedSkills));
    } else {
      // If no saved skills, keep current selection
      console.log('No saved skills found, keeping current selection');
    }
  }, [selectedRole]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const roleId = selectedRole || "";
    if (!roleId) {
      console.error('No role ID available for saving toggled skills');
      return;
    }

    console.log('Setting toggled skills:', {
      roleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    // Save to localStorage immediately
    try {
      const skillsArray = Array.from(newSkills);
      saveToggledSkills(roleId, skillsArray);
      
      // Broadcast the change
      window.dispatchEvent(new CustomEvent('toggledSkillsChanged', {
        detail: { role: roleId, skills: skillsArray }
      }));

      console.log('Successfully saved toggled skills:', {
        roleId,
        skillCount: skillsArray.length,
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
    const roleId = selectedRole || "";
    
    const handleSkillsChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.role === roleId) {
        console.log('Received toggled skills update:', customEvent.detail);
        setToggledSkills(new Set(customEvent.detail.skills));
      }
    };

    window.addEventListener('toggledSkillsChanged', handleSkillsChanged);
    return () => window.removeEventListener('toggledSkillsChanged', handleSkillsChanged);
  }, [selectedRole]);

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
