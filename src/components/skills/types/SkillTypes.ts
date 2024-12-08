export interface Skill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  salary: string;
  confidence: "low" | "medium" | "high";
  type: "critical" | "technical" | "necessary";
  category: "specialized" | "common" | "certification";
  requirement?: string;
  isCompanySkill?: boolean;
  benchmarks: {
    C: boolean;
    B: boolean;
    B2: boolean;
    O: boolean;
  };
}

export interface UnifiedSkill extends Skill {
  level?: string;
}