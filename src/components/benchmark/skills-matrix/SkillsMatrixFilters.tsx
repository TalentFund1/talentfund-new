import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export const SkillsMatrixFilters = ({
  selectedCategory,
  setSelectedCategory,
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex justify-between items-start gap-4 mb-4">
      <Select 
        value={selectedCategory} 
        onValueChange={setSelectedCategory}
      >
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
      
      <Button>Add Skill</Button>
    </div>
  );
};