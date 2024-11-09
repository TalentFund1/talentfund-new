import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  avatar: string;
  role: string;
  department: string;
  skillCount: number;
  benchmark: number;
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    skillCount: 12,
    benchmark: 89,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Product Manager",
    department: "Product",
    skillCount: 8,
    benchmark: 76,
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "UX Designer",
    department: "Design",
    skillCount: 10,
    benchmark: 85,
  },
  {
    id: 4,
    name: "David Smith",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Data Scientist",
    department: "Analytics",
    skillCount: 7,
    benchmark: 73,
  },
  {
    id: 5,
    name: "Linda Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Product Owner",
    department: "Product",
    skillCount: 9,
    benchmark: 80,
  },
  {
    id: 6,
    name: "James Brown",
    avatar: "https://i.pravatar.cc/150?img=6",
    role: "Software Engineer",
    department: "Engineering",
    skillCount: 11,
    benchmark: 78,
  },
  {
    id: 7,
    name: "Patricia White",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "Marketing Specialist",
    department: "Marketing",
    skillCount: 6,
    benchmark: 70,
  },
  {
    id: 8,
    name: "Robert Green",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "Business Analyst",
    department: "Business",
    skillCount: 8,
    benchmark: 75,
  },
  {
    id: 9,
    name: "Elizabeth Taylor",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Frontend Engineer",
    department: "Engineering",
    skillCount: 10,
    benchmark: 82,
  },
  {
    id: 10,
    name: "Michael Anderson",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "Content Writer",
    department: "Content",
    skillCount: 5,
    benchmark: 72,
  },
];

export const EmployeeTable = () => {
  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-background/80">
              <th className="px-4 py-4 text-left text-sm font-semibold">Employee</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Role</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Department</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">Skills</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">Benchmark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-background/40 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <Link to="/employee-profile" className="text-primary hover:text-primary-accent transition-colors text-sm">
                      {employee.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">{employee.role}</td>
                <td className="px-4 py-4 text-sm">{employee.department}</td>
                <td className="px-4 py-4 text-center text-sm">{employee.skillCount}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <span className={`px-2.5 py-1 rounded-2xl text-sm ${
                      employee.benchmark >= 80 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {employee.benchmark}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">20</span> results
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
