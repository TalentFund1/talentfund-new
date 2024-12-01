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
  console.log('Validating form data:', formData);
  
  // Required fields validation
  const requiredFields = ['id', 'name', 'office', 'department', 'role', 'level', 'startDate', 'sex', 'category'];
  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]) {
      console.log(`Validation failed: ${field} is required`);
      return {
        isValid: false,
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      };
    }
  }

  // Check for duplicate ID
  if (existingEmployees.some(emp => emp.id === formData.id)) {
    console.log('Validation failed: Duplicate ID found');
    return {
      isValid: false,
      error: "An employee with this ID already exists"
    };
  }

  // Validate dates
  const startDate = new Date(formData.startDate);
  if (isNaN(startDate.getTime())) {
    console.log('Validation failed: Invalid start date');
    return {
      isValid: false,
      error: "Invalid start date"
    };
  }

  if (formData.termDate) {
    const termDate = new Date(formData.termDate);
    if (isNaN(termDate.getTime())) {
      console.log('Validation failed: Invalid term date');
      return {
        isValid: false,
        error: "Invalid term date"
      };
    }
    if (termDate < startDate) {
      console.log('Validation failed: Term date before start date');
      return {
        isValid: false,
        error: "Term date cannot be earlier than start date"
      };
    }
  }

  console.log('Form validation passed');
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

  // Format role with level
  const formattedRole = `${formData.role}${formData.level ? ': ' + formData.level.toUpperCase() : ''}`;
  console.log('Formatted role:', formattedRole);

  // Get role-specific skills
  const roleId = getSkillProfileId(formData.role);
  const roleSkills = getEmployeeSkills(roleId);
  
  // Categorize skills
  const categorizedSkills = categorizeSkills(skillsList, roleId);
  console.log('Categorized skills:', categorizedSkills);

  const lastUpdated = new Date().toLocaleDateString();
  console.log('Setting last updated date:', lastUpdated);

  // Create new employee
  const newEmployee: Employee = {
    id: formData.id,
    name: formData.name,
    role: formattedRole,
    department: formData.department,
    skillCount: skillsList.length || roleSkills.length,
    benchmark: 0, // Initial benchmark, will be calculated after creation
    lastUpdated: lastUpdated,
    location: formData.location || formData.office,
    sex: formData.sex as 'male' | 'female',
    category: formData.category,
    manager: formData.manager || '',
    startDate: formData.startDate,
    office: formData.office,
    termDate: formData.termDate || "-"
  };

  console.log('Created new employee:', newEmployee);
  return newEmployee;
};