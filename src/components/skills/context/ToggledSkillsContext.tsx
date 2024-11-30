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
  
  const validateRoleId = (roleId: string | undefined): string => {
    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.error('Invalid or missing role ID:', roleId);
      toast({
        title: "Error",
        description: "Invalid role selected. Please select a valid role.",
        variant: "destructive",
      });
      throw new Error('Invalid role ID');
    }
    return roleId;
  };

  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const currentRoleId = validateRoleId(selectedRole || id);
      const savedSkills = loadToggledSkills(currentRoleId);
      console.log('Initial load of toggled skills:', {
        roleId: currentRoleId,
        savedSkills
      });
      return new Set(savedSkills);
    } catch (error) {
      console.error('Error loading initial toggled skills:', error);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      const currentRoleId = validateRoleId(selectedRole || id);
      const savedSkills = loadToggledSkills(currentRoleId);
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
    try {
      const currentRoleId = validateRoleId(selectedRole || id);
      console.log('Setting toggled skills:', {
        roleId: currentRoleId,
        skillCount: newSkills.size,
        skills: Array.from(newSkills)
      });
      
      setToggledSkills(newSkills);
      
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

  useEffect(() => {
    try {
      const currentRoleId = validateRoleId(selectedRole || id);
      const handleSkillsChanged = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail.role === currentRoleId) {
          console.log('Received toggled skills update:', customEvent.detail);
          setToggledSkills(new Set(customEvent.detail.skills));
        }
      };

      window.addEventListener('toggledSkillsChanged', handleSkillsChanged);
      return () => window.removeEventListener('toggledSkillsChanged', handleSkillsChanged);
    } catch (error) {
      console.error('Error in skills changed listener:', error);
    }
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