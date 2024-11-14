import { createContext, useContext, useState } from 'react';

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
  const [originalStates, setOriginalStates] = useState<Record<string, SkillState>>(() => {
    const saved = localStorage.getItem('skills-matrix-storage');
    return saved ? JSON.parse(saved).state.originalStates : {};
  });
  
  const [currentStates, setCurrentStates] = useState<Record<string, SkillState>>(() => {
    const saved = localStorage.getItem('skills-matrix-storage');
    return saved ? JSON.parse(saved).state.currentStates : {};
  });

  const [hasChanges, setHasChanges] = useState(false);

  const setSkillState = (skillTitle: string, level: string, requirement: string) => {
    const newStates = {
      ...currentStates,
      [skillTitle]: { level, requirement },
    };
    setCurrentStates(newStates);
    setHasChanges(JSON.stringify(newStates) !== JSON.stringify(originalStates));
    
    // Save to localStorage
    localStorage.setItem('skills-matrix-storage', JSON.stringify({
      state: {
        originalStates,
        currentStates: newStates
      }
    }));
  };

  const saveChanges = () => {
    setOriginalStates(currentStates);
    setHasChanges(false);
    
    // Save to localStorage
    localStorage.setItem('skills-matrix-storage', JSON.stringify({
      state: {
        originalStates: currentStates,
        currentStates
      }
    }));
  };

  const cancelChanges = () => {
    setCurrentStates(originalStates);
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
        cancelChanges 
      }}
    >
      {children}
    </SkillsMatrixContext.Provider>
  );
};

export const useSkillsMatrixStore = () => {
  const context = useContext(SkillsMatrixContext);
  if (context === undefined) {
    throw new Error('useSkillsMatrixStore must be used within a SkillsMatrixProvider');
  }
  return context;
};