import { skillsDatabase, Skill } from './skillsDatabase';

const getSkillWithDefaults = (skillTitle: string): Skill => {
  return skillsDatabase[skillTitle] || {
    title: skillTitle,
    subcategory: "General Skills",
    category: "technical",
    growth: "0%",
    salary: "$0",
    benchmarks: { B: false, R: false, M: false, O: false }
  };
};

export const roleSkills = {
  "123": {
    title: "AI Engineer",
    soc: "11-9041",
    specialized: [
      getSkillWithDefaults("Machine Learning"),
      getSkillWithDefaults("Deep Learning"),
      getSkillWithDefaults("Natural Language Processing"),
      getSkillWithDefaults("Computer Vision"),
      getSkillWithDefaults("TensorFlow")
    ],
    common: [
      getSkillWithDefaults("Python"),
      getSkillWithDefaults("Problem Solving"),
      getSkillWithDefaults("Technical Writing")
    ],
    certifications: [
      getSkillWithDefaults("AWS Certified Machine Learning - Specialty"),
      getSkillWithDefaults("TensorFlow Developer Certificate")
    ]
  },
  "124": {
    title: "Backend Engineer",
    soc: "15-1252",
    specialized: [
      getSkillWithDefaults("Node.js"),
      getSkillWithDefaults("Database Design"),
      getSkillWithDefaults("API Development"),
      getSkillWithDefaults("System Architecture"),
      getSkillWithDefaults("Kubernetes")
    ],
    common: [
      getSkillWithDefaults("Problem Solving"),
      getSkillWithDefaults("Code Review"),
      getSkillWithDefaults("Agile Methodologies")
    ],
    certifications: [
      getSkillWithDefaults("AWS Certified Solutions Architect"),
      getSkillWithDefaults("Kubernetes Administrator (CKA)")
    ]
  },
  "125": {
    title: "Frontend Engineer",
    soc: "15-1254",
    specialized: [
      getSkillWithDefaults("React"),
      getSkillWithDefaults("TypeScript"),
      getSkillWithDefaults("Next.js"),
      getSkillWithDefaults("CSS/SASS"),
      getSkillWithDefaults("Performance Optimization")
    ],
    common: [
      getSkillWithDefaults("Problem Solving"),
      getSkillWithDefaults("Code Review"),
      getSkillWithDefaults("Agile Methodologies")
    ],
    certifications: [
      getSkillWithDefaults("AWS Certified Developer - Associate"),
      getSkillWithDefaults("Google Mobile Web Specialist")
    ]
  },
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    specialized: [
      getSkillWithDefaults("System Design"),
      getSkillWithDefaults("Technical Architecture"),
      getSkillWithDefaults("Risk Management"),
      getSkillWithDefaults("Team Leadership"),
      getSkillWithDefaults("Project Management")
    ],
    common: [
      getSkillWithDefaults("Strategic Planning"),
      getSkillWithDefaults("Stakeholder Management"),
      getSkillWithDefaults("Agile Methodologies")
    ],
    certifications: [
      getSkillWithDefaults("Project Management Professional (PMP)"),
      getSkillWithDefaults("Certified Scrum Master (CSM)")
    ]
  },
  "127": {
    title: "DevOps Engineer",
    soc: "15-1244",
    specialized: [
      getSkillWithDefaults("Docker"),
      getSkillWithDefaults("Kubernetes"),
      getSkillWithDefaults("Jenkins"),
      getSkillWithDefaults("Terraform"),
      getSkillWithDefaults("AWS")
    ],
    common: [
      getSkillWithDefaults("Linux Administration"),
      getSkillWithDefaults("Shell Scripting"),
      getSkillWithDefaults("Git"),
      getSkillWithDefaults("Problem Solving")
    ],
    certifications: [
      getSkillWithDefaults("AWS Certified DevOps Engineer"),
      getSkillWithDefaults("Certified Kubernetes Administrator"),
      getSkillWithDefaults("HashiCorp Certified Terraform Associate")
    ]
  }
};
