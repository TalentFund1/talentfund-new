import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getAllSkills, getSkillByTitle } from '../../skills/data/skills/allSkills';

// Employee skills database - now using references to universal skills
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    getSkillByTitle("Machine Learning") || getAllSkills()[0],
    getSkillByTitle("Deep Learning") || getAllSkills()[1]
  ],
  "124": [
    getSkillByTitle("Node.js") || getAllSkills()[0],
    getSkillByTitle("Database Design") || getAllSkills()[1],
    getSkillByTitle("API Development") || getAllSkills()[2]
  ],
  "125": [
    getSkillByTitle("React") || getAllSkills()[0]
  ],
  "126": [
    getSkillByTitle("Team Leadership") || getAllSkills()[0]
  ]
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const skills = employeeSkills[id] || [];
  console.log('Retrieved skills:', skills);
  return skills;
};