export interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
  isSkillGoal: boolean;
  category: "specialized" | "common" | "certification";
  subcategory: string;
}

export const skillsData: Skill[] = [
  // Specialized Skills
  { name: "React", level: "advanced", isSkillGoal: true, category: "specialized", subcategory: "Web Development" },
  { name: "JavaScript", level: "advanced", isSkillGoal: true, category: "specialized", subcategory: "Programming Languages" },
  { name: "TypeScript", level: "advanced", isSkillGoal: true, category: "specialized", subcategory: "Programming Languages" },
  { name: "Node.js", level: "advanced", isSkillGoal: false, category: "specialized", subcategory: "Backend Development" },
  { name: "Computer Architecture", level: "intermediate", isSkillGoal: true, category: "specialized", subcategory: "Systems" },
  { name: "SystemVerilog", level: "intermediate", isSkillGoal: false, category: "specialized", subcategory: "Hardware" },
  { name: "Docker", level: "intermediate", isSkillGoal: true, category: "specialized", subcategory: "DevOps" },
  { name: "Static Timing Analysis", level: "beginner", isSkillGoal: false, category: "specialized", subcategory: "Hardware Verification" },
  { name: "Cadence Encounter", level: "beginner", isSkillGoal: false, category: "specialized", subcategory: "EDA Tools" },
  { name: "Synopsys Primetime", level: "beginner", isSkillGoal: true, category: "specialized", subcategory: "EDA Tools" },
  { name: "GraphQL", level: "unspecified", isSkillGoal: false, category: "specialized", subcategory: "API Development" },
  { name: "Internet of Things", level: "unspecified", isSkillGoal: false, category: "specialized", subcategory: "Embedded Systems" },
  { name: "Kubernetes", level: "unspecified", isSkillGoal: false, category: "specialized", subcategory: "DevOps" },
  { name: "AWS Lambda", level: "unspecified", isSkillGoal: false, category: "specialized", subcategory: "Cloud Computing" },
  { name: "Azure Functions", level: "beginner", isSkillGoal: true, category: "specialized", subcategory: "Cloud Computing" },

  // Common Skills
  { name: "UI/UX Design Principles", level: "advanced", isSkillGoal: true, category: "common", subcategory: "Design" },
  { name: "Agile Methodologies", level: "advanced", isSkillGoal: true, category: "common", subcategory: "Project Management" },
  { name: "Project Management", level: "intermediate", isSkillGoal: false, category: "common", subcategory: "Management" },
  { name: "Problem Solving", level: "intermediate", isSkillGoal: true, category: "common", subcategory: "Soft Skills" },
  { name: "Scrum", level: "intermediate", isSkillGoal: false, category: "common", subcategory: "Agile" },
  { name: "Time Management", level: "beginner", isSkillGoal: true, category: "common", subcategory: "Soft Skills" },
  { name: "Microsoft Excel", level: "beginner", isSkillGoal: false, category: "common", subcategory: "Office Tools" },
  { name: "Team Leadership", level: "unspecified", isSkillGoal: false, category: "common", subcategory: "Management" },
  { name: "Communication", level: "unspecified", isSkillGoal: true, category: "common", subcategory: "Soft Skills" },
  { name: "Technical Writing", level: "unspecified", isSkillGoal: false, category: "common", subcategory: "Documentation" },

  // Certifications
  { name: "Cybersecurity License", level: "advanced", isSkillGoal: true, category: "certification", subcategory: "Security" }
];

export const getSkillsByCategory = (category: "specialized" | "common" | "certification") => {
  return skillsData.filter(skill => skill.category === category);
};

export const convertToMatrixFormat = (skill: Skill) => ({
  title: skill.name,
  subcategory: skill.subcategory,
  level: skill.level,
  growth: "10%",
  confidence: skill.level === "advanced" ? "high" : skill.level === "intermediate" ? "medium" : "low"
});