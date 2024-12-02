import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'toggled-skills';

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const savedSkills = localStorage.getItem(STORAGE_KEY);
      console.log('Initial load of toggled skills:', {
        savedSkills: savedSkills ? JSON.parse(savedSkills) : []
      });
      return new Set(savedSkills ? JSON.parse(savedSkills) : []);
    } catch (error) {
      console.error('Error loading initial toggled skills:', error);
      return new Set();
    }
  });

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills:', {
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    try {
      const skillsArray = Array.from(newSkills);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skillsArray));
      
      // Broadcast the change to other components
      window.dispatchEvent(new CustomEvent('toggledSkillsChanged', {
        detail: { skills: skillsArray }
      }));

      console.log('Successfully saved toggled skills:', {
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
    const handleSkillsChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Received toggled skills update:', customEvent.detail);
      setToggledSkills(new Set(customEvent.detail.skills));
    };

    window.addEventListener('toggledSkillsChanged', handleSkillsChanged);
    return () => window.removeEventListener('toggledSkillsChanged', handleSkillsChanged);
  }, []);

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