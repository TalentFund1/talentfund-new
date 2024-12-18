import { StatCard } from "@/components/StatCard";
import { SkillsOverview } from "@/components/SkillsOverview";
import { Sidebar } from "@/components/Sidebar";
import { Users, UserPlus, TrendingUp, Award } from "lucide-react";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { getSkillProfileId } from "@/components/EmployeeTable";
import { CompanySkillsTable } from "@/components/skills/CompanySkillsTable";
import { EmployeeSkillsTable } from "@/components/skills/EmployeeSkillsTable";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const Index = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const selectedRole = "Frontend Engineer";
  const roleId = getSkillProfileId(selectedRole);

  const exactMatches = employees.filter(
    employee => getSkillProfileId(employee.role) === roleId
  );

  const totalExactMatches = exactMatches.length;
  const addedLastYear = exactMatches.filter(
    emp => emp.startDate && new Date(emp.startDate) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  ).length;
  
  const femaleEmployees = exactMatches.filter(emp => emp.sex === 'female');
  const femalePercentage = totalExactMatches > 0 
    ? Math.round((femaleEmployees.length / totalExactMatches) * 100)
    : 0;

  const tenureSum = exactMatches.reduce((sum, emp) => {
    if (emp.startDate) {
      const startDate = new Date(emp.startDate);
      const tenure = (Date.now() - startDate.getTime()) / (365 * 24 * 60 * 60 * 1000);
      return sum + tenure;
    }
    return sum;
  }, 0);
  
  const averageTenure = totalExactMatches > 0 
    ? (tenureSum / totalExactMatches).toFixed(1)
    : "0.0";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-foreground">Skills Intelligence Dashboard</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Number of Employees"
                value={totalExactMatches}
                icon={<Users className="h-6 w-6 text-primary-icon" />}
              />
              <StatCard
                title="Added in Past 1 Year"
                value={addedLastYear}
                icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
              />
              <StatCard
                title="Share of Female Employees"
                value={`${femalePercentage}%`}
                icon={<TrendingUp className="h-6 w-6 text-primary-icon" />}
              />
              <StatCard
                title="Average Tenure (Years)"
                value={averageTenure}
                icon={<Award className="h-6 w-6 text-primary-icon" />}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <SkillsOverview />
            </div>
          </div>

          <ToggledSkillsProvider>
            <div className="space-y-6">
              <CompanySkillsTable />
              <EmployeeSkillsTable />
            </div>
          </ToggledSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default Index;