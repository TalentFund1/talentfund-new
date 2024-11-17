import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BenchmarkMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
}

export const BenchmarkMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
}: BenchmarkMatrixFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="unspecified">Unspecified</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Interests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            <SelectItem value="required">Skill Goal</SelectItem>
            <SelectItem value="not-interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};