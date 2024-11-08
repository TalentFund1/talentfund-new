import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

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
    <div className="relative overflow-x-auto rounded-lg border border-blue-200/60">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="hover:bg-transparent border-y border-blue-200/60">
            <TableHead className="w-[5%] border-x border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableHead>
            <TableHead className="w-[22%] border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              <div className="flex items-center gap-1">
                Employee Name <ChevronDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="w-[18%] border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Current Role
            </TableHead>
            <TableHead className="w-[14%] border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Department
            </TableHead>
            <TableHead className="w-[14%] text-center border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Skill Count
            </TableHead>
            <TableHead className="w-[14%] text-center border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Benchmark
            </TableHead>
            <TableHead className="w-[13%] text-right border-r border-blue-200/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 text-sm font-semibold">
              Last Updated
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow 
              key={employee.name} 
              className="group transition-all duration-200 hover:bg-muted/50 border-b border-blue-200/60"
            >
              <TableCell className="border-x border-blue-200/60 group-hover:bg-transparent py-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableCell>
              <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index]}?auto=format&fit=crop&w=24&h=24`}
                    alt={employee.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <Link to="/employee-profile" className="text-primary hover:underline text-sm">
                    {employee.name}
                  </Link>
                </div>
              </TableCell>
              <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-sm">
                {employee.role}
              </TableCell>
              <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-sm">
                {employee.department}
              </TableCell>
              <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4 text-sm">
                {employee.skillCount}
              </TableCell>
              <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
                <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  employee.benchmark >= 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {employee.benchmark}%
                </span>
              </TableCell>
              <TableCell className="text-right border-r border-blue-200/60 group-hover:bg-transparent py-4 text-sm text-muted-foreground">
                {employee.lastUpdated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};