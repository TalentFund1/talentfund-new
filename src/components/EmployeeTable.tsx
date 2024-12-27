import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEmployeeStore } from "./employee/store/employeeStore";
import { TrackProvider } from "./skills/context/TrackContext";
import { useEmployeeSkillsState } from "../hooks/useEmployeeSkillsState";
import { EmployeeTableContent } from "./employee/table/EmployeeTableContent";

// Helper functions that were missing exports
export const getSkillProfileId = (role: string): string => {
  const baseRole = role.split(':')[0].trim();
  return baseRole === 'Engineering Manager' ? '789' :
         baseRole === 'Frontend Developer' ? '456' :
         baseRole === 'Backend Engineer' ? '123' :
         baseRole === 'AI Engineer' ? '101' : '123';
};

export const getBaseRole = (role: string): string => {
  return role.split(':')[0].trim();
};

export const getLevel = (role: string): string => {
  const parts = role.split(':');
  return parts.length > 1 ? parts[1].trim().toLowerCase() : 'p4';
};

interface EmployeeTableProps {
  readonly selectedDepartment?: ReadonlyArray<string>;
  readonly selectedLevel?: ReadonlyArray<string>;
  readonly selectedOffice?: ReadonlyArray<string>;
  readonly selectedEmploymentType?: ReadonlyArray<string>;
  readonly selectedSkills?: ReadonlyArray<string>;
  readonly selectedEmployees?: ReadonlyArray<string>;
  readonly selectedManager?: ReadonlyArray<string>;
  readonly selectedRole?: ReadonlyArray<string>;
}

const EmployeeTableWrapper = (props: Readonly<EmployeeTableProps>) => {
  const baseEmployees = useEmployeeStore((state) => state.employees);
  const { employeesWithSkills } = useEmployeeSkillsState(baseEmployees);

  return (
    <EmployeeTableContent
      employees={employeesWithSkills}
      {...props}
    />
  );
};

export const EmployeeTable = (props: Readonly<EmployeeTableProps>) => {
  return (
    <TrackProvider>
      <EmployeeTableWrapper {...props} />
    </TrackProvider>
  );
};