import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BenchmarkSkillsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
}

export const BenchmarkSkillsFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
}: BenchmarkSkillsFiltersProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Filter by Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedInterest} onValueChange={setSelectedInterest}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Filter by Interest" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Interests</SelectItem>
          <SelectItem value="skill_goal">Skill Goals</SelectItem>
          <SelectItem value="required">Required</SelectItem>
          <SelectItem value="preferred">Preferred</SelectItem>
          <SelectItem value="not_interested">Not Interested</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedSkillLevel} onValueChange={setSelectedSkillLevel}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Filter by Skill Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Skill Levels</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};