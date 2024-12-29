import { TableRow } from "@/components/ui/table";
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
  console.log('Rendering EmployeeTableRow:', {
    employeeId: employee.id,
    selectedSkills,
    selectedJobTitle
  });

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