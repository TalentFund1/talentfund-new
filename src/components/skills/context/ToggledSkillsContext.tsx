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
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const getDefaultSkillsForRole = (roleId: string) => {
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    if (!roleData) return [];

    const defaultSkills = [
      ...(roleData.specialized || []).map(s => s.title),
      ...(roleData.common || []).slice(0, 5).map(s => s.title)
    ];

    console.log('Generated default skills for role:', {
      roleId,
      defaultSkills
    });

    return defaultSkills;
  };

  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const currentRoleId = selectedRole || id || "123";
      const savedSkills = loadToggledSkills(currentRoleId);
      
      // If no saved skills exist for any role, initialize with default skills
      if (!savedSkills || savedSkills.length === 0) {
        const defaultSkills = getDefaultSkillsForRole(currentRoleId);
        console.log('Initializing default skills for role:', {
          roleId: currentRoleId,
          defaultSkills
        });
        
        saveToggledSkills(currentRoleId, defaultSkills);
        return new Set(defaultSkills);
      }

      console.log('Loaded saved skills for role:', {
        roleId: currentRoleId,
        skills: savedSkills
      });
      
      return new Set(savedSkills);
    } catch (error) {
      console.error('Error loading initial toggled skills:', error);
      return new Set();
    }
  });

  // Effect to reload toggled skills when role changes
  useEffect(() => {
    const currentRoleId = selectedRole || id || "123";
    try {
      const savedSkills = loadToggledSkills(currentRoleId);
      
      // If switching to any role and no skills are saved, set defaults
      if (!savedSkills || savedSkills.length === 0) {
        const defaultSkills = getDefaultSkillsForRole(currentRoleId);
        console.log('Setting default skills on role change:', {
          roleId: currentRoleId,
          defaultSkills
        });
        
        setToggledSkills(new Set(defaultSkills));
        saveToggledSkills(currentRoleId, defaultSkills);
        return;
      }

      console.log('Reloading toggled skills for role change:', {
        roleId: currentRoleId,
        savedSkills
      });
      setToggledSkills(new Set(savedSkills));
    } catch (error) {
      console.error('Error reloading toggled skills:', error);
      setToggledSkills(new Set());
    }
  }, [selectedRole, id]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const currentRoleId = selectedRole || id || "123";
    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    // Save to localStorage immediately after state update
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