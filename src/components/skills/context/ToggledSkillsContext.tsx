import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
      if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills);
        // Ensure we're creating a Set from the parsed array
        return new Set(Array.isArray(parsedSkills) ? parsedSkills : []);
      }
      return new Set();
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return new Set();
    }
  });

  // Save to localStorage whenever toggledSkills changes
  useEffect(() => {
    if (id) {
      try {
        const skillsArray = Array.from(toggledSkills);
        localStorage.setItem(`toggledSkills_${id}`, JSON.stringify(skillsArray));
      } catch (error) {
        console.error('Error saving skills:', error);
      }
    }
  }, [toggledSkills, id]);

  // Update toggledSkills when id changes
  useEffect(() => {
    if (id) {
      try {
        const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
        if (savedSkills) {
          const parsedSkills = JSON.parse(savedSkills);
          setToggledSkills(new Set(Array.isArray(parsedSkills) ? parsedSkills : []));
        }
      } catch (error) {
        console.error('Error loading saved skills for new id:', error);
      }
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