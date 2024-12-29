import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsTableFilterProps {
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

export const SkillsTableFilter = ({ selectedFilter, onFilterChange }: SkillsTableFilterProps) => {
  return (
    <div className="px-6 py-4 border-b border-border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Skills Intelligence</h2>
      </div>
    </div>
  );
};