import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddSkillToProfileDialog } from "../../skills/dialog/AddSkillToProfileDialog";

interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedInterest: string;
  setSelectedInterest: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  showAddSkill?: boolean;
}

export const SkillsMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedCategory,
  setSelectedCategory,
  showAddSkill = false
}: SkillsMatrixFiltersProps) => {
  console.log('SkillsMatrixFilters - Current selections:', {
    level: selectedLevel,
    interest: selectedInterest,
    category: selectedCategory,
    showAddSkill
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="specialized">Specialized Skills</SelectItem>
              <SelectItem value="common">Common Skills</SelectItem>
              <SelectItem value="certification">Certifications</SelectItem>
            </SelectContent>
          </Select>

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
              <SelectValue placeholder="Skill Interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Interests</SelectItem>
              <SelectItem value="required">Skill Goal</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {showAddSkill && <AddSkillToProfileDialog />}
      </div>
    </div>
  );
};