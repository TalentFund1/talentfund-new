import { useParams } from "react-router-dom";
import { useRoleStore } from "../components/benchmark/RoleBenchmark";
import { getSkillProfileId } from "../components/EmployeeTable";
import { useEffect } from "react";
import { useEmployeeStore } from "../components/employee/store/employeeStore";

export const useRoleIdResolver = () => {
  const { id: employeeId } = useParams<{ id: string }>();
  const { selectedRole, setSelectedRole } = useRoleStore();
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);

  // Get the effective role ID with clear precedence
  const resolveRoleId = () => {
    // 1. First priority: Employee's assigned role ID (when viewing employee profile)
    if (employeeId) {
      const employee = getEmployeeById(employeeId);
      if (employee) {
        const employeeRoleId = getSkillProfileId(employee.role);
        console.log('Using employee assigned role ID:', {
          employeeId,
          role: employee.role,
          mappedRoleId: employeeRoleId
        });
        return employeeRoleId;
      }
    }

    // 2. Second priority: Selected role from store (when using role selector)
    if (selectedRole) {
      console.log('Using selected role from store:', selectedRole);
      return selectedRole;
    }

    // 3. Final fallback
    console.log('Using default role ID: 123');
    return "123";
  };

  const effectiveRoleId = resolveRoleId();

  // Sync the resolved role ID with the store
  useEffect(() => {
    if (effectiveRoleId !== selectedRole) {
      console.log('Syncing role ID with store:', {
        previous: selectedRole,
        new: effectiveRoleId
      });
      setSelectedRole(effectiveRoleId);
    }
  }, [effectiveRoleId, selectedRole, setSelectedRole]);

  return effectiveRoleId;
};