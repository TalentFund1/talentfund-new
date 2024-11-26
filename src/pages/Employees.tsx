import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { Sidebar } from "@/components/Sidebar";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const Employees = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-8 ml-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
            <ToggledSkillsProvider>
              <AddEmployeeDialog />
            </ToggledSkillsProvider>
          </div>
          <EmployeeFilters />
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default Employees;