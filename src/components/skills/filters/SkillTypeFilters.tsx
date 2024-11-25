import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SkillTypeFiltersProps {
  skillType: string;
  setSkillType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export const SkillTypeFilters = ({
  skillType,
  setSkillType,
  sortBy,
  setSortBy,
}: SkillTypeFiltersProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-3">
        <Select value={skillType} onValueChange={setSkillType}>
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

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[220px] bg-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sort by All</SelectItem>
            <SelectItem value="baseline">Sort by Baseline</SelectItem>
            <SelectItem value="recommended">Sort by Recommended</SelectItem>
            <SelectItem value="benchmark">Sort by Market Benchmark</SelectItem>
            <SelectItem value="occupation">Sort by Occupation</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};