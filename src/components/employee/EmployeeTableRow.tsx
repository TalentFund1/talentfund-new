import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";
import { employeeSkillService } from "../../services/employee/EmployeeSkillService";
import { EmployeeBasicInfo } from "./table/EmployeeBasicInfo";
import { EmployeeBenchmark } from "./table/EmployeeBenchmark";
import { EmployeeSkillMatch } from "./table/EmployeeSkillMatch";

interface EmployeeTableRowProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
  selectedSkills?: string[];
  selectedJobTitle?: string[];
}

export const EmployeeTableRow = ({ 
  employee, 
  isSelected, 
  onSelect, 
  imageUrl,
  selectedSkills = [],
  selectedJobTitle = []
}: EmployeeTableRowProps) => {
  const isExactMatch = selectedJobTitle.length > 0 && 
    getSkillProfileId(employee.role) === getSkillProfileId(selectedJobTitle[0]);

  console.log('Rendering EmployeeTableRow:', {
    employeeName: employee.name,
    employeeRole: employee.role,
    isExactMatch,
    selectedSkills,
    selectedJobTitle
  });

  return (
    <tr className={`group border-t border-border hover:bg-muted/50 transition-colors w-full ${
      isExactMatch && selectedJobTitle.length > 0 ? 'bg-blue-50/50' : ''
    }`}>
      <EmployeeBasicInfo
        id={employee.id}
        name={employee.name}
        role={employee.role}
        imageUrl={imageUrl}
        isExactMatch={isExactMatch}
        selectedJobTitle={selectedJobTitle}
      />
      
      {selectedSkills.length === 0 && (
        <>
          <td className="px-6 py-4 w-[150px] text-sm">{employee.department}</td>
          <td className="px-12 py-4 text-center w-[120px]">
            <span className="text-sm text-muted-foreground font-medium">
              {employee.skillCount}
            </span>
          </td>
          <EmployeeBenchmark benchmark={employee.benchmark || 0} />
          <td className="px-6 py-4 text-right w-[140px] text-sm text-muted-foreground">
            {employee.lastUpdated}
          </td>
        </>
      )}

      {selectedSkills.length > 0 && (
        <EmployeeSkillMatch
          employeeId={employee.id}
          selectedSkills={selectedSkills}
        />
      )}
    </tr>
  );
};