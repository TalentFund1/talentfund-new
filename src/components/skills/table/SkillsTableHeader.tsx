import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsTableHeaderProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
}

export const SkillsTableHeader = ({ selectedFilter, setSelectedFilter }: SkillsTableHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-border">
      <h2 className="text-xl font-semibold text-foreground">Skills Intelligence</h2>
      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="All Skills" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="specialized">Specialized Skills</SelectItem>
          <SelectItem value="common">Common Skills</SelectItem>
          <SelectItem value="certification">Certifications</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};