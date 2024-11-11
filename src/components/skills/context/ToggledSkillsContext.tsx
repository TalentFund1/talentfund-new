import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  
  // Initialize with a function to ensure we only run this once
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    if (!id) return new Set<string>();
    
    const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
    if (!savedSkills) return new Set<string>();
    
    try {
      const parsedSkills = JSON.parse(savedSkills);
      if (!Array.isArray(parsedSkills)) {
        console.warn('Saved skills were not in the expected format');
        return new Set<string>();
      }
      
      // Filter out any non-string values just to be safe
      const validSkills = parsedSkills.filter((skill): skill is string => 
        typeof skill === 'string' && skill.length > 0
      );
      
      return new Set<string>(validSkills);
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return new Set<string>();
    }
  });

  // Save to localStorage whenever toggledSkills changes
  useEffect(() => {
    if (!id) return;
    
    const skillsArray = Array.from(toggledSkills);
    if (skillsArray.length === 0) {
      localStorage.removeItem(`toggledSkills_${id}`);
      return;
    }

    try {
      localStorage.setItem(`toggledSkills_${id}`, JSON.stringify(skillsArray));
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  }, [toggledSkills, id]);

  // Load skills when id changes
  useEffect(() => {
    if (!id) {
      setToggledSkills(new Set<string>());
      return;
    }

    const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
    if (!savedSkills) {
      setToggledSkills(new Set<string>());
      return;
    }

    try {
      const parsedSkills = JSON.parse(savedSkills);
      if (!Array.isArray(parsedSkills)) {
        console.warn('Saved skills were not in the expected format');
        setToggledSkills(new Set<string>());
        return;
      }

      const validSkills = parsedSkills.filter((skill): skill is string => 
        typeof skill === 'string' && skill.length > 0
      );
      
      setToggledSkills(new Set<string>(validSkills));
    } catch (error) {
      console.error('Error loading saved skills for new id:', error);
      setToggledSkills(new Set<string>());
    }
  }, [id]);

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