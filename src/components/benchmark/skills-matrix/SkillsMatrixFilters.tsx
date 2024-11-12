import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SkillsMatrixFilters = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex gap-4 items-center mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm bg-white"
        />
      </div>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="specialized">Specialized Skills</SelectItem>
          <SelectItem value="common">Common Skills</SelectItem>
          <SelectItem value="certification">Certification</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};