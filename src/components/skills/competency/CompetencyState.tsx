import { createContext, useContext, useState } from 'react';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyContextType {
  originalStates: Record<string, Record<string, SkillState>>;
  currentStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (states: Record<string, Record<string, SkillState>>) => void;
}

const CompetencyContext = createContext<CompetencyContextType | undefined>(undefined);

export const CompetencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalStates, setOriginalStates] = useState<Record<string, Record<string, SkillState>>>({});
  const [currentStates, setCurrentStates] = useState<Record<string, Record<string, SkillState>>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const setSkillState = (skillName: string, level: string, levelKey: string, required: string) => {
    const newStates = {
      ...currentStates,
      [skillName]: {
        ...(currentStates[skillName] || {}),
        [levelKey]: { level, required },
      },
    };
    setCurrentStates(newStates);
    setHasChanges(JSON.stringify(newStates) !== JSON.stringify(originalStates));
  };

  const saveChanges = () => {
    setOriginalStates(currentStates);
    setHasChanges(false);
  };

  const cancelChanges = () => {
    setCurrentStates(originalStates);
    setHasChanges(false);
  };

  const initializeStates = (states: Record<string, Record<string, SkillState>>) => {
    setOriginalStates(states);
    setCurrentStates(states);
    setHasChanges(false);
  };

  return (
    <CompetencyContext.Provider
      value={{
        originalStates,
        currentStates,
        hasChanges,
        setSkillState,
        saveChanges,
        cancelChanges,
        initializeStates,
      }}
    >
      {children}
    </CompetencyContext.Provider>
  );
};

export const useCompetencyStore = () => {
  const context = useContext(CompetencyContext);
  if (context === undefined) {
    throw new Error('useCompetencyStore must be used within a CompetencyProvider');
  }
  return context;
};