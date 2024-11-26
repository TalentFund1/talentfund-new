import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeTable } from "@/components/EmployeeTable";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { EmployeeFilters } from "@/components/employee/EmployeeFilters";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const Employees = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedManager, setSelectedManager] = useState<string[]>([]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <ToggledSkillsProvider>
              <AddEmployeeDialog />
            </ToggledSkillsProvider>
          </div>

          <EmployeeFilters
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedJobTitle={selectedJobTitle}
            setSelectedJobTitle={setSelectedJobTitle}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedOffice={selectedOffice}
            setSelectedOffice={setSelectedOffice}
            selectedEmploymentType={selectedEmploymentType}
            setSelectedEmploymentType={setSelectedEmploymentType}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            selectedManager={selectedManager}
            setSelectedManager={setSelectedManager}
          />

          <EmployeeTable
            selectedDepartment={selectedDepartment}
            selectedJobTitle={selectedJobTitle}
            selectedLevel={selectedLevel}
            selectedOffice={selectedOffice}
            selectedEmploymentType={selectedEmploymentType}
            selectedSkills={selectedSkills}
            selectedEmployees={selectedEmployees}
            selectedManager={selectedManager}
          />
        </div>
      </div>
    </div>
  );
};

export default Employees;