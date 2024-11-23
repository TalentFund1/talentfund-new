import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";

interface EmployeeTableRowProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
}

export const EmployeeTableRow = ({ employee, isSelected, onSelect, imageUrl }: EmployeeTableRowProps) => {
  return (
    <tr className="border-t border-border hover:bg-muted/50 transition-colors">
      <td className="px-4 py-4">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(employee.name)}
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <img 
            src={imageUrl}
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
  );
};