import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    try {
      const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
      return savedSkills ? new Set(JSON.parse(savedSkills)) : new Set();
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return new Set();
    }
  });

  const setToggledSkills = (newSkills: Set<string>) => {
    setToggledSkillsState(newSkills);
    if (id) {
      try {
        localStorage.setItem(`toggledSkills_${id}`, JSON.stringify(Array.from(newSkills)));
      } catch (error) {
        console.error('Error saving skills:', error);
      }
    }
  };

  // Effect to handle profile ID changes
  useEffect(() => {
    if (id) {
      try {
        const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
        if (savedSkills) {
          setToggledSkillsState(new Set(JSON.parse(savedSkills)));
        } else {
          setToggledSkillsState(new Set());
        }
      } catch (error) {
        console.error('Error loading saved skills:', error);
        setToggledSkillsState(new Set());
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