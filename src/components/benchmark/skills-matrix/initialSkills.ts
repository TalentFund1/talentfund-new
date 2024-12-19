import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getSkillByTitle, getAllSkills } from '../../skills/data/skills/allSkills';

// Map of employee IDs to their skill titles
const employeeSkillMap: { [key: string]: string[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning"
  ],
  "124": [
    "Node.js",
    "Database Design",
    "API Development"
  ],
  "125": [
    "React"
  ],
  "126": [
    "Team Leadership"
  ]
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  
  const skillTitles = employeeSkillMap[id] || [];
  const skills = skillTitles
    .map(title => getSkillByTitle(title))
    .filter((skill): skill is UnifiedSkill => skill !== undefined);

  console.log('Retrieved skills for employee:', {
    employeeId: id,
    skillCount: skills.length,
    skills: skills.map(s => s.title)
  });

  return skills;
};