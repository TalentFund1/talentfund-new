import { useParams } from "react-router-dom";
import { useRoleStore } from "../components/benchmark/RoleBenchmark";
import { getSkillProfileId } from "../components/EmployeeTable";
import { useEffect } from "react";
import { useEmployeeStore } from "../components/employee/store/employeeStore";

export const useRoleIdResolver = () => {
  const { id: urlRoleId } = useParams<{ id: string }>();
  const { selectedRole, setSelectedRole } = useRoleStore();
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);

  // Get the effective role ID with clear precedence
  const resolveRoleId = () => {
    // 1. First priority: URL parameter
    if (urlRoleId) {
      console.log('Using URL role ID:', urlRoleId);
      return urlRoleId;
    }

    // 2. Second priority: Selected role from store
    if (selectedRole) {
      console.log('Using selected role from store:', selectedRole);
      return selectedRole;
    }

    // 3. Third priority: Employee's assigned role ID
    if (urlRoleId) {
      const employee = getEmployeeById(urlRoleId);
      if (employee) {
        const employeeRoleId = getSkillProfileId(employee.role);
        console.log('Using employee assigned role ID:', employeeRoleId);
        return employeeRoleId;
      }
    }

    // 4. Final fallback
    console.log('Using default role ID: 123');
    return "123";
  };

  const effectiveRoleId = resolveRoleId();

  // Sync the resolved role ID with the store
  useEffect(() => {
    if (effectiveRoleId !== selectedRole) {
      console.log('Syncing role ID with store:', effectiveRoleId);
      setSelectedRole(effectiveRoleId);
    }
  }, [effectiveRoleId, selectedRole, setSelectedRole]);

  return effectiveRoleId;
};