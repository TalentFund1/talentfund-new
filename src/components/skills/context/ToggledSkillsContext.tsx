import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
  hasUnsavedChanges: boolean;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
      if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills) as string[];
        return new Set<string>(parsedSkills);
      }
      return new Set<string>();
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return new Set<string>();
    }
  });

  const [originalSkills, setOriginalSkills] = useState<Set<string>>(new Set(toggledSkills));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (id) {
      try {
        const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
        if (savedSkills) {
          const parsedSkills = JSON.parse(savedSkills) as string[];
          const skillsSet = new Set<string>(parsedSkills);
          setToggledSkills(skillsSet);
          setOriginalSkills(skillsSet);
        }
      } catch (error) {
        console.error('Error loading saved skills for new id:', error);
      }
    }
  }, [id]);

  const updateToggledSkills = (skills: Set<string>) => {
    setToggledSkills(skills);
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    try {
      const skillsArray = Array.from(toggledSkills);
      localStorage.setItem(`toggledSkills_${id}`, JSON.stringify(skillsArray));
      setOriginalSkills(new Set(toggledSkills));
      setHasUnsavedChanges(false);
      toast({
        title: "Changes Saved",
        description: "Your skill selections have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving skills:', error);
      toast({
        title: "Error",
        description: "Failed to save your skill selections.",
        variant: "destructive",
      });
    }
  };

  const cancelChanges = () => {
    setToggledSkills(new Set(originalSkills));
    setHasUnsavedChanges(false);
    toast({
      title: "Changes Cancelled",
      description: "Your skill selections have been reset.",
    });
  };

  return (
    <ToggledSkillsContext.Provider 
      value={{ 
        toggledSkills, 
        setToggledSkills: updateToggledSkills,
        hasUnsavedChanges,
        saveChanges,
        cancelChanges
      }}
    >
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