import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { TrackProvider } from "./context/TrackContext";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId } from "../EmployeeTable";
import { roleSkills } from "./data/roleSkills";
import { EMPLOYEE_IMAGES } from "../employee/EmployeeData";

const EmployeeOverviewContent = () => {
  const { id: roleId } = useParams();
  const navigate = useNavigate();
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
            {exactMatchEmployees.length === 0 && (
              <p className="text-sm text-muted-foreground">No exact role matches found</p>
            )}
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
            {partialMatchEmployees.length === 0 && (
              <p className="text-sm text-muted-foreground">No skill matches found</p>
            )}
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