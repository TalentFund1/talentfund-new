import { EmployeeSkillData, SkillLevel, SkillWeight } from '../../../components/employee/types/employeeSkillTypes';
import { UnifiedSkill } from '../../../components/skills/types/SkillTypes';
import { skillStateService } from './SkillStateService';

class SkillEnrichmentService {
  public enrichSkillData(employeeId: string, skill: UnifiedSkill, skillData: UnifiedSkill): EmployeeSkillData {
    console.log('Enriching skill data:', {
      employeeId,
      skillTitle: skill.title
    });

    // Ensure skill level is properly typed
    const normalizedLevel = this.normalizeSkillLevel(skill.level || 'unspecified');

    return {
      id: `${employeeId}-${skill.title}`,
      employeeId,
      skillId: `${employeeId}-${skill.title}`,
      title: skill.title,
      level: normalizedLevel,
      goalStatus: skill.goalStatus || 'unknown',
      lastUpdated: new Date().toISOString(),
      confidence: 'medium',
      subcategory: skillData.subcategory || 'General',
      category: skillData.category,
      businessCategory: skillData.businessCategory,
      weight: skillStateService.normalizeWeight(skillData.weight),
      growth: skillData.growth,
      salary: skillData.salary,
      benchmarks: skillData.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };
  }

  private normalizeSkillLevel(level: string): SkillLevel {
    const normalizedLevel = level.toLowerCase();
    switch (normalizedLevel) {
      case 'beginner':
      case 'intermediate':
      case 'advanced':
        return normalizedLevel as SkillLevel;
      default:
        return 'unspecified';
    }
  }

  public initializeEmployeeSkillsData(employeeId: string, skills: UnifiedSkill[]): Record<string, EmployeeSkillData> {
    console.log('Initializing employee skills data:', {
      employeeId,
      skillCount: skills.length
    });

    const skillsRecord: Record<string, EmployeeSkillData> = {};
    skills.forEach(skill => {
      skillsRecord[skill.title] = this.enrichSkillData(employeeId, skill, skill);
    });

    return skillsRecord;
  }
}

export const skillEnrichmentService = new SkillEnrichmentService();