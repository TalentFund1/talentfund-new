import { Employee } from "../../types/employeeTypes";

export const validateFormData = (formData: any, existingEmployees: Employee[]) => {
  if (!formData.name) {
    return { isValid: false, error: "Name is required" };
  }

  if (!formData.role) {
    return { isValid: false, error: "Role is required" };
  }

  if (!formData.department) {
    return { isValid: false, error: "Department is required" };
  }

  if (existingEmployees.some(emp => 
    emp.name.toLowerCase() === formData.name.toLowerCase() && 
    emp.id !== formData.id
  )) {
    return { isValid: false, error: "An employee with this name already exists" };
  }

  const employee: Employee = {
    id: formData.id,
    name: formData.name,
    role: formData.level ? `${formData.role}: ${formData.level}` : formData.role,
    department: formData.department,
    skillCount: 0,
    benchmark: 0,
    lastUpdated: new Date().toLocaleDateString(),
    location: formData.location,
    sex: formData.sex as 'male' | 'female',
    category: formData.category,
    manager: formData.manager,
    startDate: formData.startDate,
    office: formData.office,
    termDate: formData.termDate || "-",
    team: formData.team || "RnD",
    skills: []
  };

  return { isValid: true, employee };
};