export interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
}

export interface SkillsTableProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export interface RoleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth?: string;
  salary?: string;
  requirement?: 'required' | 'preferred' | 'skill_goal';
}