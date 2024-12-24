import { EmployeeSkillState, EmployeeSkillData, SkillLevel, SkillGoalStatus, SkillWeight } from '../../../components/employee/types/employeeSkillTypes';

class SkillStateService {
  public createSkillState(level: SkillLevel = 'unspecified', goalStatus: SkillGoalStatus = 'unknown'): EmployeeSkillState {
    console.log('Creating skill state:', { level, goalStatus });
    return {
      level,
      goalStatus,
      lastUpdated: new Date().toISOString(),
      confidence: 'medium'
    };
  }

  public getDefaultSkillState(): EmployeeSkillState {
    return this.createSkillState();
  }

  public updateCompetencyState(
    currentStates: Record<string, Record<string, EmployeeSkillState>>,
    skillName: string,
    level: string,
    levelKey: string,
    required: string,
    defaultState: EmployeeSkillState
  ): Record<string, Record<string, EmployeeSkillState>> {
    console.log('Updating competency state:', {
      skillName,
      level,
      levelKey,
      required
    });

    return {
      ...currentStates,
      [skillName]: {
        ...currentStates[skillName],
        [levelKey]: {
          level: level as SkillLevel,
          goalStatus: required as SkillGoalStatus,
          lastUpdated: new Date().toISOString(),
          confidence: defaultState.confidence
        }
      }
    };
  }

  public matchesInterestFilter(goalStatus: SkillGoalStatus, selectedInterest: string): boolean {
    if (selectedInterest === 'all') return true;

    switch (selectedInterest.toLowerCase()) {
      case 'skill_goal':
        return goalStatus === 'required' || goalStatus === 'skill_goal';
      case 'not_interested':
        return goalStatus === 'not_interested';
      case 'unknown':
        return !goalStatus || goalStatus === 'unknown';
      default:
        return goalStatus === selectedInterest.toLowerCase();
    }
  }

  public normalizeWeight(weight: string): SkillWeight {
    const normalized = weight.toLowerCase();
    if (normalized === 'critical' || normalized === 'technical' || normalized === 'necessary') {
      return normalized;
    }
    return 'necessary';
  }
}

export const skillStateService = new SkillStateService();