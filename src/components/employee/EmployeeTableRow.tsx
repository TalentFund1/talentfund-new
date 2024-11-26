import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";

interface EmployeeTableRowProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
}

export const EmployeeTableRow = ({ 
  employee, 
  isSelected, 
  onSelect, 
  imageUrl,
}: EmployeeTableRowProps) => {
  return (
    <tr className="border-t border-border hover:bg-muted/50 transition-colors">
      <td className="px-4 py-4 w-[48px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(employee.name)}
        />
      </td>
      <td className="px-4 py-4 w-[200px]">
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
      <td className="px-4 py-4 w-[250px]">
        <span className="text-sm">{employee.role}</span>
      </td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};