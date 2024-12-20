import { useRoleSkillsStore } from './state/roleSkills/RoleSkillsState';
import { useEmployeeSkillsStore } from './state/employeeSkills/EmployeeSkillsState';

// Re-export the stores for backward compatibility
export const useCompetencyStore = useRoleSkillsStore;

// Export both stores for specific use cases
export { useRoleSkillsStore, useEmployeeSkillsStore };