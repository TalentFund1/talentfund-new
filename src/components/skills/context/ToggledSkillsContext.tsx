import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'toggled-skills';

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const savedSkills = localStorage.getItem(STORAGE_KEY);
      console.log('Initial load of toggled skills:', savedSkills);
      return savedSkills ? new Set(JSON.parse(savedSkills)) : new Set();
    } catch (error) {
      console.error('Error loading toggled skills:', error);
      return new Set();
    }
  });

  // Effect to persist toggled skills whenever they change
  useEffect(() => {
    try {
      const skillsArray = Array.from(toggledSkills);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skillsArray));
      console.log('Persisted toggled skills:', skillsArray);
    } catch (error) {
      console.error('Error saving toggled skills:', error);
    }
  }, [toggledSkills]);

  // Effect to reload toggled skills when role ID changes
  useEffect(() => {
    try {
      const savedSkills = localStorage.getItem(STORAGE_KEY);
      if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills);
        console.log('Reloading toggled skills for role change:', parsedSkills);
        setToggledSkills(new Set(parsedSkills));
      }
    } catch (error) {
      console.error('Error reloading toggled skills:', error);
    }
  }, [id]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills:', {
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    toast({
      title: "Skills Updated",
      description: `${newSkills.size} skills are now active.`,
    });
  };

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills: handleSetToggledSkills 
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