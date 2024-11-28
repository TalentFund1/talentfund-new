export interface SkillState {
  level: string;
  required: string;
}

export interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  originalStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>) => void;
  resetLevels: () => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}