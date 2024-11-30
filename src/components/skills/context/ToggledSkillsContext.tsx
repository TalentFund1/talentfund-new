import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getStorageKey = (roleId: string) => `toggled-skills-${roleId}`;

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const storageKey = getStorageKey(selectedRole);
      const savedSkills = localStorage.getItem(storageKey);
      console.log('Initial load of toggled skills for role:', selectedRole, savedSkills);
      return savedSkills ? new Set(JSON.parse(savedSkills)) : new Set();
    } catch (error) {
      console.error('Error loading toggled skills:', error);
      return new Set();
    }
  });

  // Effect to persist toggled skills whenever they change
  useEffect(() => {
    try {
      const storageKey = getStorageKey(selectedRole);
      const skillsArray = Array.from(toggledSkills);
      localStorage.setItem(storageKey, JSON.stringify(skillsArray));
      console.log('Persisted toggled skills for role:', selectedRole, skillsArray);
    } catch (error) {
      console.error('Error saving toggled skills:', error);
    }
  }, [toggledSkills, selectedRole]);

  // Effect to reload toggled skills when role changes
  useEffect(() => {
    try {
      const storageKey = getStorageKey(selectedRole);
      const savedSkills = localStorage.getItem(storageKey);
      if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills);
        console.log('Reloading toggled skills for role change:', selectedRole, parsedSkills);
        setToggledSkills(new Set(parsedSkills));
      } else {
        // If no skills found for new role, start with empty set
        setToggledSkills(new Set());
      }
    } catch (error) {
      console.error('Error reloading toggled skills:', error);
      setToggledSkills(new Set());
    }
  }, [selectedRole]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: selectedRole,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    toast({
      title: "Skills Updated",
      description: `${newSkills.size} skills are now active for ${selectedRole}.`,
    });
  };

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