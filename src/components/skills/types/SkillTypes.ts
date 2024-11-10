export interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
}

export interface SkillsTableProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}