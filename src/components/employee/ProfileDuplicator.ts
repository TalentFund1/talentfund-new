import { Employee } from "../types/employeeTypes";
import { initialSkills, getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";

export const createNewProfile = (profileData: {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  sex: 'male' | 'female';
  category: string;
  manager: string;
  startDate: string;
  office: string;
}): Employee => {
  console.log('Creating new profile with data:', profileData);

  // Create the employee profile with all required fields
  const newEmployee: Employee = {
    ...profileData,
    skillCount: 0, // Will be updated after skills are added
    benchmark: 0,
    lastUpdated: new Date().toLocaleDateString(),
    termDate: "-"
  };

  // Get the base role to determine which skills to duplicate
  const baseRole = profileData.role.split(':')[0].trim();
  console.log('Base role for new profile:', baseRole);

  // Find matching role ID
  let roleId = "";
  Object.entries(roleSkills).forEach(([id, skills]) => {
    if (skills.specialized.some(skill => 
      skill.title.toLowerCase().includes(baseRole.toLowerCase())
    )) {
      roleId = id;
    }
  });

  if (roleId) {
    console.log('Found matching role ID:', roleId);
    // Add skills for the new profile
    initialSkills[profileData.id] = [...getEmployeeSkills(roleId)];
    newEmployee.skillCount = initialSkills[profileData.id].length;
  } else {
    console.warn('No matching role found for skill duplication');
  }

  return newEmployee;
};

export const validateProfileData = (data: any): boolean => {
  const requiredFields = [
    'id', 'name', 'role', 'department', 'location', 
    'sex', 'category', 'manager', 'startDate', 'office'
  ];
  
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields);
    return false;
  }
  
  return true;
};