import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId } from "../EmployeeTable";
import { roleSkills } from "./data/roleSkills";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { EmployeeList } from "./overview/EmployeeList";

const EmployeeOverviewContent = () => {
  const { id: roleId } = useParams();
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employees = useEmployeeStore((state) => state.employees);

  // Get current role data
  const currentRole = roleSkills[roleId as keyof typeof roleSkills];
  
  console.log('EmployeeOverview - Current role:', {
    roleId,
    roleName: currentRole?.title,
    totalEmployees: employees.length
  });

  // Get exact role matches (same role ID)
  const exactMatchEmployees = employees
    .filter(emp => {
      const empRoleId = getSkillProfileId(emp.role);
      const matchesRole = empRoleId === roleId;
      
      console.log('Checking employee match:', {
        employee: emp.name,
        employeeRole: emp.role,
        employeeRoleId: empRoleId,
        targetRoleId: roleId,
        isMatch: matchesRole
      });
      
      return matchesRole;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark);

  // Get partial matches (different roles but matching skills)
  const partialMatchEmployees = employees
    .filter(emp => {
      const empRoleId = getSkillProfileId(emp.role);
      if (empRoleId === roleId) return false;

      const benchmark = calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );

      return benchmark > 70; // Only show high matches
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark)
    .slice(0, 3);

  console.log('EmployeeOverview - Matches found:', {
    roleId,
    roleName: currentRole?.title,
    exactMatches: exactMatchEmployees.map(e => ({
      name: e.name,
      role: e.role,
      roleId: getSkillProfileId(e.role),
      benchmark: e.benchmark
    })),
    partialMatches: partialMatchEmployees.map(e => ({
      name: e.name,
      role: e.role,
      roleId: getSkillProfileId(e.role),
      benchmark: e.benchmark
    }))
  });

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Employees</h2>
        <span className="text-sm text-muted-foreground">
          {exactMatchEmployees.length + partialMatchEmployees.length} total
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EmployeeList 
          title="People with this job"
          employees={exactMatchEmployees}
        />

        <EmployeeList 
          title="People with skills that match this job"
          employees={partialMatchEmployees}
        />
      </div>
    </Card>
  );
};

export const EmployeeOverview = () => {
  return (
    <ToggledSkillsProvider>
      <TrackProvider>
        <EmployeeOverviewContent />
      </TrackProvider>
    </ToggledSkillsProvider>
  );
};