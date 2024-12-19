import { EmployeeFilters } from "@/components/EmployeeFilters";
import { EmployeeTable } from "@/components/EmployeeTable";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SkillsMatrixSearchProvider } from "@/components/skills/context/SkillsMatrixSearchContext";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

export default function Employees() {
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedManager, setSelectedManager] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string[]>([]);

  console.log('Employees page state:', {
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedEmployees,
    selectedManager,
    selectedRole
  });

  return (
    <SkillsMatrixSearchProvider>
      <ToggledSkillsProvider>
        <div className="container mx-auto py-6">
          <Card className="p-6">
            <EmployeeFilters
              onDepartmentChange={setSelectedDepartment}
              selectedDepartment={selectedDepartment}
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
              onRoleChange={setSelectedRole}
              selectedRole={selectedRole}
            />
          </Card>

          <div className="mt-6">
            <EmployeeTable
              selectedDepartment={selectedDepartment}
              selectedLevel={selectedLevel}
              selectedOffice={selectedOffice}
              selectedEmploymentType={selectedEmploymentType}
              selectedSkills={selectedSkills}
              selectedEmployees={selectedEmployees}
              selectedManager={selectedManager}
              selectedRole={selectedRole}
            />
          </div>
        </div>
      </ToggledSkillsProvider>
    </SkillsMatrixSearchProvider>
  );
}