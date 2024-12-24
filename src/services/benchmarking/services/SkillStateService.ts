export class SkillStateService {
  public createSkillState(level: string, goalStatus: string) {
    console.log('SkillStateService: Creating skill state:', { level, goalStatus });
    return {
      level,
      goalStatus,
      lastUpdated: new Date().toISOString()
    };
  }

  public getDefaultSkillState() {
    return {
      level: 'unspecified',
      goalStatus: 'unknown',
      lastUpdated: new Date().toISOString()
    };
  }

  public updateCompetencyState(
    currentStates: any,
    skillName: string,
    level: string,
    levelKey: string,
    required: string,
    defaultState: any
  ) {
    console.log('SkillStateService: Updating competency state:', {
      skillName,
      level,
      levelKey,
      required
    });

    return {
      ...currentStates,
      [skillName]: {
        ...(currentStates[skillName] || {}),
        [levelKey]: { level, required }
      }
    };
  }

  public matchesInterestFilter(goalStatus: string, selectedInterest: string): boolean {
    console.log('SkillStateService: Checking interest filter match:', {
      goalStatus,
      selectedInterest
    });

    if (selectedInterest === 'interested') {
      return goalStatus === 'required' || goalStatus === 'skill_goal';
    }
    if (selectedInterest === 'not_interested') {
      return goalStatus === 'not_interested';
    }
    return true;
  }
}

export const skillStateService = new SkillStateService();