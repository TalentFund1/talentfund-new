import { SkillLevel } from '../data/skillLevels';

export interface SkillEntry {
  title: string;
  category: 'critical' | 'technical' | 'necessary';
  subcategory: string;
  type: 'specialized' | 'common' | 'certification';
  growth?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
  tracks?: {
    professional?: Record<string, SkillLevel>;
    managerial?: Record<string, SkillLevel>;
  };
}

export interface SkillDatabase {
  skills: SkillEntry[];
}