export interface CompetencyRequirement {
  level: string;
  required: string;
}

export interface LevelRequirements {
  [levelKey: string]: CompetencyRequirement;
}

export interface RoleCompetencies {
  [skillName: string]: LevelRequirements;
}

export interface CompetencyState {
  roleCompetencies: Record<string, RoleCompetencies>;
  setCompetencyRequirement: (
    roleId: string,
    skillName: string,
    levelKey: string,
    level: string,
    required: string
  ) => void;
  getRoleCompetencies: (roleId: string) => RoleCompetencies;
}