import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  addSkillButton: React.ReactNode;
}

export const SkillsMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  addSkillButton,
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-4">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skill Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {addSkillButton}
    </div>
  );
};