import { Employee } from "../../types/employeeTypes";
import { getSkillProfileId } from "../../EmployeeTable";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";
import { categorizeSkills } from "../../skills/competency/skillCategories";

interface FormData {
  id: string;
  name: string;
  location: string;
  office: string;
  department: string;
  manager: string;
  role: string;
  level: string;
  startDate: string;
  termDate: string;
  sex: string;
  category: string;
  skills: string;
}

export const validateFormData = (formData: FormData, existingEmployees: Employee[]) => {
  if (!formData.id || !formData.name || !formData.department || !formData.role || !formData.office || !formData.startDate) {
    console.log('Form validation failed - Missing required fields');
    return {
      isValid: false,
      error: "Please fill in all required fields: ID, Name, Department, Role, Office, and Start Date"
    };
  }

  const isDuplicateId = existingEmployees.some(emp => emp.id === formData.id || emp.id === String(formData.id));
  if (isDuplicateId) {
    console.log('Form validation failed - Duplicate employee ID:', formData.id);
    return {
      isValid: false,
      error: "An employee with this ID already exists. Please use a unique ID."
    };
  }

  return { isValid: true, error: null };
};

export const processEmployeeData = (formData: FormData): Employee => {
  console.log('Processing employee data:', formData);
  
  // Process skills
  const skillsList = formData.skills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  console.log('Processed skills list:', skillsList);

  // Get role-specific skills
  const roleId = getSkillProfileId(formData.role);
  const roleSkills = getEmployeeSkills(roleId);
  
  // Categorize skills
  const categorizedSkills = categorizeSkills(skillsList, roleId);
  console.log('Categorized skills:', categorizedSkills);

  // Create new employee
  const newEmployee: Employee = {
    id: String(formData.id),
    name: formData.name,
    role: `${formData.role}${formData.level ? ': ' + formData.level.toUpperCase() : ''}`,
    department: formData.department,
    skillCount: skillsList.length || roleSkills.length,
    benchmark: 0,
    lastUpdated: new Date().toLocaleDateString(),
    location: formData.location,
    sex: formData.sex as 'male' | 'female',
    category: formData.category,
    manager: formData.manager,
    startDate: formData.startDate,
    office: formData.office,
    termDate: formData.termDate || "-"
  };

  console.log('Created new employee:', newEmployee);
  return newEmployee;
};