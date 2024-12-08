import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillProfileId } from "../../EmployeeTable";

const employeeSkillsData: { [key: string]: any[] } = {
  "123": [
    { title: "Python", subcategory: "Programming Languages", level: "Advanced", growth: "15%", confidence: "high" },
    { title: "Machine Learning", subcategory: "AI/ML", level: "Intermediate", growth: "25%", confidence: "medium" }
  ],
  "124": [
    { title: "JavaScript", subcategory: "Programming Languages", level: "Advanced", growth: "10%", confidence: "high" },
    { title: "React", subcategory: "Frontend Frameworks", level: "Advanced", growth: "20%", confidence: "high" }
  ],
  "125": [
    { title: "CSS/SASS", subcategory: "Styling", level: "Advanced", growth: "15%", confidence: "high" }
  ],
  "126": [
    { title: "Team Leadership", subcategory: "Management", level: "Advanced", growth: "10%", confidence: "high" },
    { title: "Agile", subcategory: "Methodologies", level: "Advanced", growth: "5%", confidence: "high" }
  ],
  "127": [
    { title: "Java", subcategory: "Programming Languages", level: "Advanced", growth: "5%", confidence: "high" },
    { title: "Spring Boot", subcategory: "Backend Frameworks", level: "Intermediate", growth: "15%", confidence: "medium" }
  ]
};

export const getEmployeeSkills = (employeeId: string) => {
  console.log('Getting skills for employee:', employeeId);
  
  // Return only the skills that are explicitly assigned to the employee
  const employeeSkills = employeeSkillsData[employeeId] || [];
  
  console.log('Employee skills found:', employeeSkills);
  
  return employeeSkills;
};

// This function can be used to get the role skills separately if needed
export const getRoleSkills = (roleId: string) => {
  const role = roleSkills[roleId as keyof typeof roleSkills];
  if (!role) {
    console.warn('No role found for ID:', roleId);
    return [];
  }
  
  return [
    ...role.specialized,
    ...role.common,
    ...role.certifications
  ];
};