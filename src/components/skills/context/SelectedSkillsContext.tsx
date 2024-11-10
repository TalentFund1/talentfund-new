import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SelectedSkillsContextType {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}

const SelectedSkillsContext = createContext<SelectedSkillsContextType | undefined>(undefined);

export const SelectedSkillsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    // Load initial state from localStorage
    const saved = localStorage.getItem('selectedSkills');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever selectedSkills changes
  useEffect(() => {
    localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
  }, [selectedSkills]);

  return (
    <SelectedSkillsContext.Provider value={{ selectedSkills, setSelectedSkills }}>
      {children}
    </SelectedSkillsContext.Provider>
  );
};

export const useSelectedSkills = () => {
  const context = useContext(SelectedSkillsContext);
  if (context === undefined) {
    throw new Error('useSelectedSkills must be used within a SelectedSkillsProvider');
  }
  return context;
};