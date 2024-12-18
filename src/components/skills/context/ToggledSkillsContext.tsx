import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';
import { loadToggledSkills, saveToggledSkills } from './utils/storageUtils';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
  toggleSkill: (skillTitle: string) => void;  // Added this line
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const currentRoleId = selectedRole || id || "";
    const savedSkills = loadToggledSkills(currentRoleId);
    console.log('Initial load of toggled skills:', {
      roleId: currentRoleId,
      savedSkills,
      source: 'useState initializer'
    });

    if (!savedSkills || savedSkills.length === 0) {
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
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

  const toggleSkill = (skillTitle: string) => {
    const newSkills = new Set(toggledSkills);
    if (newSkills.has(skillTitle)) {
      newSkills.delete(skillTitle);
    } else {
      newSkills.add(skillTitle);
    }
    handleSetToggledSkills(newSkills);
  };

  useEffect(() => {
    const currentRoleId = selectedRole || id || "";
    if (!currentRoleId) {
      console.warn('No role ID available for loading toggled skills');
      return;
    }

    console.log('Role/ID changed, reloading toggled skills for:', {
      roleId: currentRoleId,
      employeeId: id,
      selectedRole
    });
    
    const savedSkills = loadToggledSkills(currentRoleId);
    
    // Only load saved skills if they exist
    if (savedSkills && savedSkills.length > 0) {
      console.log('Reloaded toggled skills:', {
        roleId: currentRoleId,
        skillCount: savedSkills.length,
        skills: savedSkills
      });
      setToggledSkills(new Set(savedSkills));
    } else {
      // If no saved skills, keep current selection
      console.log('No saved skills found, keeping current selection');
    }
  }, [selectedRole, id]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const currentRoleId = selectedRole || id || "";
    if (!currentRoleId) {
      console.error('No role ID available for saving toggled skills');
      return;
    }

    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills),
      employeeId: id
    });
    
    setToggledSkills(newSkills);
    
    // Save to localStorage immediately
    try {
      const skillsArray = Array.from(newSkills);
      saveToggledSkills(currentRoleId, skillsArray);
      
      // Broadcast the change
      window.dispatchEvent(new CustomEvent('toggledSkillsChanged', {
        detail: { role: currentRoleId, skills: skillsArray }
      }));

      console.log('Successfully saved toggled skills:', {
        roleId: currentRoleId,
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
    const currentRoleId = selectedRole || id || "";
    
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
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills: handleSetToggledSkills,
      toggleSkill 
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
