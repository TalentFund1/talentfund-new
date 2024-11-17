import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';

interface SkillsMatrixFilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedInterest: string;
  setSelectedInterest: (value: string) => void;
  matrixSearchSkills: string[];
  setMatrixSearchSkills: (skills: string[]) => void;
}

export const SkillsMatrixFilterSection = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  matrixSearchSkills,
  setMatrixSearchSkills
}: SkillsMatrixFilterSectionProps) => {
  const allSkills = [...technicalSkills, ...softSkills];

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={allSkills}
          selectedItems={matrixSearchSkills}
          onItemsChange={setMatrixSearchSkills}
        />
      </div>
      
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
        <Button>Add Skill</Button>
      </div>
    </div>
  );
};