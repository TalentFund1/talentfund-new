import { Employee } from "../../types/employeeTypes";

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
  // Required fields
  const requiredFields = ['id', 'name', 'office', 'department', 'role', 'startDate', 'sex', 'category'];
  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]) {
      return {
        isValid: false,
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      };
    }
  }

  // Check for duplicate ID
  const isDuplicateId = existingEmployees.some(emp => emp.id === formData.id);
  if (isDuplicateId) {
    return {
      isValid: false,
      error: "An employee with this ID already exists"
    };
  }

  // Validate dates
  const startDate = new Date(formData.startDate);
  if (isNaN(startDate.getTime())) {
    return {
      isValid: false,
      error: "Invalid start date"
    };
  }

  if (formData.termDate) {
    const termDate = new Date(formData.termDate);
    if (isNaN(termDate.getTime())) {
      return {
        isValid: false,
        error: "Invalid term date"
      };
    }
    if (termDate < startDate) {
      return {
        isValid: false,
        error: "Term date cannot be earlier than start date"
      };
    }
  }

  return { isValid: true, error: null };
};

export const processEmployeeData = (formData: FormData): Employee => {
  const skillsList = formData.skills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  return {
    id: formData.id,
    name: formData.name,
    role: `${formData.role}${formData.level ? ': ' + formData.level.toUpperCase() : ''}`,
    department: formData.department,
    skillCount: skillsList.length,
    benchmark: 0, // Will be calculated later
    lastUpdated: new Date().toLocaleDateString(),
    location: formData.location,
    sex: formData.sex as 'male' | 'female',
    category: formData.category,
    manager: formData.manager,
    startDate: formData.startDate,
    office: formData.office,
    termDate: formData.termDate || "-"
  };
};