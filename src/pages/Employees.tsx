import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { EmployeeTable } from "@/components/EmployeeTable";
import { TablePagination } from "@/components/TablePagination";
import { useState } from "react";
import { employees } from "@/components/EmployeeTable";

const Employees = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);

  // Calculate female percentage from the employees data
  const calculateFemalePercentage = () => {
    const femaleCount = employees.filter(emp => emp.sex === 'female').length;
    const totalCount = employees.length;
    return Math.round((femaleCount / totalCount) * 100);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add Employee</Button>
            </div>
          </div>

          <Card className="p-6">
            <EmployeeFilters 
              onDepartmentChange={setSelectedDepartment}
              selectedDepartment={selectedDepartment}
              onJobTitleChange={setSelectedJobTitle}
              selectedJobTitle={selectedJobTitle}
              onLevelChange={setSelectedLevel}
              selectedLevel={selectedLevel}
            />
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Number of Employees"
              value="112"
              icon={<Users className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Added in Past 1 year"
              value="24"
              icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Share of Female Employees"
              value={`${calculateFemalePercentage()}%`}
              icon={<Equal className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Average Tenure (Years)"
              value="1.9"
              icon={<Clock className="h-6 w-6 text-primary-icon" />}
            />
          </div>

          <Card className="p-6">
            <EmployeeTable 
              selectedDepartment={selectedDepartment}
              selectedJobTitle={selectedJobTitle}
              selectedLevel={selectedLevel}
            />
            <Separator className="my-4" />
            <TablePagination />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;