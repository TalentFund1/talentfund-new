import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillProfileMatrixFiltersProps {
  skillType: string;
  setSkillType: (type: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const SkillProfileMatrixFilters = ({
  skillType,
  setSkillType,
  sortBy,
  setSortBy
}: SkillProfileMatrixFiltersProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Select value={skillType} onValueChange={setSkillType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="specialized">Specialized</SelectItem>
          <SelectItem value="common">Common</SelectItem>
          <SelectItem value="certification">Certification</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by Market Benchmark" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="benchmark">Sort by Market Benchmark</SelectItem>
          <SelectItem value="growth">Sort by Growth</SelectItem>
          <SelectItem value="salary">Sort by Salary</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};