import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId } from "../EmployeeTable";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { ToggledSkillsProvider } from "./context/ToggledSkillsContext";
import { TrackProvider } from "./context/TrackContext";
import { EmployeeList } from "./overview/EmployeeList";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";

const EmployeeOverviewContent = () => {
  const { id: roleId } = useParams();
  const { getSkillState } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employees = useEmployeeStore((state) => state.employees);
  const employeeSkillsStore = useEmployeeSkillsStore();

  // Get exact role matches (same role ID)
  const exactMatchEmployees = employees
    .filter(emp => {
      const employeeRoleId = getSkillProfileId(emp.role);
      const isMatch = employeeRoleId === roleId;
      
      console.log('Checking exact role match:', {
        employee: emp.name,
        employeeRole: emp.role,
        employeeRoleId,
        targetRoleId: roleId,
        isMatch
      });
      
      return isMatch;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark);

  console.log('EmployeeOverview - Exact matches:', {
    roleId,
    matchCount: exactMatchEmployees.length,
    matches: exactMatchEmployees.map(e => ({
      name: e.name,
      role: e.role,
      roleId: getSkillProfileId(e.role),
      benchmark: e.benchmark
    }))
  });

  // Get partial matches (different roles but high skill match)
  const partialMatchEmployees = employees
    .filter(emp => {
      const employeeRoleId = getSkillProfileId(emp.role);
      
      // Skip if this employee has an exact role match
      if (employeeRoleId === roleId) {
        console.log('Skipping partial match - exact match found:', {
          employee: emp.name,
          employeeRole: emp.role,
          employeeRoleId,
          targetRoleId: roleId
        });
        return false;
      }

      const benchmark = calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      );

      console.log('Checking partial match:', {
        employee: emp.name,
        employeeRole: emp.role,
        employeeRoleId,
        targetRoleId: roleId,
        benchmark
      });

      return benchmark > 70;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark)
    .slice(0, 3);

  console.log('EmployeeOverview - Partial matches:', {
    roleId,
    matchCount: partialMatchEmployees.length,
    matches: partialMatchEmployees.map(e => ({
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
