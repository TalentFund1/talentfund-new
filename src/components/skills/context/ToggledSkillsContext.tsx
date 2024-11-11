import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  
  // Initialize with both localStorage and roleSkills data
  const [toggledSkills, setToggledSkillsState] = useState<Set<string>>(() => {
    try {
      // Get skills from localStorage if they exist
      const savedSkills = localStorage.getItem(`toggledSkills_${id}`);
      if (savedSkills) {
        return new Set(JSON.parse(savedSkills));
      }
      
      // If no saved skills, initialize with roleSkills data
      if (id && roleSkills[id as keyof typeof roleSkills]) {
        const initialSkills = roleSkills[id as keyof typeof roleSkills];
        const allSkills = [
          ...initialSkills.specialized.map(skill => skill.title),
          ...initialSkills.common.map(skill => skill.title),
          ...initialSkills.certifications.map(skill => skill.title)
        ];
        return new Set(allSkills);
      }
      
      return new Set();
    } catch (error) {
      console.error('Error loading saved skills:', error);
      return new Set();
    }
  });

  // Update localStorage whenever toggledSkills changes
  useEffect(() => {
    if (id) {
      try {
        localStorage.setItem(`toggledSkills_${id}`, JSON.stringify(Array.from(toggledSkills)));
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
          setToggledSkillsState(new Set(JSON.parse(savedSkills)));
        } else if (roleSkills[id as keyof typeof roleSkills]) {
          const initialSkills = roleSkills[id as keyof typeof roleSkills];
          const allSkills = [
            ...initialSkills.specialized.map(skill => skill.title),
            ...initialSkills.common.map(skill => skill.title),
            ...initialSkills.certifications.map(skill => skill.title)
          ];
          setToggledSkillsState(new Set(allSkills));
        }
      } catch (error) {
        console.error('Error loading saved skills:', error);
      }
    }
  }, [id]);

  const setToggledSkills = (newSkills: Set<string>) => {
    setToggledSkillsState(newSkills);
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