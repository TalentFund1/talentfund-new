export interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  salary?: string;
}

export interface CertificationSkill extends Skill {
  salary: string;  // Make salary required for certifications
}