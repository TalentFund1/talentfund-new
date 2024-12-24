export const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

// Random skills pool completely unrelated to roles
const randomSkillsPool = [
  { name: "Cooking", level: "advanced" },
  { name: "Photography", level: "intermediate" },
  { name: "Gardening", level: "beginner" },
  { name: "Chess", level: "advanced" },
  { name: "Painting", level: "intermediate" },
  { name: "Piano", level: "beginner" },
  { name: "Yoga", level: "advanced" },
  { name: "Pottery", level: "intermediate" },
  { name: "Skateboarding", level: "beginner" },
  { name: "Origami", level: "intermediate" },
  { name: "Baking", level: "advanced" },
  { name: "Meditation", level: "beginner" },
  { name: "Dancing", level: "intermediate" },
  { name: "Singing", level: "beginner" },
  { name: "Writing", level: "advanced" }
];

// Helper function to get random skills
const getRandomSkills = () => {
  const shuffled = [...randomSkillsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5); // Get 5 random skills
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