import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { employees, EMPLOYEE_IMAGES } from "../employee/EmployeeData";
import { getBaseRole } from "../EmployeeTable";
import { useNavigate, useParams } from "react-router-dom";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { TrackProvider } from "./context/TrackContext";

const EmployeeOverviewContent = () => {
  const { id: roleId } = useParams();
  const navigate = useNavigate();
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  // Get employees with exact role match and calculate their benchmarks
  const exactMatchEmployees = employees
    .filter(emp => getBaseRole(emp.role) === getBaseRole(employees.find(e => e.id === roleId)?.role || ""))
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "123",
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark); // Sort by benchmark in descending order

  // Get employees with partial matches and sort by benchmark
  const partialMatchEmployees = employees
    .filter(emp => {
      const isExactMatch = getBaseRole(emp.role) === getBaseRole(employees.find(e => e.id === roleId)?.role || "");
      if (isExactMatch) return false;

      const benchmark = calculateBenchmarkPercentage(
        emp.id,
        roleId || "123",
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );

      return benchmark > 0;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "123",
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark); // Sort by benchmark in descending order

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}?tab=benchmark`);
  };

  const renderEmployeeList = (employee: typeof employees[0] & { benchmark: number }, index: number) => {
    return (
      <div 
        key={employee.name} 
        className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
      >
        <Avatar className="h-10 w-10 border-2 border-border">
          <img 
            src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=96&h=96`}
            alt={employee.name}
            className="object-cover"
          />
        </Avatar>
        <div className="flex-1 min-w-0">
          <p 
            onClick={() => handleEmployeeClick(employee.id)}
            className="font-medium text-primary truncate group-hover:text-primary-accent transition-colors cursor-pointer hover:underline"
          >
            {employee.name}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {employee.role}
          </p>
        </div>
        <span className="text-sm px-2.5 py-1 bg-green-100 text-green-800 rounded-full font-medium">
          {Math.round(employee.benchmark)}%
        </span>
      </div>
    );
  };

  return (
    <Card className="p-6 space-y-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Employees</h2>
        <span className="text-sm text-muted-foreground">
          {exactMatchEmployees.length + partialMatchEmployees.length} total
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4 border border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-muted-foreground">People with this job</h3>
            <Button 
              variant="link" 
              className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors p-0 h-auto font-medium"
            >
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {exactMatchEmployees.map((employee, index) => renderEmployeeList(employee, index))}
          </div>
        </Card>

        <Card className="p-6 space-y-4 border border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-muted-foreground">People with skills that match this job</h3>
            <Button 
              variant="link" 
              className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors p-0 h-auto font-medium"
            >
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {partialMatchEmployees.map((employee, index) => renderEmployeeList(employee, index))}
          </div>
        </Card>
      </div>
    </Card>
  );
};

export const EmployeeOverview = () => {
  return (
    <TrackProvider>
      <EmployeeOverviewContent />
    </TrackProvider>
  );
};
