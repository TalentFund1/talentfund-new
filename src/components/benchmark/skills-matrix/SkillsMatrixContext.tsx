import React, { createContext, useContext, useState, useEffect } from 'react';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixContextType {
  originalStates: Record<string, SkillState>;
  currentStates: Record<string, SkillState>;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const SkillsMatrixContext = createContext<SkillsMatrixContextType | undefined>(undefined);

export const SkillsMatrixProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalStates, setOriginalStates] = useState<Record<string, SkillState>>({});
  const [currentStates, setCurrentStates] = useState<Record<string, SkillState>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved states from localStorage on mount
  useEffect(() => {
    const savedStates = localStorage.getItem('skills-matrix-storage');
    if (savedStates) {
      const { originalStates: saved } = JSON.parse(savedStates);
      setOriginalStates(saved);
      setCurrentStates(saved);
    }
  }, []);

  // Save states to localStorage when they change
  useEffect(() => {
    localStorage.setItem('skills-matrix-storage', JSON.stringify({
      originalStates,
      currentStates
    }));
  }, [originalStates, currentStates]);

  const setSkillState = (skillTitle: string, level: string, requirement: string) => {
    const newStates = {
      ...currentStates,
      [skillTitle]: { level, requirement },
    };
    setCurrentStates(newStates);
    setHasChanges(JSON.stringify(newStates) !== JSON.stringify(originalStates));
  };

  const saveChanges = () => {
    setOriginalStates({ ...currentStates });
    setHasChanges(false);
  };

  const cancelChanges = () => {
    setCurrentStates({ ...originalStates });
    setHasChanges(false);
  };

  return (
    <SkillsMatrixContext.Provider
      value={{
        originalStates,
        currentStates,
        hasChanges,
        setSkillState,
        saveChanges,
        cancelChanges,
      }}
    >
      {children}
    </SkillsMatrixContext.Provider>
  );
};

export const useSkillsMatrix = () => {
  const context = useContext(SkillsMatrixContext);
  if (context === undefined) {
    throw new Error('useSkillsMatrix must be used within a SkillsMatrixProvider');
  }
  return context;
};