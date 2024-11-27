import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeTable } from "@/components/EmployeeTable";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { EmployeeFilters } from "@/components/employee/EmployeeFilters";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const Employees = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Employees</h2>
              <p className="text-sm text-muted-foreground">
                Manage and track employee profiles and skills
              </p>
            </div>
            <ToggledSkillsProvider>
              <AddEmployeeDialog />
            </ToggledSkillsProvider>
          </div>

          <Card className="p-6 bg-white">
            <EmployeeFilters />
          </Card>

          <Card className="p-6 bg-white">
            <EmployeeTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;