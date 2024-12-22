import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllSkills } from "../../skills/data/skills/allSkills";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";

interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SkillsMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedCategory,
  setSelectedCategory,
}: SkillsMatrixFiltersProps) => {
  // Get all skills and their categories
  const allSkills = getAllSkills();
  
  // Get unique categories from skills
  const categories = Array.from(new Set(allSkills.map(skill => 
    getSkillCategory(skill.title)
  ))).filter(Boolean);

  console.log('Available categories for filtering:', categories);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
            <SelectItem value="certification">Certification</SelectItem>
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
            <SelectValue placeholder="All Requirements" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requirements</SelectItem>
            <SelectItem value="required">Skill Goal</SelectItem>
            <SelectItem value="not-interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};