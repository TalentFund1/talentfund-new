import { Employee } from "../../types/employeeTypes";
import { getSkillProfileId } from "../../EmployeeTable";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";
import { categorizeSkills } from "../../skills/competency/skillCategories";
import { roleMapping } from "./RoleLevelFields";
import { getRoleDefaultTrack } from "../../skills/data/roles/roleDefinitions";

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
  
  const formattedRole = formData.level ? `${formData.role}: ${formData.level.toUpperCase()}` : formData.role;
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

  // Get role track
  const roleId = Object.entries(roleMapping).find(([title]) => title === formData.role)?.[1];
  const roleTrack = roleId ? getRoleDefaultTrack(roleId) : "Professional";
  
  console.log('Role validation:', {
    roleId,
    roleTrack,
    level: formData.level
  });

  // Validate role and level combination
  const isManagerialLevel = formData.level.toLowerCase().startsWith('m');
  const isManagerialTrack = roleTrack === "Managerial";
  
  if (isManagerialLevel !== isManagerialTrack) {
    console.log('Validation failed: Role track and level mismatch', {
      roleTrack,
      level: formData.level,
      isManagerialLevel,
      isManagerialTrack
    });
    return {
      isValid: false,
      error: `Invalid level for ${roleTrack} role. ${roleTrack === "Professional" ? "Use P1-P6" : "Use M3-M6"}`
    };
  }

  console.log('Form validation passed');
  return { isValid: true, error: null };
};