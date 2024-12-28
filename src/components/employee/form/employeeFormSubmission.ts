import { Employee } from "../../types/employeeTypes";
import { getSkillProfileId } from "../../EmployeeTable";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";
import { categorizeSkills } from "../../skills/competency/skillCategories";
import { roleMapping } from "./RoleLevelFields";

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
}

export const processEmployeeData = (formData: FormData): Employee => {
  console.log('Processing employee data:', formData);
  
  const formattedRole = `${formData.role}: ${formData.level}`;
  console.log('Formatted role:', formattedRole);

  const lastUpdated = new Date().toLocaleDateString();
  console.log('Setting last updated date:', lastUpdated);

  const newEmployee: Employee = {
    id: formData.id,
    name: formData.name,
    role: formattedRole,
    department: formData.department,
    skillCount: 0,
    benchmark: 0,
    lastUpdated: lastUpdated,
    location: formData.location || formData.office,
    sex: formData.sex as 'male' | 'female',
    category: formData.category,
    manager: formData.manager || '',
    startDate: formData.startDate,
    office: formData.office,
    termDate: formData.termDate || "-",
    skills: [] // Initialize with empty skills array
  };

  console.log('Created new employee:', newEmployee);
  return newEmployee;
};

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

  // Check for duplicate ID when adding new employee (not editing)
  const isEditing = existingEmployees.some(emp => emp.id === formData.id);
  if (!isEditing && existingEmployees.some(emp => emp.id === formData.id)) {
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

  // Validate role and level combination
  const managerialRoles = ['Engineering Manager', 'Product Manager', 'Technical Manager'];
  const isManagerialRole = managerialRoles.some(role => formData.role.includes(role));
  const isManagerialLevel = formData.level.startsWith('M');

  if (isManagerialRole !== isManagerialLevel) {
    console.log('Role/level validation:', {
      role: formData.role,
      level: formData.level,
      isManagerialRole,
      isManagerialLevel
    });
    return {
      isValid: false,
      error: isManagerialRole 
        ? "Managerial roles require M-level designation (M3-M6)"
        : "Professional roles require P-level designation (P1-P6)"
    };
  }

  console.log('Form validation passed');
  return { isValid: true, error: null };
};