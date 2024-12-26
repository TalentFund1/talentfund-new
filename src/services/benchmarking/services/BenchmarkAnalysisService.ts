import { RoleSkillState, EmployeeSkillState, SkillLevel } from '../../../components/skills/types/skillStateTypes';

export class BenchmarkAnalysisService {
  private getLevelScore(level: SkillLevel): number {
    switch (level) {
      case 'advanced': return 3;
      case 'intermediate': return 2;
      case 'beginner': return 1;
      default: return 0;
    }
  }

  public compareSkillLevels(employeeState: EmployeeSkillState, roleState: RoleSkillState): number {
    console.log('Comparing skill levels:', {
      employeeLevel: employeeState.level,
      roleLevel: roleState.level,
      employeeGoalStatus: employeeState.goalStatus,
      roleRequired: roleState.required
    });

    const employeeScore = this.getLevelScore(employeeState.level);
    const roleScore = this.getLevelScore(roleState.level);

    // If the skill is required, employee must meet or exceed the role level
    if (roleState.required === 'required') {
      return employeeScore >= roleScore ? 100 : 
             employeeScore > 0 ? (employeeScore / roleScore) * 100 : 0;
    }

    // For preferred skills, partial credit is given
    return employeeScore > 0 ? Math.min((employeeScore / roleScore) * 100, 100) : 0;
  }

  public isSkillGoalAligned(employeeState: EmployeeSkillState, roleState: RoleSkillState): boolean {
    // Check if employee's goal status aligns with role requirements
    if (roleState.required === 'required') {
      return employeeState.goalStatus === 'skill_goal';
    }
    return true;
  }
}

export const benchmarkAnalysisService = new BenchmarkAnalysisService();