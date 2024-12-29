import { TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { getSkillProfileId } from "./utils/profileUtils";
import { EmployeeTableRowProps } from "./types/tableTypes";
import { EmployeeBasicInfo } from "./table/EmployeeBasicInfo";

export const EmployeeTableRow = ({ 
  employee,
  isSelected,
  onSelect,
  imageUrl,
  selectedSkills,
  selectedJobTitle
}: Readonly<EmployeeTableRowProps>) => {
  return (
    <TableRow>
      <EmployeeBasicInfo
        id={employee.id}
        name={employee.name}
        role={employee.role}
        imageUrl={imageUrl}
        isExactMatch={isSelected}
        selectedJobTitle={selectedJobTitle}
      />
      <td className="px-6 py-4">{employee.department}</td>
      <td className="px-12 text-center">{employee.skillCount}</td>
      <td className="px-6 text-center">{employee.benchmark.toFixed(1)}%</td>
      <td className="px-6 text-right text-muted-foreground">{employee.lastUpdated}</td>
    </TableRow>
  );
};