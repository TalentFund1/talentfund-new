export interface SimpleSkill {
  id?: string;
  title: string;
  subcategory?: string;
  level?: string;
  growth?: string;
  salary?: string;
  businessCategory?: string;
  category?: string;
  weight?: string;
}

export interface UnifiedSkill extends SimpleSkill {
  id: string;
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  salary: string;
  businessCategory: string;
  category: string;
  weight: string;
  goalStatus?: string;
  lastUpdated?: string;
  confidence?: string;
}

export interface RoleSkillData {
  title: string;
  roleTrack: "Professional" | "Managerial";
  specialized: SimpleSkill[];
  common: SimpleSkill[];
  certifications: SimpleSkill[];
  skills?: SimpleSkill[];
}
