import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeTable } from "@/components/EmployeeTable";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { useState } from "react";

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
            <EmployeeFilters 
              onDepartmentChange={setSelectedDepartment}
              selectedDepartment={selectedDepartment}
              onJobTitleChange={setSelectedJobTitle}
              selectedJobTitle={selectedJobTitle}
              onLevelChange={setSelectedLevel}
              selectedLevel={selectedLevel}
              onOfficeChange={setSelectedOffice}
              selectedOffice={selectedOffice}
              onEmploymentTypeChange={setSelectedEmploymentType}
              selectedEmploymentType={selectedEmploymentType}
              onSkillsChange={setSelectedSkills}
              selectedSkills={selectedSkills}
              onEmployeeSearch={setSelectedEmployees}
              selectedEmployees={selectedEmployees}
              onManagerChange={setSelectedManager}
              selectedManager={selectedManager}
            />
          </Card>

          <Card className="p-6 bg-white">
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;