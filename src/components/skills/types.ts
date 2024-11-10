export interface BaseSkill {
  name: string;
}

export interface DetailedSkill extends BaseSkill {
  level: string;
  isSkillGoal: boolean;
}

export interface Certification extends BaseSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface SkillProfileRow {
  id: string;
  name: string;
  function: string;
  skillCount: string;
  employees: string;
  matches: string;
  lastUpdated: string;
}