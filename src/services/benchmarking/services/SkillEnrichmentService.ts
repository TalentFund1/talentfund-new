export class SkillEnrichmentService {
  public enrichSkillData(employeeId: string, skill: any, skillData: any) {
    console.log('SkillEnrichmentService: Enriching skill data:', {
      employeeId,
      skillTitle: skill.title
    });

    return {
      ...skill,
      id: `${employeeId}-${skill.title}`,
      employeeId,
      subcategory: skillData.subcategory || 'General',
      category: skillData.category,
      businessCategory: skillData.businessCategory,
      weight: skillData.weight,
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

  public initializeEmployeeSkillsData(employeeId: string, skills: any[]) {
    console.log('SkillEnrichmentService: Initializing employee skills data:', {
      employeeId,
      skillCount: skills.length
    });

    return {
      employeeId,
      skills,
      states: {},
      lastUpdated: new Date().toISOString()
    };
  }
}

export const skillEnrichmentService = new SkillEnrichmentService();