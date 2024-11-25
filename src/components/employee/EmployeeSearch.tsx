import { SearchFilter } from '@/components/market/SearchFilter';
import { useEmployeeStore } from './store/employeeStore';

interface EmployeeSearchProps {
  onEmployeeSearch: (employees: string[]) => void;
  selectedEmployees: string[];
}

export const EmployeeSearch = ({ onEmployeeSearch, selectedEmployees }: EmployeeSearchProps) => {
  const employees = useEmployeeStore((state) => state.employees);
  
  // Get unique employee names
  const employeeNames = Array.from(new Set(employees.map(emp => emp.name)));

  return (
    <div className="w-full">
      <SearchFilter
        label=""
        placeholder="Search Employee..."
        items={employeeNames}
        selectedItems={selectedEmployees}
        onItemsChange={(items) => onEmployeeSearch(items.map(item => String(item)))}
        singleSelect={false}
      />
    </div>
  );
};