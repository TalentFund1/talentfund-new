import { RoleState, RoleSkillState, RoleSkillRequirement } from '../../types/SkillTypes';

export interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (
    skillName: string, 
    level: string, 
    levelKey: string, 
    requirement: RoleSkillRequirement, 
    roleId: string
  ) => void;
  setSkillProgression: (
    skillName: string, 
    progression: Record<string, RoleSkillState>, 
    roleId: string, 
    track: string
  ) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string, track: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}

export type { RoleState, RoleSkillState, RoleSkillRequirement };