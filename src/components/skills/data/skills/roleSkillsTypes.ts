export interface RoleSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  salary: string;
  benchmarks: { J: boolean; B: boolean; O: boolean; }
}

export interface RoleSkills {
  specialized: RoleSkill[];
  common: RoleSkill[];
  certifications: RoleSkill[];
}