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
  team: string;
  type: string;
}

export const processEmployeeData = (formData: FormData): Employee => {
  console.log('Processing employee data:', formData);
  
  // Format role with proper level case
  const formattedLevel = formData.level.charAt(0).toUpperCase() + formData.level.slice(1);
  const formattedRole = `${formData.role}: ${formattedLevel}`;
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
    team: formData.team || "RnD",
    type: formData.type || "On-site",
    skills: []
  };

  console.log('Created new employee:', newEmployee);
  return newEmployee;
};

export const validateFormData = (formData: FormData, existingEmployees: Employee[]) => {
  console.log('Validating form data:', formData);
  
  // Required fields validation
  const requiredFields = ['name', 'office', 'department', 'role', 'level', 'startDate', 'sex', 'category'];
  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]) {
      console.log(`Validation failed: ${field} is required`);
      return {
        isValid: false,
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      };
    }
  }

  // Skip ID check for existing employees during edit
  if (!existingEmployees.some(emp => emp.id === formData.id)) {
    // Check for duplicate ID only for new employees
    if (existingEmployees.some(emp => emp.id === formData.id)) {
      console.log('Validation failed: Duplicate ID found');
      return {
        isValid: false,
        error: "An employee with this ID already exists"
      };
    }
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
  const roleId = roleMapping[formData.role];
  const roleTrack = getRoleDefaultTrack(roleId);
  console.log('Role track validation:', { roleId, roleTrack, level: formData.level });

  // Validate level format based on track
  const level = formData.level.toLowerCase();
  const isManagerialLevel = level.startsWith('m');
  const isManagerialRole = roleTrack === "Managerial";

  if (isManagerialRole !== isManagerialLevel) {
    console.log('Validation failed: Role and level track mismatch');
    return {
      isValid: false,
      error: `${formData.role} requires a ${roleTrack} level (${isManagerialRole ? 'M3-M6' : 'P1-P6'})`
    };
  }

  // Validate level range
  const levelNumber = parseInt(level.slice(1));
  if (isManagerialRole && (levelNumber < 3 || levelNumber > 6)) {
    return {
      isValid: false,
      error: "Managerial level must be between M3 and M6"
    };
  }
  if (!isManagerialRole && (levelNumber < 1 || levelNumber > 6)) {
    return {
      isValid: false,
      error: "Professional level must be between P1 and P6"
    };
  }

  console.log('Form validation passed');
  return { isValid: true, error: null };
};