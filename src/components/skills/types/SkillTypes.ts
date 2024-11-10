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