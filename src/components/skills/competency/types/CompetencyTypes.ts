export interface SkillState {
  level: string;
  required: string;
}

export interface CompetencyState {
  originalStates: Record<string, Record<string, SkillState>>;
  currentStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, levelKey: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (roleId: string) => void;
}

export interface StorageValue<T> {
  state: T;
  version: number;
}