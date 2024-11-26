import { useState } from "react";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { Sidebar } from "@/components/Sidebar";
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
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string[]>([]);

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
          <ToggledSkillsProvider>
            <EmployeeFilters 
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              selectedJobTitle={selectedJobTitle}
              onJobTitleChange={setSelectedJobTitle}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              selectedOffice={selectedOffice}
              onOfficeChange={setSelectedOffice}
              selectedEmploymentType={selectedEmploymentType}
              onEmploymentTypeChange={setSelectedEmploymentType}
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
              selectedEmployees={selectedEmployees}
              onEmployeeSearch={setSelectedEmployees}
              selectedManager={selectedManager}
              onManagerChange={setSelectedManager}
              selectedRoleTitle={selectedRoleTitle}
              onRoleTitleChange={setSelectedRoleTitle}
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
          </ToggledSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default Employees;