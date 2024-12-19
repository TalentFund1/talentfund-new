interface SkillsTableFilterProps {
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

export const SkillsTableFilter = ({ selectedFilter, onFilterChange }: SkillsTableFilterProps) => {
  return (
    <div className="px-6 py-4 border-b border-border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
      </div>
    </div>
  );
};