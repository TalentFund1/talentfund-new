import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
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
  const { benchmarkSearchSkills, setBenchmarkSearchSkills } = useBenchmarkSearch();
  
  const handleClearAll = () => {
    setBenchmarkSearchSkills([]);
  };

  const removeSearchSkill = (skill: string) => {
    setBenchmarkSearchSkills(prev => prev.filter(s => s !== skill));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {benchmarkSearchSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {benchmarkSearchSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 bg-background"
              >
                {skill}
                <button
                  onClick={() => removeSearchSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearAll}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        )}
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
              <SelectValue placeholder="Skill Level" />
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