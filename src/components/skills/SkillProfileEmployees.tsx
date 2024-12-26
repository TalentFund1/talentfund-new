import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId, getBaseRole } from "../EmployeeTable";
import { roleSkills } from "./data/roleSkills";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { EMPLOYEE_IMAGES } from "../employee/EmployeeData";
import { useNavigate } from "react-router-dom";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";

export const SkillProfileEmployees = () => {
  const { id: roleId } = useParams();
  const navigate = useNavigate();
  const employees = useEmployeeStore((state) => state.employees);
  const { getSkillState } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkillsStore = useEmployeeSkillsStore();

  // Get exact role matches (same role ID, any level)
  const exactMatches = employees
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
        getBaseRole(emp.role),
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark);

  // Get partial matches (different roles but matching skills)
  const partialMatches = employees
    .filter(emp => {
      const empRoleId = getSkillProfileId(emp.role);
      if (empRoleId === roleId) return false;

      const benchmark = calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        getBaseRole(emp.role),
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      );

      return benchmark > 70;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        getBaseRole(emp.role),
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark)
    .slice(0, 3);

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}?tab=benchmark`);
  };

  const renderEmployeeList = (employee: typeof employees[0] & { benchmark: number }, index: number) => {
    return (
      <div 
        key={employee.name} 
        className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer group"
      >
        <Avatar className="h-10 w-10">
          <img 
            src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=32&h=32`} 
            alt={employee.name} 
            className="object-cover" 
          />
        </Avatar>
        <div>
          <p 
            onClick={() => handleEmployeeClick(employee.id)}
            className="font-medium text-sm text-primary group-hover:text-primary-accent transition-colors cursor-pointer hover:underline"
          >
            {employee.name}
          </p>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
        </div>
        <span className="ml-auto text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
          {Math.round(employee.benchmark)}%
        </span>
      </div>
    );
  };

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
            {exactMatches.map((employee, index) => renderEmployeeList(employee, index))}
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
            {partialMatches.map((employee, index) => renderEmployeeList(employee, index))}
          </div>
        </Card>
      </div>
    </div>
  );
};
