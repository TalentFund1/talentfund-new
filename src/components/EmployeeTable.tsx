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
    <div className="bg-white rounded-lg">
      <div className="relative">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="h-10 px-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="h-10 px-3 text-left">
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  Employee Name <ChevronDown className="h-3 w-3" />
                </div>
              </th>
              <th className="h-10 px-3 text-left text-xs font-medium text-muted-foreground">Current Role</th>
              <th className="h-10 px-3 text-left text-xs font-medium text-muted-foreground">Department</th>
              <th className="h-10 px-3 text-center text-xs font-medium text-muted-foreground">Skill Count</th>
              <th className="h-10 px-3 text-center text-xs font-medium text-muted-foreground">Benchmark</th>
              <th className="h-10 px-3 text-right text-xs font-medium text-muted-foreground">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.name} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-3 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index]}?auto=format&fit=crop&w=24&h=24`}
                      alt={employee.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <Link to="/employee-profile" className="text-primary hover:underline text-xs">
                      {employee.name}
                    </Link>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs">{employee.role}</td>
                <td className="px-3 py-3 text-xs">{employee.department}</td>
                <td className="px-3 py-3 text-center text-xs">{employee.skillCount}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      employee.benchmark >= 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {employee.benchmark}%
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 text-right text-xs text-muted-foreground">
                  {employee.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};