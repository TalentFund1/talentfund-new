import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'roleToggledSkills';

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    try {
      const path = window.location.pathname;
      const matches = path.match(/\/skills\/(\d+)/);
      const roleId = matches?.[1] || "123";
      
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return new Set();
      
      const parsed = JSON.parse(savedData);
      if (!parsed || typeof parsed !== 'object') return new Set();
      
      const roleSkills = parsed[roleId];
      if (!Array.isArray(roleSkills)) return new Set();
      
      return new Set(roleSkills);
    } catch (error) {
      console.log('Error loading initial skills:', error);
      return new Set();
    }
  });

  const setToggledSkills = (newSkills: Set<string>) => {
    try {
      const path = window.location.pathname;
      const matches = path.match(/\/skills\/(\d+)/);
      const roleId = matches?.[1] || "123";

      // Get existing data first
      const existingData = localStorage.getItem(STORAGE_KEY);
      const currentData = existingData ? JSON.parse(existingData) : {};
      
      // Update only the specific role's skills
      const skillsArray = Array.from(newSkills);
      const updatedData = {
        ...currentData,
        [roleId]: skillsArray
      };

      // Save to storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      
      // Only update state after successful save
      setToggledSkillsState(newSkills);
      
    } catch (error) {
      console.log('Error saving skills:', error);
      toast({
        title: "Warning",
        description: "Some changes might not have been saved",
        variant: "destructive"
      });
    }
  };

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills, setToggledSkills }}>
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