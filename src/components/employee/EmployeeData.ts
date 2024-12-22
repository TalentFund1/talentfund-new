export const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

// Initial skills for each employee role
const aiEngineerSkills = [
  { title: "Machine Learning", level: "advanced", requirement: "skill_goal" },
  { title: "Deep Learning", level: "intermediate", requirement: "skill_goal" },
  { title: "Natural Language Processing", level: "intermediate", requirement: "skill_goal" },
  { title: "Computer Vision", level: "beginner", requirement: "skill_goal" },
  { title: "TensorFlow", level: "advanced", requirement: "skill_goal" },
  { title: "Python", level: "advanced", requirement: "skill_goal" },
  { title: "Problem Solving", level: "advanced", requirement: "skill_goal" },
  { title: "AWS Certified Machine Learning - Specialty", level: "intermediate", requirement: "skill_goal" },
  { title: "TensorFlow Developer Certificate", level: "intermediate", requirement: "skill_goal" },
  { title: "API Development", level: "intermediate", requirement: "skill_goal" },
  { title: "Performance Optimization", level: "intermediate", requirement: "skill_goal" }
];

const backendEngineerSkills = [
  { title: "Node.js", level: "advanced", requirement: "skill_goal" },
  { title: "API Development", level: "advanced", requirement: "skill_goal" },
  { title: "Performance Optimization", level: "advanced", requirement: "skill_goal" },
  { title: "System Architecture", level: "intermediate", requirement: "skill_goal" },
  { title: "Problem Solving", level: "advanced", requirement: "skill_goal" }
];

const frontendEngineerSkills = [
  { title: "React", level: "advanced", requirement: "skill_goal" },
  { title: "TypeScript", level: "advanced", requirement: "skill_goal" },
  { title: "Performance Optimization", level: "intermediate", requirement: "skill_goal" },
  { title: "Problem Solving", level: "advanced", requirement: "skill_goal" }
];

const engineeringManagerSkills = [
  { title: "Team Leadership", level: "advanced", requirement: "skill_goal" },
  { title: "Problem Solving", level: "advanced", requirement: "skill_goal" },
  { title: "Communication", level: "advanced", requirement: "skill_goal" },
  { title: "Agile Methodologies", level: "advanced", requirement: "skill_goal" }
];

export const employees = [
  {
    id: "123",
    name: "Ronald Dahl",
    role: "AI Engineer: P4",
    department: "Engineering",
    skillCount: aiEngineerSkills.length,
    benchmark: 0,
    lastUpdated: "12/19/2024",
    location: "Vancouver, BC",
    sex: "male" as const,
    category: "Contract",
    manager: "Sus Manu",
    startDate: "2023-05-16",
    office: "Toronto",
    termDate: "-"
  },
  {
    id: "124",
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    department: "Engineering",
    skillCount: backendEngineerSkills.length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female" as const,
    category: "Contract",
    manager: "Sus Manu",
    startDate: "2024-01-10",
    office: "Toronto",
    termDate: "-"
  },
  {
    id: "125",
    name: "Anna Vyselva",
    role: "Frontend Engineer: P5",
    department: "Engineering",
    skillCount: frontendEngineerSkills.length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female" as const,
    category: "Part-time",
    manager: "Sus Manu",
    startDate: "2024-06-01",
    office: "Toronto",
    termDate: "-"
  },
  {
    id: "126",
    name: "Sus Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: engineeringManagerSkills.length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male" as const,
    category: "Contract",
    manager: "",
    startDate: "2022-11-01",
    office: "Toronto",
    termDate: "-"
  }
];

// Map of employee IDs to their initial skills
export const initialEmployeeSkills = {
  "123": aiEngineerSkills,
  "124": backendEngineerSkills,
  "125": frontendEngineerSkills,
  "126": engineeringManagerSkills
};