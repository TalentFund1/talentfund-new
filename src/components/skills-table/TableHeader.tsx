import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TableHeaderProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
}

export const TableHeader = ({ selectedFilter, setSelectedFilter }: TableHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skills" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};