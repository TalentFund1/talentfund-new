import { SearchFilter } from '@/components/market/SearchFilter';
import { employees } from '../EmployeeTable';

interface EmployeeSearchProps {
  onEmployeeSearch: (employees: string[]) => void;
  selectedEmployees: string[];
}

export const EmployeeSearch = ({ onEmployeeSearch, selectedEmployees }: EmployeeSearchProps) => {
  // Get unique employee names
  const employeeNames = Array.from(new Set(employees.map(emp => emp.name)));

  return (
    <div className="w-full">
      <SearchFilter
        label=""
        placeholder="Search Employee..."
        items={employeeNames}
        selectedItems={selectedEmployees}
        onItemsChange={onEmployeeSearch}
        singleSelect={false}
      />
    </div>
  );
};