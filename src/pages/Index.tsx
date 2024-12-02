import { StatCard } from "@/components/StatCard";
import { SkillsOverview } from "@/components/SkillsOverview";
import { Sidebar } from "@/components/Sidebar";
import { Users, UserPlus, TrendingUp, Award } from "lucide-react";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";

const Index = () => {
  const employees = useEmployeeStore((state) => state.employees);

  // Calculate total employees
  const totalEmployees = employees.length;

  // Calculate employees added in the last year
  const addedLastYear = employees.filter(emp => {
    if (!emp.startDate) return false;
    const startDate = new Date(emp.startDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return startDate >= oneYearAgo;
  }).length;

  // Calculate female percentage
  const femaleEmployees = employees.filter(emp => emp.sex === 'female');
  const femalePercentage = totalEmployees > 0 
    ? Math.round((femaleEmployees.length / totalEmployees) * 100)
    : 0;

  // Calculate average tenure
  const tenureSum = employees.reduce((sum, emp) => {
    if (emp.startDate) {
      const startDate = new Date(emp.startDate);
      const tenure = (Date.now() - startDate.getTime()) / (365 * 24 * 60 * 60 * 1000);
      return sum + tenure;
    }
    return sum;
  }, 0);
  
  const averageTenure = totalEmployees > 0 
    ? Number((tenureSum / totalEmployees).toFixed(1))
    : 0;

  console.log('Dashboard Statistics:', {
    totalEmployees,
    addedLastYear,
    femalePercentage,
    averageTenure,
    employees: employees.map(e => ({
      name: e.name,
      startDate: e.startDate,
      sex: e.sex
    }))
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Skills Intelligence Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Number of Employees"
              value={totalEmployees}
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

          <div className="grid grid-cols-1 gap-6">
            <SkillsOverview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;