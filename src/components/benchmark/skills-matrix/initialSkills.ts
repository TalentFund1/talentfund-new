import { skillsDatabase, Skill } from '../../skills/data/skillsDatabase';

interface EmployeeSkill extends Skill {
  level: string;
  requirement?: string;
  isCompanySkill: boolean;
}

export const initialSkills: Record<string, EmployeeSkill[]> = {
  "124": [
    {
      ...skillsDatabase["Node.js"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["Database Design"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["API Development"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    }
  ],
  "123": [
    {
      ...skillsDatabase["Machine Learning"],
      level: "advanced",
      requirement: "required",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["Deep Learning"],
      level: "advanced",
      requirement: "required",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["Natural Language Processing"],
      level: "beginner",
      requirement: "unknown",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["TensorFlow"],
      level: "beginner",
      requirement: "skill_goal",
      isCompanySkill: true
    }
  ],
  "125": [
    {
      ...skillsDatabase["React"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["TypeScript"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    }
  ],
  "126": [
    {
      ...skillsDatabase["Team Leadership"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    },
    {
      ...skillsDatabase["Project Management"],
      level: "unspecified",
      requirement: "preferred",
      isCompanySkill: true
    }
  ]
};

export const getEmployeeSkills = (id: string) => {
  console.log('Getting skills for employee:', id);
  const skills = initialSkills[id as keyof typeof initialSkills] || [];
  console.log('Found employee skills:', skills);
  return skills;
};
