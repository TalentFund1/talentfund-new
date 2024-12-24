import { getAllSkills } from '../skills/data/skills/allSkills';
import { UnifiedSkill } from '../skills/types/SkillTypes';
import { SkillLevel } from './types/employeeSkillTypes';

export const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

// Helper function to get random skills from universal database
const getRandomSkills = () => {
  const allSkills = getAllSkills();
  const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
  const selectedSkills = shuffled.slice(0, 5);
  
  const levels: SkillLevel[] = ['beginner', 'intermediate', 'advanced'];
  
  return selectedSkills.map(skill => ({
    name: skill.title,
    level: levels[Math.floor(Math.random() * levels.length)]
  }));
};

export const employees = [
  {
    id: "123",
    name: "Ronald Dahl",
    role: "AI Engineer: P4",  
    department: "Engineering",
    skillCount: 5,
    benchmark: 0,
    lastUpdated: "12/19/2024",
    location: "Vancouver, BC",
    sex: "male" as const,
    category: "Contract",
    manager: "Sus Manu",
    startDate: "2023-05-16",
    office: "Toronto",
    termDate: "-",
    skills: getRandomSkills()
  },
  {
    id: "124",
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    department: "Engineering",
    skillCount: 5,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female" as const,
    category: "Contract",
    manager: "Sus Manu",
    startDate: "2024-01-10",
    office: "Toronto",
    termDate: "-",
    skills: getRandomSkills()
  },
  {
    id: "125",
    name: "Anna Vyselva",
    role: "Frontend Engineer: P5",
    department: "Engineering",
    skillCount: 5,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female" as const,
    category: "Part-time",
    manager: "Sus Manu",
    startDate: "2024-06-01",
    office: "Toronto",
    termDate: "-",
    skills: getRandomSkills()
  },
  {
    id: "126",
    name: "Sus Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: 5,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male" as const,
    category: "Contract",
    manager: "",
    startDate: "2022-11-01",
    office: "Toronto",
    termDate: "-",
    skills: getRandomSkills()
  }
];
