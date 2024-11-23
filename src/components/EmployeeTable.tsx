import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  skillCount: number;
  benchmark: number;
  lastUpdated: string;
  location: string;
  sex: 'male' | 'female';
}

export const employees: Employee[] = [
  {
    id: "123",
    name: "Victor Smith",
    role: "AI Engineer: P4",
    department: "Engineering",
    skillCount: 11, // Updated: 6 specialized + 2 common + 3 certifications
    benchmark: 89,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male"
  },
  {
    id: "124",
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    department: "Engineering",
    skillCount: 11, // Updated: 5 specialized + 3 common + 3 certifications
    benchmark: 85,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female"
  },
  {
    id: "125",
    name: "Anna Vyselva",
    role: "Frontend Developer: P4",
    department: "Engineering",
    skillCount: 11, // Updated: 5 specialized + 3 common + 3 certifications
    benchmark: 74,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female"
  },
  {
    id: "126",
    name: "Suz Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: 10, // Updated: 3 specialized + 4 common + 3 certifications
    benchmark: 68,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male"
  }
];

// Helper function to get skill profile ID from role
const getSkillProfileId = (role: string) => {
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Developer": "125",
    "Engineering Manager": "126"
  };
  
  const baseRole = role.split(":")[0].trim();
  return roleMap[baseRole] || "123"; // Default to AI Engineer if not found
};

export const EmployeeTable = ({ selectedDepartment }: { selectedDepartment: string[] }) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.name));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (name: string) => {
    setSelectedEmployees(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      }
      return [...prev, name];
    });
  };

  // Filter employees based on selected department
  const filteredEmployees = employees.filter(employee => 
    selectedDepartment.length === 0 || selectedDepartment.includes(employee.department)
  );

  return (
    <div className="bg-white rounded-lg">
      <div className="relative">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="h-12 px-4 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={filteredEmployees.length > 0 && selectedEmployees.length === filteredEmployees.length}
                  onChange={handleSelectAll}
                  disabled={filteredEmployees.length === 0}
                />
              </th>
              <th className="h-12 px-4 text-left">
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  Employee Name <ChevronDown className="h-4 w-4" />
                </div>
              </th>
              <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Current Role</th>
              <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Department</th>
              <th className="h-12 px-4 text-center text-sm font-medium text-muted-foreground">Skill Count</th>
              <th className="h-12 px-4 text-center text-sm font-medium text-muted-foreground">Benchmark</th>
              <th className="h-12 px-4 text-right text-sm font-medium text-muted-foreground">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-muted-foreground">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee, index) => (
              <tr key={employee.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedEmployees.includes(employee.name)}
                    onChange={() => handleSelectEmployee(employee.name)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=24&h=24`}
                      alt={employee.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <Link to={`/employee/${employee.id}`} className="text-primary hover:text-primary-accent transition-colors text-sm">
                      {employee.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link 
                    to={`/skills/${getSkillProfileId(employee.role)}`} 
                    className="text-sm text-primary hover:text-primary-accent transition-colors"
                  >
                    {employee.role}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm">{employee.department}</td>
                <td className="px-4 py-4 text-center text-sm">{employee.skillCount}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <span className={`px-2.5 py-1 rounded-full text-sm ${
                      employee.benchmark >= 80 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {employee.benchmark}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-sm text-muted-foreground">
                  {employee.lastUpdated}
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
