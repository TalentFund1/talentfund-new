interface EmployeeTableHeaderProps {
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
  hasEmployees: boolean;
  hasSelectedSkills?: boolean;
}

export const EmployeeTableHeader = ({ 
  onSelectAll, 
  isAllSelected, 
  hasEmployees,
  hasSelectedSkills = false 
}: EmployeeTableHeaderProps) => {
  return (
    <tr className="border-b border-border">
      <th className="h-12 px-4 text-left">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={hasEmployees && isAllSelected}
          onChange={onSelectAll}
          disabled={!hasEmployees}
        />
      </th>
      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Employee Name</th>
      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Current Role</th>
      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Role ID</th>
      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Department</th>
      <th className="h-12 px-4 text-center text-sm font-medium text-muted-foreground">Role Match</th>
      <th className="h-12 px-4 text-center text-sm font-medium text-muted-foreground">Benchmark</th>
      {hasSelectedSkills && (
        <th className="h-12 px-4 text-center text-sm font-medium text-muted-foreground">Skill Match</th>
      )}
      <th className="h-12 px-4 text-right text-sm font-medium text-muted-foreground">Last Updated</th>
    </tr>
  );
};