import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";
import { roleSkills } from "./data/roleSkills";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { EMPLOYEE_IMAGES } from "../employee/EmployeeData";

export const SkillProfileEmployees = () => {
  const { id: roleId } = useParams();
  const employees = useEmployeeStore((state) => state.employees);
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  // Get current role data
  const currentRole = roleSkills[roleId as keyof typeof roleSkills];
  const roleName = currentRole?.title || "";

  console.log('SkillProfileEmployees - Current role:', {
    roleId,
    roleName,
    totalEmployees: employees.length
  });

  // Get exact role matches (same role title, any level) and calculate their benchmarks
  const exactMatches = employees
    .filter(emp => {
      const empBaseRole = getBaseRole(emp.role);
      const matchesRole = empBaseRole === roleName;
      console.log('Checking employee match:', {
        employee: emp.name,
        employeeRole: emp.role,
        baseRole: empBaseRole,
        targetRole: roleName,
        isMatch: matchesRole
      });
      return matchesRole;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        getLevel(emp.role),
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark);

  // Get partial matches (different roles but matching skills)
  const partialMatches = employees
    .filter(emp => {
      const isExactMatch = getBaseRole(emp.role) === roleName;
      if (isExactMatch) return false;

      const benchmark = calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        getLevel(emp.role),
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
        getLevel(emp.role),
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark)
    .slice(0, 3);

  console.log('SkillProfileEmployees - Matches found:', {
    roleId,
    roleName,
    exactMatches: exactMatches.map(e => ({
      name: e.name,
      role: e.role,
      benchmark: e.benchmark
    })),
    partialMatches: partialMatches.map(e => ({
      name: e.name,
      role: e.role,
      benchmark: e.benchmark
    }))
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">People with this job</h3>
            <Button 
              variant="link" 
              className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors p-0 h-auto font-medium"
            >
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {exactMatches.map((employee, index) => (
              <div key={employee.name} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <img 
                    src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=32&h=32`} 
                    alt={employee.name} 
                    className="object-cover" 
                  />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
                <span className="ml-auto text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {Math.round(employee.benchmark)}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">People with skills that match this job</h3>
            <Button 
              variant="link" 
              className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors p-0 h-auto font-medium"
            >
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {partialMatches.map((employee, index) => (
              <div key={employee.name} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <img 
                    src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[(index + 2) % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=32&h=32`} 
                    alt={employee.name} 
                    className="object-cover" 
                  />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
                <span className="ml-auto text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {Math.round(employee.benchmark)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};