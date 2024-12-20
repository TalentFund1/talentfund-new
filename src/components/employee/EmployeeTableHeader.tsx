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
      <th className="h-12 px-4 text-left w-[48px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={hasEmployees && isAllSelected}
          onChange={onSelectAll}
          disabled={!hasEmployees}
        />
      </th>
      <th className="h-12 px-6 text-left text-sm font-medium text-muted-foreground w-[200px]">Employee Name</th>
      <th className="h-12 px-6 text-left text-sm font-medium text-muted-foreground w-[250px]">Current Role</th>
      {!hasSelectedSkills && (
        <th className="h-12 px-6 text-left text-sm font-medium text-muted-foreground w-[150px]">Department</th>
      )}
      <th className="h-12 px-6 text-center text-sm font-medium text-muted-foreground w-[120px]">Skill Match</th>
      {!hasSelectedSkills && (
        <th className="h-12 px-6 text-center text-sm font-medium text-muted-foreground w-[120px]">Benchmark</th>
      )}
      {hasSelectedSkills && (
        <>
          <th className="h-12 px-6 text-left text-sm font-medium text-muted-foreground w-[400px]">Skills</th>
          <th className="h-12 px-6 text-left text-sm font-medium text-muted-foreground w-[400px]">Adjacent Skills</th>
        </>
      )}
      <th className="h-12 px-6 text-right text-sm font-medium text-muted-foreground w-[140px]">Last Updated</th>
    </tr>
  );
};