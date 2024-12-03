import React from "react";
import { Employee } from "../../types/employeeTypes";
import { EmployeeTableHeader } from "../EmployeeTableHeader";
import { EmployeeTableRow } from "../EmployeeTableRow";
import { EMPLOYEE_IMAGES } from "../EmployeeData";

interface EmployeeTableContentProps {
  filteredEmployees: (Employee & { benchmark?: number })[];
  selectedRows: string[];
  handleSelectAll: (employees: Employee[], e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectEmployee: (name: string) => void;
  selectedSkills: string[];
  selectedRole: string[];
}

export const EmployeeTableContent: React.FC<EmployeeTableContentProps> = ({
  filteredEmployees,
  selectedRows,
  handleSelectAll,
  handleSelectEmployee,
  selectedSkills,
  selectedRole
}) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="relative">
        <table className="w-full">
          <thead>
            <EmployeeTableHeader 
              onSelectAll={(e) => handleSelectAll(filteredEmployees, e)}
              isAllSelected={filteredEmployees.length > 0 && selectedRows.length === filteredEmployees.length}
              hasEmployees={filteredEmployees.length > 0}
              hasSelectedSkills={selectedSkills.length > 0}
            />
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={selectedSkills.length > 0 ? 6 : 5} className="text-center py-4 text-muted-foreground">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee, index) => (
                <EmployeeTableRow
                  key={employee.id}
                  employee={employee}
                  isSelected={selectedRows.includes(employee.name)}
                  onSelect={handleSelectEmployee}
                  imageUrl={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=24&h=24`}
                  selectedSkills={selectedSkills}
                  selectedJobTitle={selectedRole}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};