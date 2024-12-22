import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SkillsMatrixFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSearchSkills: string[];
  removeSearchSkill: (skill: string) => void;
  clearSearch: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SkillsMatrixFilters = ({
  searchTerm,
  setSearchTerm,
  selectedInterest,
  setSelectedInterest,
  selectedSearchSkills,
  removeSearchSkill,
  clearSearch,
  selectedCategory,
  setSelectedCategory,
}: SkillsMatrixFiltersProps) => {
  console.log('Rendering SkillsMatrixFilters with:', {
    selectedInterest,
    selectedCategory
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Categories">
              {selectedCategory === 'all' && 'All Categories'}
              {selectedCategory === 'specialized' && 'Specialized Skills'}
              {selectedCategory === 'common' && 'Common Skills'}
              {selectedCategory === 'certification' && 'Certification'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
            <SelectItem value="certification">Certification</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Requirements">
              {selectedInterest === 'all' && 'All Requirements'}
              {selectedInterest === 'skill_goal' && 'Skill Goal'}
              {selectedInterest === 'not_interested' && 'Not Interested'}
              {selectedInterest === 'unknown' && 'Unknown'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requirements</SelectItem>
            <SelectItem value="skill_goal">Skill Goal</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pr-8 hidden"
      />

      <div className="hidden">
        {selectedSearchSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSearchSkills.map((skill, index) => (
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
              onClick={clearSearch}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};