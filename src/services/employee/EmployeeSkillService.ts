import { 
  EmployeeSkillLevel, 
  EmployeeSkillRecord,
  EmployeeSkillStatus 
} from '../../components/employee/types/EmployeeSkillDefinitions';

class EmployeeSkillService {
  public createSkillRecord(
    employeeId: string,
    skillName: string,
    level: EmployeeSkillLevel = 'unspecified',
    status: EmployeeSkillStatus = 'active'
  ): EmployeeSkillRecord {
    console.log('Creating employee skill record:', {
      employeeId,
      skillName,
      level,
      status
    });

    return {
      id: `${employeeId}-${skillName}`,
      employeeId,
      skillName,
      level,
      status,
      confidence: 'medium',
      lastUpdated: new Date().toISOString()
    };
  }

  public normalizeSkillLevel(level: string): EmployeeSkillLevel {
    console.log('Normalizing skill level:', level);
    
    const normalizedLevel = level.toLowerCase();
    switch (normalizedLevel) {
      case 'beginner':
      case 'intermediate': 
      case 'advanced':
        return normalizedLevel as EmployeeSkillLevel;
      default:
        return 'unspecified';
    }
  }

  public validateSkillRecord(record: EmployeeSkillRecord): boolean {
    console.log('Validating skill record:', record);
    
    return (
      !!record.id &&
      !!record.employeeId &&
      !!record.skillName &&
      !!record.level &&
      !!record.status &&
      !!record.confidence &&
      !!record.lastUpdated
    );
  }
}

export const employeeSkillService = new EmployeeSkillService();