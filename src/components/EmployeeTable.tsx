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
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[4%] pl-4">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableHead>
          <TableHead className="w-[22%]">
            <div className="flex items-center gap-1">
              Employee Name <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="w-[20%]">Current Role</TableHead>
          <TableHead className="w-[15%]">Department</TableHead>
          <TableHead className="w-[12%] text-center">Skill Count</TableHead>
          <TableHead className="w-[15%] text-center">Benchmark</TableHead>
          <TableHead className="w-[12%] text-right pr-6">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee, index) => (
          <TableRow key={employee.name}>
            <TableCell className="pl-4">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableCell>
            <TableCell className="flex items-center gap-3">
              <img 
                src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index]}?auto=format&fit=crop&w=32&h=32`}
                alt={employee.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <Link to="/employee-profile" className="text-primary hover:underline font-medium">
                {employee.name}
              </Link>
            </TableCell>
            <TableCell className="font-medium">{employee.role}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell className="text-center">{employee.skillCount}</TableCell>
            <TableCell>
              <div className="flex justify-center">
                <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                  employee.benchmark >= 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {employee.benchmark}%
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right pr-6 text-muted-foreground">
              {employee.lastUpdated}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};