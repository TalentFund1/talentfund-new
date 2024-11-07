import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

interface Employee {
  name: string;
  role: string;
  department: string;
  skillCount: number;
  benchmark: number;
  lastUpdated: string;
}

const employees: Employee[] = [
  {
    name: "Victor Smith",
    role: "AI Engineer: P4",
    department: "Engineering",
    skillCount: 16,
    benchmark: 89,
    lastUpdated: "10/20/24"
  },
  {
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    department: "Engineering",
    skillCount: 12,
    benchmark: 85,
    lastUpdated: "10/20/24"
  },
  {
    name: "Anna Vyselva",
    role: "Frontend Developer: P4",
    department: "Engineering",
    skillCount: 17,
    benchmark: 74,
    lastUpdated: "10/20/24"
  },
  {
    name: "Suz Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: 11,
    benchmark: 68,
    lastUpdated: "10/20/24"
  }
];

export const EmployeeTable = () => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border bg-secondary">
            <TableHead className="w-[40px]">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableHead>
            <TableHead className="w-[250px]">
              <div className="flex items-center gap-1">
                Employee Name <ChevronDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[200px]">Current Role</TableHead>
            <TableHead className="w-[150px]">Department</TableHead>
            <TableHead className="w-[100px] text-center">Skill Count</TableHead>
            <TableHead className="w-[120px] text-center">Benchmark</TableHead>
            <TableHead className="w-[120px] text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={employee.name} className="border-b border-border hover:bg-secondary/50">
              <TableCell className="w-[40px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img 
                    src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index]}?auto=format&fit=crop&w=32&h=32`}
                    alt={employee.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <Link to="/employee-profile" className="text-primary hover:underline font-medium">
                    {employee.name}
                  </Link>
                </div>
              </TableCell>
              <TableCell className="font-medium">{employee.role}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell className="text-center">{employee.skillCount}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    employee.benchmark >= 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {employee.benchmark}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {employee.lastUpdated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};