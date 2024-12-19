import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useBenchmarkSearch } from "@/components/skills/context/BenchmarkSearchContext";

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedInterest: string;
  setSelectedInterest: (value: string) => void;
}

export const SkillsMatrixFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
}: SkillsMatrixFiltersProps) => {
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
        <Button className="bg-[#1F2144] hover:bg-[#1F2144]/90">
          <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
            <Plus className="h-3 w-3 stroke-[2]" />
          </div>
          <span className="ml-2 text-sm font-medium">Add Skill</span>
        </Button>
      </div>
    </div>
  );
};