import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { SkillLevel, SkillGoalStatus } from './employeeSkillTypes';

export interface EmployeeSkillCardProps {
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly skills: ReadonlyArray<{
    readonly name: string;
    readonly level: SkillLevel;
  }>;
  readonly employeeId: string;
}

export interface SkillDisplayProps {
  readonly skillTitle: string;
  readonly level: SkillLevel;
  readonly goalStatus: SkillGoalStatus;
  readonly lastUpdated: string;
}