import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { getSkillWeight, getSkillType } from "../../skills/data/skills/categories/skillWeightType";
import { skillDefinitions } from "../../skills/data/skills/skillDefinitions";

interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSearchSkills: string[];
  removeSearchSkill: (skill: string) => void;
  clearSearch: () => void;
}

export const SkillsMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  selectedSearchSkills,
  removeSearchSkill,
  clearSearch,
}: SkillsMatrixFiltersProps) => {
  // Get unique categories from universal database
  const categories = Array.from(new Set(skillDefinitions.map(skill => getSkillCategory(skill.title))));
  const weights = Array.from(new Set(skillDefinitions.map(skill => getSkillWeight({ title: skill.title }))));
  const types = Array.from(new Set(skillDefinitions.map(skill => getSkillType({ title: skill.title }))));

  console.log('Available categories for filtering:', {
    categories,
    weights,
    types,
    selectedCategory,
    selectedLevel,
    selectedInterest
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)} Skills
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Requirements" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requirements</SelectItem>
            <SelectItem value="required">Skill Goal</SelectItem>
            <SelectItem value="not-interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSkillLevel} onValueChange={setSelectedSkillLevel}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skill Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Levels</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="unspecified">Unspecified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pr-8"
      />

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
  );
};