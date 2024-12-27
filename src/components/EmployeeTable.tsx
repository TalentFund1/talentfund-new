import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEmployeeStore } from "./employee/store/employeeStore";
import { TrackProvider } from "./skills/context/TrackContext";
import { useEmployeeSkillsState } from "../hooks/useEmployeeSkillsState";
import { EmployeeTableContent } from "./employee/table/EmployeeTableContent";

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