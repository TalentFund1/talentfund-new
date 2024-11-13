type Skill = {
  name: string;
  level: string;
  required: string;
};

type SkillLevels = {
  [key: string]: Skill[];
};

export const professionalSkills: SkillLevels = {
  "P1": [
    { name: "React", level: "beginner", required: "required" },
    { name: "TypeScript", level: "beginner", required: "required" },
    { name: "Problem Solving", level: "beginner", required: "preferred" },
  ],
  "P2": [
    { name: "React", level: "intermediate", required: "required" },
    { name: "TypeScript", level: "intermediate", required: "required" },
    { name: "Problem Solving", level: "intermediate", required: "required" },
  ],
  "P3": [
    { name: "React", level: "intermediate", required: "required" },
    { name: "TypeScript", level: "intermediate", required: "required" },
    { name: "Problem Solving", level: "advanced", required: "required" },
  ],
  "P4": [
    { name: "React", level: "intermediate", required: "required" },
    { name: "TypeScript", level: "advanced", required: "required" },
    { name: "Problem Solving", level: "advanced", required: "required" },
  ],
  "P5": [
    { name: "React", level: "intermediate", required: "required" },
    { name: "TypeScript", level: "intermediate", required: "required" },
    { name: "Problem Solving", level: "advanced", required: "required" },
  ],
  "P6": [
    { name: "React", level: "advanced", required: "required" },
    { name: "TypeScript", level: "advanced", required: "required" },
    { name: "Problem Solving", level: "advanced", required: "required" },
  ],
};

export const managerialSkills: SkillLevels = {
  "M3": [
    { name: "Team Leadership", level: "intermediate", required: "required" },
    { name: "Project Management", level: "intermediate", required: "required" },
    { name: "Technical Architecture", level: "intermediate", required: "preferred" },
    { name: "Stakeholder Management", level: "intermediate", required: "unspecified" },
  ],
  "M4": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "intermediate", required: "required" },
  ],
  "M5": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
  ],
  "M6": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
  ],
};

export const skillsByCategory = {
  all: {
    professional: {
      ...professionalSkills,
    },
    managerial: {
      ...managerialSkills,
    }
  },
  specialized: {
    professional: {
      "P1": [
        { name: "Node.js", level: "beginner", required: "required" },
        { name: "Database Design", level: "beginner", required: "required" },
      ],
      "P2": [
        { name: "Node.js", level: "intermediate", required: "required" },
        { name: "Database Design", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "Node.js", level: "advanced", required: "required" },
        { name: "Database Design", level: "advanced", required: "required" },
      ],
    },
    managerial: {
      "M3": [
        { name: "Technical Architecture", level: "intermediate", required: "preferred" },
      ],
      "M4": [
        { name: "Technical Architecture", level: "advanced", required: "required" },
      ],
    }
  },
  common: {
    professional: {
      "P1": [
        { name: "API Development", level: "beginner", required: "preferred" },
        { name: "System Architecture", level: "beginner", required: "unspecified" },
      ],
      "P2": [
        { name: "API Development", level: "intermediate", required: "required" },
        { name: "System Architecture", level: "intermediate", required: "preferred" },
      ],
      "P3": [
        { name: "API Development", level: "advanced", required: "required" },
        { name: "System Architecture", level: "advanced", required: "required" },
      ],
    },
    managerial: {
      "M3": [
        { name: "Team Leadership", level: "intermediate", required: "required" },
        { name: "Project Management", level: "intermediate", required: "required" },
      ],
      "M4": [
        { name: "Team Leadership", level: "advanced", required: "required" },
        { name: "Project Management", level: "advanced", required: "required" },
      ],
    }
  },
};
