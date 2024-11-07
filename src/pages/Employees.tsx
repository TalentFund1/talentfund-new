import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Users, Briefcase, Equal, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeTable } from "@/components/EmployeeTable";

const Employees = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add Employee</Button>
            </div>
          </div>

          <Card className="p-6 shadow-sm">
            <div className="space-y-4">
              <Input 
                id="search" 
                type="search" 
                placeholder="Search employees..." 
                className="max-w-sm bg-white" 
              />
              
              <div className="flex flex-wrap gap-4">
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">P1</SelectItem>
                    <SelectItem value="p2">P2</SelectItem>
                    <SelectItem value="p3">P3</SelectItem>
                    <SelectItem value="p4">P4</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Clear All</Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Employees"
              value="124"
              icon={<Users className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Open Positions"
              value="5"
              icon={<Briefcase className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Female Employees"
              value="50%"
              icon={<Equal className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Average Tenure"
              value="1.09"
              icon={<Clock className="h-6 w-6 text-primary-icon" />}
            />
          </div>

          <Card className="shadow-sm">
            <EmployeeTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;