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
    { name: "Amazon Web Services", level: "beginner", required: "required" },
    { name: "Python", level: "intermediate", required: "required" },
    { name: "Machine Learning", level: "beginner", required: "preferred" },
    { name: "Data Visualization", level: "intermediate", required: "unspecified" },
    { name: "SQL", level: "beginner", required: "unspecified" },
  ],
  "P2": [
    { name: "Amazon Web Services", level: "intermediate", required: "required" },
    { name: "Python", level: "intermediate", required: "required" },
    { name: "Machine Learning", level: "intermediate", required: "required" },
    { name: "Data Visualization", level: "intermediate", required: "preferred" },
    { name: "SQL", level: "intermediate", required: "preferred" },
  ],
  "P3": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "Data Visualization", level: "advanced", required: "required" },
    { name: "SQL", level: "advanced", required: "required" },
  ],
  "P4": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Data Visualization", level: "advanced", required: "required" },
    { name: "SQL", level: "advanced", required: "required" },
  ],
  "P5": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Technical Leadership", level: "intermediate", required: "required" },
    { name: "Data Visualization", level: "advanced", required: "required" },
    { name: "SQL", level: "advanced", required: "required" },
  ],
  "P6": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Technical Leadership", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Data Visualization", level: "advanced", required: "required" },
    { name: "SQL", level: "advanced", required: "required" },
  ],
};

export const managerialSkills: SkillLevels = {
  "M3": [
    { name: "Team Leadership", level: "intermediate", required: "required" },
    { name: "Project Management", level: "intermediate", required: "required" },
    { name: "Technical Architecture", level: "intermediate", required: "preferred" },
    { name: "Stakeholder Management", level: "intermediate", required: "unspecified" },
    { name: "Resource Planning", level: "beginner", required: "unspecified" },
  ],
  "M4": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "intermediate", required: "required" },
    { name: "Stakeholder Management", level: "intermediate", required: "preferred" },
    { name: "Resource Planning", level: "intermediate", required: "preferred" },
  ],
  "M5": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Organizational Development", level: "intermediate", required: "required" },
    { name: "Stakeholder Management", level: "advanced", required: "required" },
    { name: "Resource Planning", level: "advanced", required: "required" },
  ],
  "M6": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Organizational Development", level: "advanced", required: "required" },
    { name: "Business Strategy", level: "advanced", required: "required" },
    { name: "Stakeholder Management", level: "advanced", required: "required" },
    { name: "Resource Planning", level: "advanced", required: "required" },
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
        { name: "Amazon Web Services", level: "beginner", required: "required" },
        { name: "Machine Learning", level: "beginner", required: "preferred" },
      ],
      "P2": [
        { name: "Amazon Web Services", level: "intermediate", required: "required" },
        { name: "Machine Learning", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "Amazon Web Services", level: "advanced", required: "required" },
        { name: "Machine Learning", level: "advanced", required: "required" },
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
        { name: "Python", level: "intermediate", required: "required" },
      ],
      "P2": [
        { name: "Python", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "Python", level: "advanced", required: "required" },
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
  certification: {
    professional: {
      "P1": [
        { name: "AWS Certified Cloud Practitioner", level: "beginner", required: "preferred" },
      ],
      "P2": [
        { name: "AWS Certified Developer", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "AWS Certified Solutions Architect", level: "advanced", required: "required" },
      ],
    },
    managerial: {
      "M3": [
        { name: "Project Management Professional (PMP)", level: "intermediate", required: "preferred" },
      ],
      "M4": [
        { name: "Project Management Professional (PMP)", level: "advanced", required: "required" },
      ],
    }
  }
};
