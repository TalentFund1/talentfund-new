import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedWeight: string;
  setSelectedWeight: (weight: string) => void;
  addSkillButton: React.ReactNode;
}

export const SkillsMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedCategory,
  setSelectedCategory,
  selectedWeight,
  setSelectedWeight,
  addSkillButton,
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skill Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Types</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
            <SelectItem value="certification">Certification</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedWeight} onValueChange={setSelectedWeight}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skill Weights" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Weights</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="necessary">Necessary</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skill Interests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Interests</SelectItem>
            <SelectItem value="skill_goal">Skill Goal</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

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