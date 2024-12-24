export type RequirementLevel = 'required' | 'preferred' | 'optional';
export type MinimumSkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface SkillRequirement {
  skillName: string;
  minimumLevel: MinimumSkillLevel;
  requirementLevel: RequirementLevel;
  category: 'technical' | 'soft' | 'domain';
  description?: string;
}

export interface RoleRequirements {
  roleId: string;
  roleName: string;
  requirements: SkillRequirement[];
  lastUpdated: string;
}

console.log('Skill requirement types loaded');